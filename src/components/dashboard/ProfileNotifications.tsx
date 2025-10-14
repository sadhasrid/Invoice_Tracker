import { useState, useEffect } from 'react';
import { Bell, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function ProfileNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodayNotifications();
  }, []);

  const fetchTodayNotifications = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Get today's pending and overdue invoices
      const { data: invoices, error } = await supabase
        .from('invoices')
        .select('*')
        .or(`due_date.eq.${today},status.eq.pending,status.eq.overdue,status.eq.unpaid`)
        .order('due_date', { ascending: true });

      if (error) throw error;

      const todayNotifications = invoices?.filter(invoice => {
        const dueDate = invoice.due_date?.split('T')[0];
        const status = invoice.status?.toLowerCase();
        return dueDate === today || status === 'pending' || status === 'overdue' || status === 'unpaid';
      }) || [];

      setNotifications(todayNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'pending':
      case 'unpaid':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Notifications */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            {notifications.length > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {notifications.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Today's Notifications</h4>
            {isLoading ? (
              <div className="text-sm text-muted-foreground">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="text-sm text-muted-foreground">No pending invoices today</div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((invoice) => (
                  <div 
                    key={invoice.id} 
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate('/invoices')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{invoice.client_name}</p>
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(invoice.due_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {formatAmount(invoice.total_amount || 0)}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">{user?.email || 'User'}</p>
            <p className="text-xs text-muted-foreground">Profile</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
