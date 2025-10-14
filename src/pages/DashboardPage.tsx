import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Invoice } from './Dashboard';

const DashboardPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchInvoices();
    }
  }, [user]);

  const fetchInvoices = async () => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedInvoices: Invoice[] = (data || []).map((invoice) => ({
        id: invoice.id,
        invoiceNumber: `INV-${invoice.id.slice(0, 8).toUpperCase()}`,
        clientName: invoice.client_name,
        amount: Number(invoice.amount),
        taxRate: 18,
        taxAmount: Number(invoice.amount) * 0.18,
        totalAmount: Number(invoice.amount) * 1.18,
        issueDate: invoice.created_at.split('T')[0],
        dueDate: invoice.due_date,
        status: invoice.status.toLowerCase() as 'paid' | 'unpaid' | 'overdue',
      }));

      setInvoices(formattedInvoices);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your invoices.</p>
        </div>
        <DashboardStats invoices={invoices} />
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {invoices.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No invoices yet. Create your first invoice to get started!
              </p>
            ) : (
              <div className="space-y-4">
                {invoices.slice(0, 5).map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{invoice.clientName}</p>
                      <p className="text-sm text-muted-foreground">{invoice.invoiceNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{invoice.totalAmount.toLocaleString('en-IN')}</p>
                      <p className="text-sm text-muted-foreground capitalize">{invoice.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
