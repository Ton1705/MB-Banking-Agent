import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Dashboard } from '@/features/dashboard/Dashboard';
import { Accounts } from '@/features/accounts/Accounts';
import { Cards } from '@/features/cards/Cards';
import { Transfer } from '@/features/transfer/Transfer';
import { Transactions } from '@/features/transactions/Transactions';
import { Profile } from '@/features/profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="cards" element={<Cards />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
