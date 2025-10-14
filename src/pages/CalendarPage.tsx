import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import InvoiceDetailsDialog from '@/components/dashboard/InvoiceDetailsDialog';

const CalendarPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <CalendarIcon className="text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-muted-foreground">Plan work and set payment reminders.</p>
          </div>
        </div>
        <InvoiceCalendar />
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;


const InvoiceCalendar = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[] | null>(null);
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    status: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.from('invoices').select('*');
        if (error) throw error;
        setRows(data || []);
      } catch (e: any) {
        toast({ title: 'Error', description: e.message, variant: 'destructive' });
      }
    })();
  }, []);

  useEffect(() => {
    const handleOpenDetails = (event: any) => {
      setSelectedInvoice(event.detail);
      setDetailsOpen(true);
    };
    
    window.addEventListener('openInvoiceDetails', handleOpenDetails);
    return () => window.removeEventListener('openInvoiceDetails', handleOpenDetails);
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter(row => {
      const dueDate = row.due_date?.slice(0,10);
      if (!dueDate) return false;
      
      // Date filters
      if (filters.fromDate && dueDate < filters.fromDate) return false;
      if (filters.toDate && dueDate > filters.toDate) return false;
      
      // Status filter
      if (filters.status !== 'all') {
        const status = String(row.status || '').toLowerCase();
        if (filters.status === 'overdue' && status !== 'overdue') return false;
        if (filters.status === 'pending' && !['pending', 'unpaid'].includes(status)) return false;
        if (filters.status === 'paid' && status !== 'paid') return false;
      }
      
      return true;
    });
  }, [rows, filters]);

  const byDate = useMemo(() => {
    const map = new Map<string, { pending: number; overdue: number; items: any[] }>();
    for (const r of filteredRows) {
      const d = r.due_date?.slice(0,10);
      if (!d) continue;
      const entry = map.get(d) || { pending: 0, overdue: 0, items: [] };
      const status = String(r.status || '').toLowerCase();
      if (status === 'overdue') entry.overdue += 1;
      else if (status === 'pending' || status === 'unpaid') entry.pending += 1;
      entry.items.push(r);
      map.set(d, entry);
    }
    return map;
  }, [filteredRows]);

  const days = 42; // 6 weeks grid
  const today = new Date();
  const first = new Date(today.getFullYear(), today.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - ((first.getDay()+6)%7)); // start Monday

  const grid = Array.from({ length: days }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = d.toISOString().slice(0,10);
    const info = byDate.get(key);
    return { d, key, info, inMonth: d.getMonth() === today.getMonth() };
  });

  const paginatedItems = selected ? selected.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];
  const totalPages = selected ? Math.ceil(selected.length / itemsPerPage) : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Payments Calendar</CardTitle>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">Filters</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="fromDate">From Date</Label>
              <Input
                id="fromDate"
                type="date"
                value={filters.fromDate}
                onChange={(e) => setFilters({...filters, fromDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="toDate">To Date</Label>
              <Input
                id="toDate"
                type="date"
                value={filters.toDate}
                onChange={(e) => setFilters({...filters, toDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => setFilters({fromDate: '', toDate: '', status: 'all'})}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(h => (
            <div key={h} className="text-xs text-muted-foreground px-2">{h}</div>
          ))}
          {grid.map(({ d, key, info, inMonth }) => (
            <div key={key} className={`border-2 border-gray-300 rounded-lg p-2 min-h-[72px] cursor-pointer transition-all hover:bg-orange-50 hover:border-orange-300 hover:shadow-md ${inMonth ? 'bg-white' : 'opacity-50 bg-gray-50'}`} onClick={() => { if (info) { setSelected(info.items); setOpen(true); } }}>
              <div className="flex items-center justify-between text-xs">
                <span>{d.getDate()}</span>
                {info && (
                  <div className="flex gap-1">
                    {info.pending > 0 && <span className="inline-flex items-center justify-center rounded bg-yellow-100 text-yellow-800 px-1">{info.pending}</span>}
                    {info.overdue > 0 && <span className="inline-flex items-center justify-center rounded bg-red-100 text-red-800 px-1">{info.overdue}</span>}
                  </div>
                )}
              </div>
              {info && (
                <div className="mt-1 space-y-1">
                  {info.items.slice(0,2).map((it:any) => (
                    <div key={it.id} className="truncate text-xs text-muted-foreground">{it.client_name} · ₹{Number(it.total_amount||0).toLocaleString('en-IN')}</div>
                  ))}
                  {info.items.length > 2 && <div className="text-[10px] text-primary">+{info.items.length-2} more</div>}
                </div>
              )}
            </div>
          ))}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Invoices for Selected Date</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 pr-2">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-left text-muted-foreground border-b">
                    <th className="p-3 font-semibold">Client</th>
                    <th className="p-3 font-semibold">Status</th>
                    <th className="p-3 font-semibold">Amount</th>
                    <th className="p-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.map((it:any) => (
                    <tr key={it.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{it.client_name}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          it.status === 'paid' ? 'bg-green-100 text-green-800' :
                          it.status === 'overdue' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {it.status}
                        </span>
                      </td>
                      <td className="p-3 font-semibold">₹{Number(it.total_amount||0).toLocaleString('en-IN')}</td>
                      <td className="p-3">
                        <button 
                          className="text-blue-600 hover:text-blue-800 font-medium underline"
                          onClick={() => {
                            // Find full invoice data and show details
                            const fullInvoice = rows.find(r => r.id === it.id);
                            if (fullInvoice) {
                              setOpen(false);
                              // Open invoice details dialog
                              setTimeout(() => {
                                const event = new CustomEvent('openInvoiceDetails', { detail: fullInvoice });
                                window.dispatchEvent(event);
                              }, 100);
                            }
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, selected?.length || 0)} of {selected?.length || 0} invoices
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        <InvoiceDetailsDialog 
          open={detailsOpen} 
          onOpenChange={setDetailsOpen} 
          invoice={selectedInvoice} 
        />
      </CardContent>
    </Card>
  );
};

