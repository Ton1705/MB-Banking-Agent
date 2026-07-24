import { useState, useEffect } from 'react';
import { Search, Download, Filter, Loader2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import api from '@/lib/api';
import type { Transaction } from '@/types';

const formatVND = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response: any = await api.get('/transactions');
        setTransactions(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Failed to fetch transactions', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center" data-page="transactions">
        <Loader2 className="h-8 w-8 animate-spin text-mb-blue" data-component="loader" />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'COMPLETED':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Thành công</span>;
      case 'FAILED':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Thất bại</span>;
      case 'PENDING':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Đang xử lý</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" data-page="transactions">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lịch sử giao dịch</h1>
          <p className="text-gray-500">Xem và tìm kiếm tất cả giao dịch của bạn</p>
        </div>
        <Button variant="outline" className="border-mb-blue text-mb-blue hover:bg-mb-light" data-action="export-excel">
          <Download className="mr-2 h-4 w-4" /> Xuất Excel
        </Button>
      </div>

      <Card className="shadow-sm border-0 bg-white">
        <CardHeader className="border-b pb-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Tìm kiếm giao dịch..." 
                className="pl-9 h-10 bg-slate-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-component="search-input"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[150px] h-10 bg-slate-50">
                  <Filter className="w-4 h-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Loại giao dịch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="in">Tiền vào</SelectItem>
                  <SelectItem value="out">Tiền ra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold text-gray-700">Giao dịch</TableHead>
                <TableHead className="font-semibold text-gray-700">Mã GD</TableHead>
                <TableHead className="font-semibold text-gray-700">Ngày giờ</TableHead>
                <TableHead className="font-semibold text-gray-700">Trạng thái</TableHead>
                <TableHead className="text-right font-semibold text-gray-700">Số tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-slate-50 cursor-pointer transition-colors" data-component="transaction-row">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${tx.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {tx.amount > 0 ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{tx.description}</p>
                        <p className="text-xs text-gray-500">{tx.category || 'Chuyển khoản'}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-gray-500">{tx.id.toString().substring(0, 8).toUpperCase()}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(tx.createdAt).toLocaleString('vi-VN')}
                  </TableCell>
                  <TableCell>{getStatusBadge(tx.status)}</TableCell>
                  <TableCell className={`text-right font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatVND(tx.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
