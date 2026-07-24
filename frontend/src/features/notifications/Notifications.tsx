import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { Notification } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ArrowRightLeft, Gift, Shield, Info, Check, Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response: any = await api.get('/notifications');
        setNotifications(response.data || response);
      } catch (error) {
        console.error('Error fetching notifications', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'TRANSACTION': return <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><ArrowRightLeft className="w-5 h-5" /></div>;
      case 'PROMOTION': return <div className="p-2 bg-amber-100 text-amber-600 rounded-full"><Gift className="w-5 h-5" /></div>;
      case 'SECURITY': return <div className="p-2 bg-red-100 text-red-600 rounded-full"><Shield className="w-5 h-5" /></div>;
      case 'SYSTEM': 
      default: return <div className="p-2 bg-slate-100 text-slate-600 rounded-full"><Info className="w-5 h-5" /></div>;
    }
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div data-page="notifications" className="p-6 max-w-4xl mx-auto animate-slide-up">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-mb-navy flex items-center gap-2">
          <Bell className="w-8 h-8 text-mb-cyan" />
          Thông báo
        </h1>
        <Button variant="ghost" onClick={markAllRead} className="text-mb-blue hover:text-mb-navy hover:bg-mb-light" data-action="mark-all-read">
          <Check className="w-4 h-4 mr-2" />
          Đánh dấu tất cả đã đọc
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-mb-cyan" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center p-12 text-slate-500">
          <Bell className="w-12 h-12 mx-auto text-slate-300 mb-4" />
          <p>Bạn không có thông báo nào.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map(notification => (
            <Card key={notification.id} className={`overflow-hidden transition-colors ${!notification.isRead ? 'bg-blue-50/50 border-mb-blue/20' : 'bg-white'}`} data-component="notification-item">
              <CardContent className="p-4 flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-base font-semibold ${!notification.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-slate-400 whitespace-nowrap ml-4">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: vi })}
                    </span>
                  </div>
                  <p className={`text-sm ${!notification.isRead ? 'text-slate-700' : 'text-slate-500'}`}>
                    {notification.message}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="flex-shrink-0 flex items-center justify-center w-4">
                    <div className="w-2.5 h-2.5 bg-mb-cyan rounded-full"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
