// ─── User ─────────────────────────────────────────────────────
export type Role = 'USER' | 'ADMIN';

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string | null;
  role: Role;
  isActive: boolean;
  createdAt: string;
}

// ─── Account ──────────────────────────────────────────────────
export type AccountType = 'CHECKING' | 'SAVINGS';

export interface Account {
  id: number;
  accountNumber: string;
  accountType: AccountType;
  balance: number;
  isActive: boolean;
  userId: number;
  ownerFullName: string;
  createdAt: string;
}

// ─── Transaction ──────────────────────────────────────────────
export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface Transaction {
  id: number;
  referenceCode: string;
  transactionType: TransactionType;
  status: TransactionStatus;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string | null;
  sourceAccountNumber: string | null;
  destinationAccountNumber: string | null;
  createdAt: string;
}

// ─── Auth ─────────────────────────────────────────────────────
export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

// ─── API Wrapper ──────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// ─── Dashboard ────────────────────────────────────────────────
export interface DashboardStats {
  totalBalance: number;
  totalAccounts: number;
  monthlyIncome: number;
  monthlyExpense: number;
  transactionCount: number;
}

export interface ChartDataPoint {
  month: string;
  income: number;
  expense: number;
}
