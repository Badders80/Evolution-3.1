"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AdminStats {
  totalInvestors: number;
  totalValue: number;
  pendingKycCount: number;
  verifiedInvestors: number;
}

interface InvestorRecord {
  id: string;
  email: string;
  name: string;
  walletAddress: string | null;
  kycStatus: string;
  createdAt: string;
}

interface HoldingRecord {
  id: string;
  investorId: string;
  horseName: string;
  stakePercent: number;
  units: number;
  totalValue: number;
  txHash: string | null;
  purchaseDate: string;
}

interface ListingRecord {
  id: string;
  slug: string;
  title: string;
  publishStatus: string;
  horseName: string;
  tokenPriceNzd: number;
  tokenCount: number;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-700" },
  ready_to_publish: {
    label: "Ready to Publish",
    color: "bg-blue-100 text-blue-700",
  },
  live: { label: "Live", color: "bg-green-100 text-green-700" },
  closed: { label: "Closed", color: "bg-red-100 text-red-700" },
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [investors, setInvestors] = useState<InvestorRecord[]>([]);
  const [holdings, setHoldings] = useState<HoldingRecord[]>([]);
  const [kycQueue, setKycQueue] = useState<InvestorRecord[]>([]);
  const [listings, setListings] = useState<ListingRecord[]>([]);
  const [error, setError] = useState("");
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth?redirectedFrom=/admin");
      return;
    }

    if (status === "authenticated") {
      if (session?.user?.role !== "admin") {
        setError("Admin access required");
        setTimeout(() => router.push("/"), 2000);
        setIsLoading(false);
        return;
      }
      loadAdminData();
    }
  }, [session, status, router]);

  const loadAdminData = async () => {
    try {
      const response = await fetch("/api/admin");

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setInvestors(data.investors);
        setHoldings(data.holdings);
        setKycQueue(data.kycQueue);
        setListings(data.listings || []);
      } else if (response.status === 401) {
        setError("Admin access required");
        setTimeout(() => router.push("/"), 2000);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: "NZD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NZ");
  };

  const handleStatusChange = async (listingId: string, newStatus: string) => {
    setStatusUpdating(listingId);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update status");
      }
      // Update local state
      setListings((prev) =>
        prev.map((l) =>
          l.id === listingId ? { ...l, publishStatus: newStatus } : l,
        ),
      );
      setStatusMessage(`Status updated to "${newStatus}"`);
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
      setTimeout(() => setStatusMessage(null), 5000);
    } finally {
      setStatusUpdating(null);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-xl font-semibold mb-4">
            Access Denied
          </div>
          <p className="text-gray-600">{error}</p>
          <p className="text-gray-500 text-sm mt-2">
            Redirecting to homepage...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {stats && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Total Investors
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.totalInvestors}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Total Value
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(stats.totalValue)}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Pending KYC
                </h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {stats.pendingKycCount}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Verified Investors
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {stats.verifiedInvestors}
                </p>
              </div>
            </div>

            {/* KYC Queue */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  KYC Queue ({kycQueue.length})
                </h2>
              </div>
              <div className="p-6">
                {kycQueue.length === 0 ? (
                  <p className="text-gray-500">No pending KYC approvals</p>
                ) : (
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-sm font-medium text-gray-500">
                          Name
                        </th>
                        <th className="text-left text-sm font-medium text-gray-500">
                          Email
                        </th>
                        <th className="text-left text-sm font-medium text-gray-500">
                          Wallet
                        </th>
                        <th className="text-left text-sm font-medium text-gray-500">
                          Joined
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {kycQueue.map((investor) => (
                        <tr key={investor.id}>
                          <td className="py-3 text-sm">{investor.name}</td>
                          <td className="py-3 text-sm">{investor.email}</td>
                          <td className="py-3 text-sm font-mono text-gray-600">
                            {investor.walletAddress
                              ? `${investor.walletAddress.slice(0, 8)}...${investor.walletAddress.slice(-6)}`
                              : "—"}
                          </td>
                          <td className="py-3 text-sm">
                            {formatDate(investor.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Investors Table */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  All Investors ({investors.length})
                </h2>
              </div>
              <div className="p-6">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-sm font-medium text-gray-500">
                        Name
                      </th>
                      <th className="text-left text-sm font-medium text-gray-500">
                        Email
                      </th>
                      <th className="text-left text-sm font-medium text-gray-500">
                        Wallet
                      </th>
                      <th className="text-left text-sm font-medium text-gray-500">
                        KYC Status
                      </th>
                      <th className="text-left text-sm font-medium text-gray-500">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {investors.map((investor) => (
                      <tr key={investor.id}>
                        <td className="py-3 text-sm">{investor.name}</td>
                        <td className="py-3 text-sm">{investor.email}</td>
                        <td className="py-3 text-sm font-mono text-gray-600">
                          {investor.walletAddress
                            ? `${investor.walletAddress.slice(0, 8)}...${investor.walletAddress.slice(-6)}`
                            : "—"}
                        </td>
                        <td className="py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              investor.kycStatus === "verified"
                                ? "bg-green-100 text-green-800"
                                : investor.kycStatus === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {investor.kycStatus}
                          </span>
                        </td>
                        <td className="py-3 text-sm">
                          {formatDate(investor.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Listing Management */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Listing Management ({listings.length})
                </h2>
                {statusMessage && (
                  <span className="text-sm text-blue-600">{statusMessage}</span>
                )}
              </div>
              <div className="p-6">
                {listings.length === 0 ? (
                  <p className="text-gray-500">No listings in database</p>
                ) : (
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-sm font-medium text-gray-500">
                          Horse
                        </th>
                        <th className="text-left text-sm font-medium text-gray-500">
                          Slug
                        </th>
                        <th className="text-left text-sm font-medium text-gray-500">
                          Price/Share
                        </th>
                        <th className="text-left text-sm font-medium text-gray-500">
                          Total Shares
                        </th>
                        <th className="text-left text-sm font-medium text-gray-500">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {listings.map((listing) => (
                        <tr key={listing.id}>
                          <td className="py-3 text-sm font-medium">
                            {listing.horseName}
                          </td>
                          <td className="py-3 text-sm font-mono text-gray-600">
                            {listing.slug}
                          </td>
                          <td className="py-3 text-sm">
                            ${listing.tokenPriceNzd.toLocaleString()} NZD
                          </td>
                          <td className="py-3 text-sm">{listing.tokenCount}</td>
                          <td className="py-3 text-sm">
                            <select
                              value={listing.publishStatus}
                              disabled={statusUpdating === listing.id}
                              onChange={(e) =>
                                handleStatusChange(listing.id, e.target.value)
                              }
                              className="rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                            >
                              <option value="draft">Draft</option>
                              <option value="ready_to_publish">
                                Ready to Publish
                              </option>
                              <option value="live">Live</option>
                              <option value="closed">Closed</option>
                            </select>
                            {statusUpdating === listing.id && (
                              <span className="ml-2 text-xs text-gray-400 animate-pulse">
                                Updating...
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Holdings Table */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  All Holdings ({holdings.length})
                </h2>
              </div>
              <div className="p-6">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-sm font-medium text-gray-500">
                        Horse
                      </th>
                      <th className="text-left text-sm font-medium text-gray-500">
                        Investor ID
                      </th>
                      <th className="text-left text-sm font-medium text-gray-500">
                        Stake %
                      </th>
                      <th className="text-left text-sm font-medium text-gray-500">
                        Units
                      </th>
                      <th className="text-left text-sm font-medium text-gray-500">
                        Value
                      </th>
                      <th className="text-left text-sm font-medium text-gray-500">
                        TX Hash
                      </th>
                      <th className="text-left text-sm font-medium text-gray-500">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {holdings.map((holding) => (
                      <tr key={holding.id}>
                        <td className="py-3 text-sm">{holding.horseName}</td>
                        <td className="py-3 text-sm">{holding.investorId}</td>
                        <td className="py-3 text-sm">
                          {holding.stakePercent}%
                        </td>
                        <td className="py-3 text-sm">{holding.units}</td>
                        <td className="py-3 text-sm">
                          {formatCurrency(holding.totalValue)}
                        </td>
                        <td className="py-3 text-sm font-mono text-gray-600">
                          {holding.txHash
                            ? `${holding.txHash.slice(0, 8)}...${holding.txHash.slice(-6)}`
                            : "—"}
                        </td>
                        <td className="py-3 text-sm">
                          {formatDate(holding.purchaseDate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
