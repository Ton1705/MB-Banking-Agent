import type {
  User,
  Account,
  Transaction,
  DashboardStats,
  ChartDataPoint,
} from '@/types';

// ─── User ─────────────────────────────────────────────────────
export const mockUser: User = {
  id: 1,
  username: 'khanhngoc',
  email: 'khanhngoc@mbbank.vn',
  fullName: 'Lê Khánh Ngọc',
  phoneNumber: '0901234567',
  role: 'USER',
  isActive: true,
  createdAt: '2026-01-15T08:00:00',
};

// ─── Accounts ─────────────────────────────────────────────────
export const mockAccounts: Account[] = [
  {
    id: 1,
    accountNumber: 'MB0123456789',
    accountType: 'CHECKING',
    balance: 125_750_000,
    isActive: true,
    userId: 1,
    ownerFullName: 'Lê Khánh Ngọc',
    createdAt: '2026-01-15T08:00:00',
  },
  {
    id: 2,
    accountNumber: 'MB9876543210',
    accountType: 'SAVINGS',
    balance: 450_000_000,
    isActive: true,
    userId: 1,
    ownerFullName: 'Lê Khánh Ngọc',
    createdAt: '2026-02-01T09:30:00',
  },
];

// ─── Transactions ─────────────────────────────────────────────
export const mockTransactions: Transaction[] = [
  {
    id: 1,
    referenceCode: 'TXN20260724001',
    transactionType: 'TRANSFER',
    status: 'COMPLETED',
    amount: 5_000_000,
    balanceBefore: 130_750_000,
    balanceAfter: 125_750_000,
    description: 'Thanh toán tiền thuê nhà tháng 7',
    sourceAccountNumber: 'MB0123456789',
    destinationAccountNumber: 'MB1111111111',
    createdAt: '2026-07-24T09:15:00',
  },
  {
    id: 2,
    referenceCode: 'TXN20260723002',
    transactionType: 'DEPOSIT',
    status: 'COMPLETED',
    amount: 15_000_000,
    balanceBefore: 115_750_000,
    balanceAfter: 130_750_000,
    description: 'Lương tháng 7/2026',
    sourceAccountNumber: null,
    destinationAccountNumber: 'MB0123456789',
    createdAt: '2026-07-23T08:00:00',
  },
  {
    id: 3,
    referenceCode: 'TXN20260722003',
    transactionType: 'WITHDRAWAL',
    status: 'COMPLETED',
    amount: 2_000_000,
    balanceBefore: 117_750_000,
    balanceAfter: 115_750_000,
    description: 'Rút tiền ATM',
    sourceAccountNumber: 'MB0123456789',
    destinationAccountNumber: null,
    createdAt: '2026-07-22T14:30:00',
  },
  {
    id: 4,
    referenceCode: 'TXN20260720004',
    transactionType: 'TRANSFER',
    status: 'COMPLETED',
    amount: 3_500_000,
    balanceBefore: 121_250_000,
    balanceAfter: 117_750_000,
    description: 'Chuyển tiền điện nước',
    sourceAccountNumber: 'MB0123456789',
    destinationAccountNumber: 'MB2222222222',
    createdAt: '2026-07-20T10:00:00',
  },
  {
    id: 5,
    referenceCode: 'TXN20260718005',
    transactionType: 'TRANSFER',
    status: 'FAILED',
    amount: 50_000_000,
    balanceBefore: 121_250_000,
    balanceAfter: 121_250_000,
    description: 'Chuyển khoản thất bại - số dư không đủ',
    sourceAccountNumber: 'MB0123456789',
    destinationAccountNumber: 'MB3333333333',
    createdAt: '2026-07-18T16:45:00',
  },
  {
    id: 6,
    referenceCode: 'TXN20260715006',
    transactionType: 'DEPOSIT',
    status: 'COMPLETED',
    amount: 5_000_000,
    balanceBefore: 116_250_000,
    balanceAfter: 121_250_000,
    description: 'Thưởng dự án Q2',
    sourceAccountNumber: null,
    destinationAccountNumber: 'MB0123456789',
    createdAt: '2026-07-15T11:00:00',
  },
];

// ─── Dashboard Stats ──────────────────────────────────────────
export const mockStats: DashboardStats = {
  totalBalance: 575_750_000,
  totalAccounts: 2,
  monthlyIncome: 20_000_000,
  monthlyExpense: 10_500_000,
  transactionCount: 6,
};

// ─── Chart Data (6 months) ────────────────────────────────────
export const mockChartData: ChartDataPoint[] = [
  { month: 'T2', income: 15_000_000, expense: 8_500_000 },
  { month: 'T3', income: 15_000_000, expense: 12_000_000 },
  { month: 'T4', income: 20_000_000, expense: 9_000_000 },
  { month: 'T5', income: 15_000_000, expense: 11_000_000 },
  { month: 'T6', income: 18_000_000, expense: 7_500_000 },
  { month: 'T7', income: 20_000_000, expense: 10_500_000 },
];
