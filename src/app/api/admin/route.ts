import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

// Mock data - replace with actual database queries
export interface InvestorRecord {
  id: string;
  email: string;
  name: string;
  walletAddress: string;
  kycStatus: 'verified' | 'pending' | 'rejected';
  createdAt: string;
}

export interface HoldingRecord {
  id: string;
  investorId: string;
  horseName: string;
  stakePercent: number;
  units: number;
  totalValue: number;
  txHash: string;
  purchaseDate: string;
}

export interface AdminStats {
  totalInvestors: number;
  totalValue: number;
  pendingKycCount: number;
  verifiedInvestors: number;
}

const mockInvestors: InvestorRecord[] = [
  {
    id: '1',
    email: 'investor1@example.com',
    name: 'John Doe',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    kycStatus: 'verified',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    email: 'investor2@example.com',
    name: 'Jane Smith',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f',
    kycStatus: 'pending',
    createdAt: '2024-01-16T14:20:00Z'
  }
];

const mockHoldings: HoldingRecord[] = [
  {
    id: '1',
    investorId: '1',
    horseName: 'First Gear',
    stakePercent: 5,
    units: 10,
    totalValue: 2400,
    txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    purchaseDate: '2024-01-20T09:15:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    requireAdmin(request);

    // Calculate stats
    const stats: AdminStats = {
      totalInvestors: mockInvestors.length,
      totalValue: mockHoldings.reduce((sum, holding) => sum + holding.totalValue, 0),
      pendingKycCount: mockInvestors.filter(inv => inv.kycStatus === 'pending').length,
      verifiedInvestors: mockInvestors.filter(inv => inv.kycStatus === 'verified').length
    };

    // Get KYC queue (pending approvals)
    const kycQueue = mockInvestors.filter(inv => inv.kycStatus === 'pending');

    return NextResponse.json({
      stats,
      investors: mockInvestors,
      holdings: mockHoldings,
      kycQueue
    });

  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }
    
    console.error('Admin API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}