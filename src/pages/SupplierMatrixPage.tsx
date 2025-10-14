import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

type Supplier = { id: string; name: string; email: string | null };
type Metric = { id: string; supplier_id: string; period: string; on_time_rate: number | null; defect_rate: number | null; spend: number | null };

const SupplierMatrixPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<{ supplier_id: string; period: string; on_time_rate: string; defect_rate: string; spend: string }>({ supplier_id: '', period: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0,10), on_time_rate: '', defect_rate: '', spend: '' });
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        // Derive supplier list from invoices (distinct client_name)
        const { data: inv, error: invErr } = await supabase
          .from('invoices')
          .select('client_name')
          .neq('client_name', null);
        if (invErr) throw invErr;
        const names = Array.from(new Set((inv || []).map((r: any) => r.client_name).filter(Boolean)));
        // Map to suppliers table (create rows if missing so metrics can reference)
        const { data: existing } = await supabase.from('suppliers').select('id,name');
        const existingMap = new Map((existing || []).map((s: any) => [s.name, s.id]));
        const toInsert = names.filter((n) => !existingMap.has(n)).map((n) => ({ name: n, user_id: user?.id }));
        if (toInsert.length) {
          const { error: insErr } = await supabase.from('suppliers').insert(toInsert);
          if (insErr) throw insErr;
        }
        const { data: sRows, error: sError } = await supabase.from('suppliers').select('id,name,email').order('name');
        if (sError) throw sError;
        setSuppliers((sRows as any) || []);
        const { data: mErr, error: mError } = await supabase.from('supplier_metrics').select('*').order('period', { ascending: false });
        if (mError) throw mError;
        setMetrics((mErr as any) || []);
      } catch (e: any) {
        toast({ title: 'Error', description: e.message, variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addMetric = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        supplier_id: form.supplier_id,
        period: form.period,
        on_time_rate: form.on_time_rate ? Number(form.on_time_rate) : null,
        defect_rate: form.defect_rate ? Number(form.defect_rate) : null,
        spend: form.spend ? Number(form.spend) : null,
      };
      const { error } = await supabase.from('supplier_metrics').insert(payload);
      if (error) throw error;
      toast({ title: 'Saved', description: 'Metric added' });
      setMetrics((old) => [{ id: crypto.randomUUID(), ...(payload as any) }, ...old]);
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  // Auto KPIs from invoices: spend and on-time estimate
  const autoKpis = useMemo(() => {
    const map = new Map<string, { spend: number; total: number; overdue: number }>();
    // For lightweight calculation, fetch minimal invoice data here
    // Note: we cannot call supabase in render; this hook expects suppliers present already
    return map;
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Supplier Performance Matrix</h1>
            <p className="text-muted-foreground">Track on-time delivery, defect rate, and spend monthly.</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add Monthly Metric</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addMetric} className="grid md:grid-cols-5 gap-3">
              <div className="md:col-span-2">
                <Label>Supplier</Label>
                <select className="w-full h-9 rounded-md border px-2" value={form.supplier_id} onChange={(e) => setForm({ ...form, supplier_id: e.target.value })} required>
                  <option value="">Select supplier</option>
                  {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <Label>Period</Label>
                <Input type="date" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} required />
              </div>
              <div>
                <Label>On-time %</Label>
                <Input type="number" step="0.01" value={form.on_time_rate} onChange={(e) => setForm({ ...form, on_time_rate: e.target.value })} />
              </div>
              <div>
                <Label>Defect %</Label>
                <Input type="number" step="0.01" value={form.defect_rate} onChange={(e) => setForm({ ...form, defect_rate: e.target.value })} />
              </div>
              <div>
                <Label>Spend (₹)</Label>
                <Input type="number" step="0.01" value={form.spend} onChange={(e) => setForm({ ...form, spend: e.target.value })} />
              </div>
              <div className="md:col-span-5"><Button type="submit">Add Metric</Button></div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : (
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="p-2">Supplier</th>
                      <th className="p-2">Period</th>
                      <th className="p-2">On-time %</th>
                      <th className="p-2">Defect %</th>
                      <th className="p-2">Spend (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.map(m => {
                      const s = suppliers.find(s => s.id === m.supplier_id);
                      return (
                        <tr key={m.id} className="border-t">
                          <td className="p-2">{s?.name || '—'}</td>
                          <td className="p-2">{m.period}</td>
                          <td className="p-2">{m.on_time_rate ?? '—'}</td>
                          <td className="p-2">{m.defect_rate ?? '—'}</td>
                          <td className="p-2">{m.spend?.toLocaleString('en-IN') ?? '—'}</td>
                        </tr>
                      );
                    })}
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

export default SupplierMatrixPage;


