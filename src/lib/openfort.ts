/**
 * Openfort Integration
 *
 * Openfort provides embedded wallets and account abstraction (ERC-4337).
 * Free tier: 2,000 operations/month.
 *
 * Docs: https://docs.openfort.xyz/
 */

const OPENFORT_PUBLIC_KEY = process.env.NEXT_PUBLIC_OPENFORT_PUBLIC_KEY || "";
const OPENFORT_SECRET_KEY = process.env.OPENFORT_SECRET_KEY || "";
const SHIELD_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SHIELD_PUBLISHABLE_KEY || "";
const SHIELD_SECRET_KEY = process.env.SHIELD_SECRET_KEY || "";
const OPENFORT_BASE_URL = "https://api.openfort.io";
const SHIELD_BASE_URL = "https://shield.openfort.io";

// Base chain IDs
const SEPOLIA_CHAIN_ID = 84532; // Base Sepolia
const MAINNET_CHAIN_ID = 8453; // Base Mainnet

function getChainId(): number {
  return process.env.NODE_ENV === "production"
    ? MAINNET_CHAIN_ID
    : SEPOLIA_CHAIN_ID;
}

interface OpenfortUser {
  id: string;
  walletAddress?: string;
  chainId?: number;
  shieldEnabled?: boolean;
}

async function openfortFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${OPENFORT_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENFORT_SECRET_KEY}`,
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(`Openfort API error (${res.status}): ${text}`);
  }
  return res.json();
}

async function shieldFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${SHIELD_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": SHIELD_PUBLISHABLE_KEY,
      "x-auth-token": SHIELD_SECRET_KEY,
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(`Shield API error (${res.status}): ${text}`);
  }
  return res.json();
}

function generateMockWallet(userId: string): OpenfortUser {
  return {
    id: `ofu_${Date.now()}`,
    walletAddress: `0x${Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16),
    ).join("")}`,
    chainId: getChainId(),
    shieldEnabled: false,
  };
}

/**
 * Register a recovery share with Openfort Shield so the user can
 * recover their embedded wallet via OTP / password later.
 */
async function enableShieldRecovery(
  playerId: string,
  walletAddress: string,
): Promise<boolean> {
  if (!SHIELD_PUBLISHABLE_KEY || !SHIELD_SECRET_KEY) {
    console.warn("[Shield] Keys not configured — skipping recovery setup");
    return false;
  }

  try {
    await shieldFetch("/v1/shares", {
      method: "POST",
      body: JSON.stringify({
        player: playerId,
        address: walletAddress,
        auth: {
          provider: "openfort",
          token: OPENFORT_SECRET_KEY,
        },
      }),
    });
    console.log(`[Shield] Recovery enabled for player ${playerId}`);
    return true;
  } catch (err) {
    console.error("[Shield] Recovery setup failed:", err);
    return false;
  }
}

/**
 * Create an embedded wallet for a user after KYC approval.
 * Falls back to mock wallet if Openfort keys are missing or the API fails.
 */
export async function createOpenfortWallet(
  userId: string,
  email: string,
): Promise<OpenfortUser> {
  if (
    !OPENFORT_SECRET_KEY ||
    OPENFORT_SECRET_KEY === "sk_test_" ||
    OPENFORT_SECRET_KEY.includes("your_")
  ) {
    console.warn("[Openfort] No secret key configured — returning mock wallet");
    return generateMockWallet(userId);
  }

  try {
    const chainId = getChainId();

    // Create or retrieve the Openfort player (user)
    const player = await openfortFetch("/v1/players", {
      method: "POST",
      body: JSON.stringify({
        name: email,
        description: `Evolution user ${userId}`,
      }),
    });

    // Create an embedded account (smart wallet) for the player on Base
    const account = await openfortFetch(`/v1/players/${player.id}/accounts`, {
      method: "POST",
      body: JSON.stringify({ chainId }),
    });

    // Enable Shield recovery if keys are present
    const shieldEnabled = await enableShieldRecovery(
      player.id,
      account.address,
    );

    return {
      id: player.id,
      walletAddress: account.address,
      chainId,
      shieldEnabled,
    };
  } catch (err) {
    console.error(
      "[Openfort] Wallet creation failed, falling back to mock:",
      err,
    );
    return generateMockWallet(userId);
  }
}

/**
 * Get or create a user's wallet
 */
export async function getOrCreateWallet(
  userId: string,
  email: string,
): Promise<OpenfortUser> {
  return createOpenfortWallet(userId, email);
}

/**
 * Sign a transaction using Openfort.
 * Falls back to mock signature if the API is unavailable.
 */
export async function signTransaction(
  userId: string,
  transaction: {
    to: string;
    value?: bigint;
    data?: string;
  },
) {
  if (
    !OPENFORT_SECRET_KEY ||
    OPENFORT_SECRET_KEY === "sk_test_" ||
    OPENFORT_SECRET_KEY.includes("your_")
  ) {
    console.warn("[Openfort] No secret key — returning mock signature");
    return { signed: true, hash: "0xmock" };
  }

  try {
    const chainId = getChainId();
    const intent = await openfortFetch("/v1/transaction_intents", {
      method: "POST",
      body: JSON.stringify({
        player: userId,
        chainId,
        optimistic: true,
        transactions: [
          {
            to: transaction.to,
            value: transaction.value ? String(transaction.value) : "0",
            data: transaction.data || "0x",
          },
        ],
      }),
    });

    return {
      signed: true,
      hash: intent.response?.transactionHash || intent.id,
    };
  } catch (err) {
    console.error("[Openfort] Sign transaction failed, returning mock:", err);
    return { signed: true, hash: "0xmock" };
  }
}
