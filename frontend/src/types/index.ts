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
  category?: string;
}

// ─── Card ─────────────────────────────────────────────────────
export type CardType = 'DEBIT' | 'CREDIT';
export type CardBrand = 'VISA' | 'MASTERCARD' | 'JCB';
export type CardTier = 'BASIC' | 'GOLD' | 'PLATINUM';
export type CardStatus = 'ACTIVE' | 'BLOCKED' | 'EXPIRED';

export interface Card {
  id: number;
  cardNumber: string;
  cardHolderName: string;
  cardType: CardType;
  cardBrand: CardBrand;
  cardTier: CardTier;
  expiryDate: string;
  status: CardStatus;
  creditLimit: number | null;
  currentBalance: number;
  accountId: number;
  userId: number;
  createdAt: string;
}

// ─── Saving ───────────────────────────────────────────────────
export type SavingStatus = 'ACTIVE' | 'MATURED' | 'WITHDRAWN';

export interface Saving {
  id: number;
  savingName: string;
  amount: number;
  interestRate: number;
  termMonths: number;
  startDate: string;
  maturityDate: string;
  status: SavingStatus;
  accountId: number;
  userId: number;
  createdAt: string;
}

// ─── Loan ─────────────────────────────────────────────────────
export type LoanType = 'PERSONAL' | 'MORTGAGE' | 'AUTO' | 'BUSINESS';
export type LoanStatus = 'ACTIVE' | 'PAID_OFF' | 'OVERDUE';

export interface Loan {
  id: number;
  loanType: LoanType;
  principalAmount: number;
  remainingAmount: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  startDate: string;
  endDate: string;
  status: LoanStatus;
  userId: number;
  createdAt: string;
}

// ─── Notification ─────────────────────────────────────────────
export type NotificationType = 'TRANSACTION' | 'PROMOTION' | 'SECURITY' | 'SYSTEM';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  userId: number;
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
  recentTransactions?: Transaction[];
}

export interface ChartDataPoint {
  month: string;
  income: number;
  expense: number;
}
