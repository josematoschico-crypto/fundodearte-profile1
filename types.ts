
export type ViewType = 'HOME' | 'MARKETPLACE' | 'TRADING' | 'WALLET' | 'ASSET_DETAIL' | 'TOKENIZE' | 'CATALOG' | 'PROFILE';

export enum InsuranceStatus {
  SECURED = 'SECURED',
  WARNING = 'WARNING',
  EXPIRED = 'EXPIRED'
}

export interface ArtAsset {
  id: string;
  title: string;
  artist: string;
  year: number;
  totalValue: number;
  fractionPrice: number;
  totalFractions: number;
  availableFractions: number;
  imageUrl: string;
  insuranceStatus: InsuranceStatus;
  insuranceCompany: string;
  policyNumber: string;
  insuranceExpiry: string; // ISO date
  technicalReportUrl: string;
  description: string;
  isCatalogOnly?: boolean; // New property to distinguish official catalog items
}

export interface UserHolding {
  assetId: string;
  fractionsOwned: number;
  averagePrice: number;
}

export interface Transaction {
  id: string;
  type: 'BUY' | 'SELL' | 'SWAP' | 'DEPOSIT' | 'WITHDRAW';
  assetId?: string;
  amount: number;
  timestamp: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}
