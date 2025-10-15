import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type Alert = { id: string; type: string; message: string; due_at: string | null; resolved: boolean };
type Invoice = { id: string; client_name: string; due_date: string; status: string; total_amount?: number };

const AlertsOverduePage = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data: aData, error: aErr } = await supabase.from('alerts').select('*').order('due_at', { ascending: true });
      if (aErr) throw aErr;
      setAlerts((aData as any) || []);

      const { data: iData, error: iErr } = await supabase
        .from('invoices')
        .select('id, client_name, due_date, status, total_amount')
        .or('status.eq.Overdue,status.eq.overdue,status.eq.Pending,status.eq.unpaid')
        .order('due_date', { ascending: true });
      if (iErr) throw iErr;
      setInvoices((iData as any) || []);
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const resolveAlert = async (id: string) => {
    try {
      const { error } = await supabase.from('alerts').update({ resolved: true }).eq('id', id);
      if (error) throw error;
      setAlerts((a) => a.map(x => x.id === id ? { ...x, resolved: true } : x));
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const snoozeAlert = async (id: string, days = 3) => {
    try {
      const next = new Date();
      next.setDate(next.getDate() + days);
      const iso = next.toISOString();
      const { error } = await supabase.from('alerts').update({ due_at: iso }).eq('id', id);
      if (error) throw error;
      setAlerts((a) => a.map(x => x.id === id ? { ...x, due_at: iso } : x));
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Alerts & Overdue</h1>
            <p className="text-muted-foreground">Upcoming dues, overdue invoices, and manual alerts.</p>
          </div>
          <Button
            onClick={async () => {
              try {
                const { data, error } = await supabase.functions.invoke('send-invoice-alert', {
                  body: { to_email: '2324006@saec.ac.in' }
                });
                if (error) throw error;
                toast({ 
                  title: 'Email sent successfully', 
                  description: `Sent invoice alert to 2324006@saec.ac.in` 
                });
              } catch (e: any) {
                toast({ title: 'Failed to send email', description: e.message, variant: 'destructive' });
              }
            }}
          >
            Send Test Email
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : alerts.length === 0 ? (
              <p className="text-muted-foreground">No alerts.</p>
            ) : (
              <div className="space-y-2">
                {alerts.map(a => (
                  <div key={a.id} className="flex items-center justify-between border rounded-md p-3">
                    <div>
                      <p className="font-medium capitalize">{a.type.replaceAll('_',' ')}</p>
                      <p className="text-sm text-muted-foreground">{a.message}</p>
                      {a.due_at && <p className="text-xs text-muted-foreground">Due: {new Date(a.due_at).toLocaleString()}</p>}
                    </div>
                    <div className="flex gap-2">
                      {!a.resolved && <Button size="sm" onClick={() => resolveAlert(a.id)}>Resolve</Button>}
                      <Button size="sm" variant="outline" onClick={() => snoozeAlert(a.id)}>Snooze 3d</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Due & Overdue Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : (
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="p-2">Client</th>
                      <th className="p-2">Due Date</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map(inv => (
                      <tr key={inv.id} className="border-t">
                        <td className="p-2">{inv.client_name}</td>
                        <td className="p-2">{inv.due_date}</td>
                        <td className="p-2 capitalize">{inv.status}</td>
                        <td className="p-2">₹{Number(inv.total_amount || 0).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AlertsOverduePage;


