import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Filter, Loader2 } from 'lucide-react';
import api from '@/lib/api';

export function Transactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response: any = await api.get('/transactions');
        setTransactions(response.data);
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
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div data-page="transactions" className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Lịch sử giao dịch</h1>
          <p className="text-slate-500">Theo dõi dòng tiền vào/ra của bạn</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Xuất Excel
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <CardTitle>Tất cả giao dịch</CardTitle>
            <div className="flex flex-1 w-full md:w-auto items-center gap-2 justify-end">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input data-testid="transaction-search-input" placeholder="Tìm mã tham chiếu, nội dung..." className="pl-8" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <Filter className="mr-2 h-4 w-4 text-slate-500" />
                  <SelectValue placeholder="Loại giao dịch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="deposit">Tiền vào</SelectItem>
                  <SelectItem value="withdrawal">Tiền ra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[120px]">Mã GD</TableHead>
                  <TableHead>Ngày/Giờ</TableHead>
                  <TableHead>Nội dung</TableHead>
                  <TableHead className="text-right">Số tiền</TableHead>
                  <TableHead className="text-center w-[120px]">Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow data-component="transaction-row" data-transaction-id={txn.id} key={txn.id} className="cursor-pointer hover:bg-slate-50">
                    <TableCell className="font-mono text-xs text-slate-500">{txn.referenceCode}</TableCell>
                    <TableCell className="text-sm">
                      {new Date(txn.createdAt).toLocaleString('vi-VN')}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate" title={txn.description || ''}>
                      {txn.description}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                      txn.transactionType === 'DEPOSIT' ? 'text-green-600' : 'text-slate-900'
                    }`}>
                      {txn.transactionType === 'DEPOSIT' ? '+' : '-'}
                      {new Intl.NumberFormat('vi-VN').format(txn.amount)} ₫
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        txn.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                        txn.status === 'FAILED' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {txn.status === 'COMPLETED' ? 'Thành công' : txn.status === 'FAILED' ? 'Thất bại' : 'Đang xử lý'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

