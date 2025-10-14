import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { InvoiceList } from '@/components/dashboard/InvoiceList';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Invoice } from './Dashboard';

const InvoicesPage = () => {
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

  const handleUpdateStatus = async (id: string, status: Invoice['status']) => {
    try {
      const { error } = await supabase
        .from('invoices')
        .update({ status: status.charAt(0).toUpperCase() + status.slice(1) })
        .eq('id', id);

      if (error) throw error;

      setInvoices(
        invoices.map((inv) => (inv.id === id ? { ...inv, status } : inv))
      );

      toast({
        title: 'Success',
        description: 'Invoice status updated successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('invoices').delete().eq('id', id);

      if (error) throw error;

      setInvoices(invoices.filter((inv) => inv.id !== id));

      toast({
        title: 'Success',
        description: 'Invoice deleted successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
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
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">Manage all your invoices in one place</p>
        </div>
        <InvoiceList
          invoices={invoices}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default InvoicesPage;
