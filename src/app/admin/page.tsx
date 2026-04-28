'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  walletAddress: string;
  kycStatus: 'verified' | 'pending' | 'rejected';
  createdAt: string;
}

interface HoldingRecord {
  id: string;
  investorId: string;
  horseName: string;
  stakePercent: number;
  units: number;
  totalValue: number;
  txHash: string;
  purchaseDate: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [investors, setInvestors] = useState<InvestorRecord[]>([]);
  const [holdings, setHoldings] = useState<HoldingRecord[]>([]);
  const [kycQueue, setKycQueue] = useState<InvestorRecord[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const token = prompt('Enter admin token:');
      
      if (!token) {
        router.push('/');
        return;
      }

      // Store token in session storage for subsequent requests
      sessionStorage.setItem('admin_token', token);
      
      // Test authentication by making a simple API call
      const response = await fetch('/api/admin', {
        headers: {
          'x-admin-token': token
        }
      });

      if (response.ok) {
        setIsAuthenticated(true);
        loadAdminData(token);
      } else {
        sessionStorage.removeItem('admin_token');
        setError('Invalid admin token');
        setTimeout(() => router.push('/'), 2000);
      }
    } catch (err) {
      sessionStorage.removeItem('admin_token');
      setError('Authentication failed');
      setTimeout(() => router.push('/'), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAdminData = async (token: string) => {
    try {
      const response = await fetch('/api/admin', {
        headers: {
          'x-admin-token': token
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setInvestors(data.investors);
        setHoldings(data.holdings);
        setKycQueue(data.kycQueue);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NZ');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-xl font-semibold mb-4"></div>
          <p className="text-gray-600">{error || 'Unauthorized access'}</p>
          <p className="text-gray-500 text-sm mt-2">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => {
                sessionStorage.removeItem('admin_token');
                router.push('/');
              }}
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Investors</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.totalInvestors}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Value</h3>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(stats.totalValue)}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending KYC</h3>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingKycCount}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Investors</h3>
                <p className="text-3xl font-bold text-green-600">{stats.verifiedInvestors}</p>
              </div>
            </div>

            {/* KYC Queue */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">KYC Queue ({kycQueue.length})</h2>
              </div>
              <div className="p-6">
                {kycQueue.length === 0 ? (
                  <p className="text-gray-500">No pending KYC approvals</p>
                ) : (
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-sm font-medium text-gray-500">Name</th>
                        <th className="text-left text-sm font-medium text-gray-500">Email</th>
                        <th className="text-left text-sm font-medium text-gray-500">Wallet</th>
                        <th className="text-left text-sm font-medium text-gray-500">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {kycQueue.map((investor) => (
                        <tr key={investor.id}>
                          <td className="py-3 text-sm">{investor.name}</td>
                          <td className="py-3 text-sm">{investor.email}</td>
                          <td className="py-3 text-sm font-mono text-gray-600">
                            {investor.walletAddress.slice(0, 8)}...{investor.walletAddress.slice(-6)}
                          </td>
                          <td className="py-3 text-sm">{formatDate(investor.createdAt)}</td>
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
                <h2 className="text-xl font-semibold text-gray-900">All Investors ({investors.length})</h2>
              </div>
              <div className="p-6">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-sm font-medium text-gray-500">Name</th>
                      <th className="text-left text-sm font-medium text-gray-500">Email</th>
                      <th className="text-left text-sm font-medium text-gray-500">Wallet</th>
                      <th className="text-left text-sm font-medium text-gray-500">KYC Status</th>
                      <th className="text-left text-sm font-medium text-gray-500">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {investors.map((investor) => (
                      <tr key={investor.id}>
                        <td className="py-3 text-sm">{investor.name}</td>
                        <td className="py-3 text-sm">{investor.email}</td>
                        <td className="py-3 text-sm font-mono text-gray-600">
                          {investor.walletAddress.slice(0, 8)}...{investor.walletAddress.slice(-6)}
                        </td>
                        <td className="py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              investor.kycStatus === 'verified'
                                ? 'bg-green-100 text-green-800'
                                : investor.kycStatus === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {investor.kycStatus}
                          </span>
                        </td>
                        <td className="py-3 text-sm">{formatDate(investor.createdAt)}</td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>

            {/* Holdings Table */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">All Holdings ({holdings.length})</h2>
              </div>
              <div className="p-6">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-sm font-medium text-gray-500">Horse</th>
                      <th className="text-left text-sm font-medium text-gray-500">Investor ID</th>
                      <th className="text-left text-sm font-medium text-gray-500">Stake %</th>
                      <th className="text-left text-sm font-medium text-gray-500">Units</th>
                      <th className="text-left text-sm font-medium text-gray-500">Value</th>
                      <th className="text-left text-sm font-medium text-gray-500">TX Hash</th>
                      <th className="text-left text-sm font-medium text-gray-500">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {holdings.map((holding) => (
                      <tr key={holding.id}>
                        <td className="py-3 text-sm">{holding.horseName}</td>
                        <td className="py-3 text-sm">{holding.investorId}</td>
                        <td className="py-3 text-sm">{holding.stakePercent}%</td>
                        <td className="py-3 text-sm">{holding.units}</td>
                        <td className="py-3 text-sm">{formatCurrency(holding.totalValue)}</td>
                        <td className="py-3 text-sm font-mono text-gray-600">
                          {holding.txHash.slice(0, 8)}...{holding.txHash.slice(-6)}
                        </td>
                        <td className="py-3 text-sm">{formatDate(holding.purchaseDate)}</td>
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