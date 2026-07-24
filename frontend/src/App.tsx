import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Dashboard } from '@/features/dashboard/Dashboard';
import { Accounts } from '@/features/accounts/Accounts';
import { Cards } from '@/features/cards/Cards';
import { CardDetail } from '@/features/cards/CardDetail';
import { Transfer } from '@/features/transfer/Transfer';
import { Transactions } from '@/features/transactions/Transactions';
import { Savings } from '@/features/savings/Savings';
import { Loans } from '@/features/loans/Loans';
import { Notifications } from '@/features/notifications/Notifications';
import { Profile } from '@/features/profile/Profile';
import { Login } from '@/features/login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login — fullscreen, no layout */}
        <Route path="/login" element={<Login />} />

        {/* App — with sidebar + header layout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="cards" element={<Cards />} />
          <Route path="cards/:id" element={<CardDetail />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="savings" element={<Savings />} />
          <Route path="loans" element={<Loans />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
