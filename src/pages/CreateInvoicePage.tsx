import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as XLSX from 'xlsx';

const CreateInvoicePage = () => {
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState('');
  const [gstPercent, setGstPercent] = useState('18');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<'Pending' | 'Paid' | 'Overdue'>('Pending');
  const [loading, setLoading] = useState(false);
  const [panFile, setPanFile] = useState<File | null>(null);
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to create an invoice',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Upload documents first if present
      let pan_url: string | null = null;
      let aadhaar_url: string | null = null;

      if (user && panFile) {
        const panPath = `${user.id}/kyc/pan_${Date.now()}_${panFile.name}`;
        const { data, error } = await supabase.storage.from('kyc').upload(panPath, panFile, { upsert: false });
        if (error) throw error;
        const { data: pub } = supabase.storage.from('kyc').getPublicUrl(data.path);
        pan_url = pub.publicUrl;
      }

      if (user && aadhaarFile) {
        const aadhaarPath = `${user.id}/kyc/aadhaar_${Date.now()}_${aadhaarFile.name}`;
        const { data, error } = await supabase.storage.from('kyc').upload(aadhaarPath, aadhaarFile, { upsert: false });
        if (error) throw error;
        const { data: pub } = supabase.storage.from('kyc').getPublicUrl(data.path);
        aadhaar_url = pub.publicUrl;
      }

      const amountNumber = parseFloat(amount);
      const gstRate = parseFloat(gstPercent) / 100;
      const tax_amount = amountNumber * gstRate;
      const total_amount = amountNumber + tax_amount;

      const { error } = await supabase.from('invoices').insert({
        user_id: user.id,
        client_name: clientName,
        amount: amountNumber,
        gst_percent: parseFloat(gstPercent),
        tax_amount,
        total_amount,
        due_date: dueDate,
        status: status,
        pan_url,
        aadhaar_url,
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Invoice created successfully',
      });

      navigate('/invoices');
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

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Invoice</h1>
          <p className="text-muted-foreground">Fill in the details to create a new invoice</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  placeholder="Enter client name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gst">GST Percent (%)</Label>
                <Input
                  id="gst"
                  type="number"
                  step="0.01"
                  value={gstPercent}
                  onChange={(e) => setGstPercent(e.target.value)}
                  min="0"
                  max="100"
                  required
                />
                <div className="text-sm text-muted-foreground">
                  Tax: ₹{(Number(amount || 0) * Number(gstPercent || 0) / 100).toFixed(2)} · Total: ₹{(Number(amount || 0) + (Number(amount || 0) * Number(gstPercent || 0) / 100)).toFixed(2)}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pan">PAN Card Image</Label>
                  <Input id="pan" type="file" accept="image/*" onChange={(e) => setPanFile(e.target.files?.[0] ?? null)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadhaar">Aadhaar Card Image</Label>
                  <Input id="aadhaar" type="file" accept="image/*" onChange={(e) => setAadhaarFile(e.target.files?.[0] ?? null)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Invoice
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/invoices')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end">
          <label className="text-sm font-medium mr-3">Bulk import (Excel .xlsx)</label>
          <Input type="file" accept=".xlsx,.xls" onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file || !user) return;
            try {
              setLoading(true);
              const buf = await file.arrayBuffer();
              const wb = XLSX.read(buf);
              const ws = wb.Sheets[wb.SheetNames[0]];
              const rows: any[] = XLSX.utils.sheet_to_json(ws);
              // Expect columns: client_name, amount, gst_percent, due_date, status
              const payload = rows.map((r) => {
                const baseAmount = Number(r.amount || 0);
                const gst = Number(r.gst_percent || 0)/100;
                const tax_amount = baseAmount * gst;
                const total_amount = baseAmount + tax_amount;
                return {
                  user_id: user.id,
                  client_name: String(r.client_name || ''),
                  amount: baseAmount,
                  gst_percent: Number(r.gst_percent || 0),
                  tax_amount,
                  total_amount,
                  due_date: r.due_date ? new Date(r.due_date).toISOString().slice(0,10) : null,
                  status: String(r.status || 'Pending'),
                };
              });
              const { error } = await supabase.from('invoices').insert(payload);
              if (error) throw error;
              toast({ title: 'Imported', description: `Imported ${payload.length} invoices` });
            } catch (err: any) {
              toast({ title: 'Import failed', description: err.message, variant: 'destructive' });
            } finally {
              setLoading(false);
            }
          }} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateInvoicePage;
