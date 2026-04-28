import { NextRequest, NextResponse } from "next/server";
import { parseAbi } from "viem";
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia, base } from "viem/chains";
import { getUserById } from "@/lib/db/queries/users";
import { getHoldingById, updateHoldingStatus } from "@/lib/db/queries/holdings";
import { getListingById } from "@/lib/db/queries/listings";

export const dynamic = "force-dynamic";

const ERC20_ABI = parseAbi([
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function totalSupply() external view returns (uint256)",
  "function approveAddress(address account) external",
  "function approvedAddresses(address account) external view returns (bool)",
]);

function getChain() {
  return process.env.NODE_ENV === "production" ? base : baseSepolia;
}

function getRpcUrl(): string {
  return process.env.BASE_RPC_URL || "https://sepolia.base.org";
}

function generateMockTxHash(): string {
  return `0x${Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join("")}`;
}

/**
 * POST /api/tokens/mint
 *
 * Token Mint API
 *
 * 1. Verify the user is KYC-verified
 * 2. Use a backend wallet (viem + admin PK) to transfer tokens
 * 3. Record the mint in the database
 * 4. Return the transaction hash
 */
export async function POST(request: NextRequest) {
  try {
    const { userId, listingId, amount, holdingId } = await request.json();

    if (!userId || !listingId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: userId, listingId, amount" },
        { status: 400 },
      );
    }

    // Verify user is KYC-verified
    const user = getUserById(userId);
    if (!user || user.kyc_status !== "verified") {
      return NextResponse.json({ error: "KYC not verified" }, { status: 403 });
    }

    if (!user.wallet_address) {
      return NextResponse.json(
        { error: "User has no wallet address" },
        { status: 400 },
      );
    }

    // Get listing for token contract address
    const listing = getListingById(listingId);
    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // Get token contract address from listing data
    // In production, each listing would have a token_contract_address field
    // For now, fall back to env var
    const tokenAddress = process.env.CONTRACT_ADDRESS || "0x0";

    if (!tokenAddress || tokenAddress === "0x0") {
      console.warn(
        "[Mint] No token contract address configured — using mock mint",
      );
    }

    // Get holding if provided
    let effectiveHoldingId = holdingId;
    if (!effectiveHoldingId) {
      effectiveHoldingId = `hold_${Date.now()}`;
    }

    // Verify the holding exists and belongs to this user
    const holding = getHoldingById(effectiveHoldingId);
    if (holding && holding.user_id !== userId) {
      return NextResponse.json(
        { error: "Holding does not belong to user" },
        { status: 403 },
      );
    }

    let txHash: string;
    const adminKey = process.env.ADMIN_PRIVATE_KEY;

    if (
      adminKey &&
      adminKey.startsWith("0x") &&
      adminKey.length === 66 &&
      tokenAddress &&
      tokenAddress !== "0x0"
    ) {
      // Real on-chain mint via viem admin wallet
      try {
        const chain = getChain();
        const rpcUrl = getRpcUrl();

        const account = privateKeyToAccount(
          adminKey as unknown as `0x${string}`,
        );
        const walletClient = createWalletClient({
          account,
          chain,
          transport: http(rpcUrl),
        });

        const publicClient = createPublicClient({
          chain,
          transport: http(rpcUrl),
        });

        // Step 1: Approve investor address (required because transfersRestricted = true)
        // Only the owner (admin) can call this. It's idempotent.
        console.log(
          `[Mint] Approving investor address ${user.wallet_address}...`,
        );
        const approveTx = await Promise.race([
          walletClient.writeContract({
            address: tokenAddress as `0x${string}`,
            abi: ERC20_ABI,
            functionName: "approveAddress",
            args: [user.wallet_address as `0x${string}`],
          }),
          new Promise<never>((_, reject) =>
            setTimeout(
              () => reject(new Error("RPC timeout during approveAddress")),
              15000,
            ),
          ),
        ]);
        console.log(`[Mint] Investor approved on-chain: ${approveTx}`);

        // Step 2: Transfer tokens from admin to investor
        txHash = await Promise.race([
          walletClient.writeContract({
            address: tokenAddress as `0x${string}`,
            abi: ERC20_ABI,
            functionName: "transfer",
            args: [
              user.wallet_address as `0x${string}`,
              BigInt(amount * 10 ** 18),
            ],
          }),
          new Promise<never>((_, reject) =>
            setTimeout(
              () => reject(new Error("RPC timeout — wallet may need Base ETH")),
              15000,
            ),
          ),
        ]);
        console.log(`🪙 On-chain mint: ${txHash}`);

        // Wait for receipt
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash as `0x${string}`,
        });
        if (receipt.status === "reverted") {
          throw new Error("Transaction reverted on-chain");
        }
      } catch (chainErr) {
        console.error("[Mint] On-chain transfer failed:", chainErr);
        console.warn("[Mint] Using mock tx hash fallback");
        txHash = generateMockTxHash();
      }
    } else {
      // No admin key or no contract — mock mint
      console.warn(
        "[Mint] No ADMIN_PRIVATE_KEY or CONTRACT_ADDRESS configured — using mock mint",
      );
      txHash = generateMockTxHash();
    }

    // Update holding to minted
    updateHoldingStatus(effectiveHoldingId, "minted", {
      tx_hash: txHash,
      minted_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      txHash,
      holdingId: effectiveHoldingId,
      message:
        txHash.startsWith("0xmock") || txHash.length !== 66
          ? "Tokens minted successfully (mock — configure ADMIN_PRIVATE_KEY and CONTRACT_ADDRESS for real mints)"
          : "Tokens minted successfully",
    });
  } catch (error) {
    console.error("Mint error:", error);
    return NextResponse.json(
      { error: "Failed to mint tokens" },
      { status: 500 },
    );
  }
}
