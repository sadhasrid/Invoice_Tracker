import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  PointElement,
  LineElement,
  Title
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Eye, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { differenceInDays, format, subDays } from 'date-fns';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

interface Invoice {
  id: string;
  client_name: string;
  total_amount: number;
  tax_amount: number;
  gst_percent: number;
  status: string;
  due_date: string;
  created_at: string;
}

const ManagementDashboardPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvoices(data || []);
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

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalRevenue = invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + (inv.total_amount || 0), 0);

    const totalTax = invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + (inv.tax_amount || 0), 0);

    const pendingCount = invoices.filter(inv => 
      ['pending', 'unpaid'].includes(inv.status?.toLowerCase() || '')
    ).length;

    const overdueCount = invoices.filter(inv => 
      inv.status?.toLowerCase() === 'overdue'
    ).length;

    const paidCount = invoices.filter(inv => 
      inv.status?.toLowerCase() === 'paid'
    ).length;

    const longDues = invoices.filter(inv => {
      if (inv.status?.toLowerCase() === 'paid') return false;
      const dueDate = new Date(inv.due_date);
      const daysOverdue = differenceInDays(new Date(), dueDate);
      return daysOverdue > 14; // More than 2 weeks
    });

    return {
      totalRevenue,
      totalTax,
      pendingCount,
      overdueCount,
      paidCount,
      longDues,
      totalInvoices: invoices.length
    };
  }, [invoices]);

  // GST/Tax Pie Chart Data
  const gstChartData = {
    labels: ['Base Amount', 'GST Tax'],
    datasets: [
      {
        data: [
          metrics.totalRevenue - metrics.totalTax,
          metrics.totalTax
        ],
        backgroundColor: [
          '#3B82F6', // Blue for base amount
          '#10B981'  // Green for GST
        ],
        borderColor: [
          '#1E40AF',
          '#059669'
        ],
        borderWidth: 2,
      },
    ],
  };

  // Invoice Status Chart Data
  const statusChartData = {
    labels: ['Paid', 'Pending', 'Overdue'],
    datasets: [
      {
        data: [metrics.paidCount, metrics.pendingCount, metrics.overdueCount],
        backgroundColor: [
          '#10B981', // Green for paid
          '#F59E0B', // Yellow for pending
          '#EF4444'  // Red for overdue
        ],
        borderColor: [
          '#059669',
          '#D97706',
          '#DC2626'
        ],
        borderWidth: 2,
      },
    ],
  };

  // Revenue Trend Chart Data (last 30 days)
  const revenueTrendData = useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => 
      format(subDays(new Date(), 29 - i), 'MMM dd')
    );

    const dailyRevenue = last30Days.map(date => {
      return invoices
        .filter(inv => {
          const invDate = format(new Date(inv.created_at), 'MMM dd');
          return invDate === date && inv.status === 'paid';
        })
        .reduce((sum, inv) => sum + (inv.total_amount || 0), 0);
    });

    return {
      labels: last30Days,
      datasets: [
        {
          label: 'Daily Revenue',
          data: dailyRevenue,
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }, [invoices]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.parsed;
            return `${context.label}: ₹${value.toLocaleString('en-IN')}`;
          }
        }
      }
    },
    onClick: (event: any, elements: any, chart: any) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        const datasetIndex = elements[0].datasetIndex;
        const chartType = chart.config.type;
        
        let filteredInvoices: Invoice[] = [];
        let title = '';

        if (chartType === 'pie') {
          const label = chart.data.labels[elementIndex];
          if (label === 'Base Amount') {
            filteredInvoices = invoices.filter(inv => inv.status === 'paid');
            title = 'Paid Invoices (Base Amount)';
          } else if (label === 'GST Tax') {
            filteredInvoices = invoices.filter(inv => inv.status === 'paid');
            title = 'Paid Invoices (GST Tax)';
          } else if (label === 'Paid') {
            filteredInvoices = invoices.filter(inv => inv.status === 'paid');
            title = 'Paid Invoices';
          } else if (label === 'Pending') {
            filteredInvoices = invoices.filter(inv => ['pending', 'unpaid'].includes(inv.status?.toLowerCase() || ''));
            title = 'Pending Invoices';
          } else if (label === 'Overdue') {
            filteredInvoices = invoices.filter(inv => inv.status === 'overdue');
            title = 'Overdue Invoices';
          }
        } else if (chartType === 'line') {
          const dateIndex = elementIndex;
          const date = chart.data.labels[dateIndex];
          filteredInvoices = invoices.filter(inv => {
            const invDate = format(new Date(inv.created_at), 'MMM dd');
            return invDate === date && inv.status === 'paid';
          });
          title = `Invoices for ${date}`;
        }

        setSelectedInvoices(filteredInvoices);
        setDialogTitle(title);
        setDialogOpen(true);
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Management Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive overview of business performance and key metrics
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(metrics.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                {metrics.totalInvoices} total invoices
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GST Collected</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(metrics.totalTax)}</div>
              <p className="text-xs text-muted-foreground">
                Tax revenue
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.pendingCount}</div>
              <p className="text-xs text-muted-foreground">
                {metrics.overdueCount} overdue
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Long Dues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{metrics.longDues.length}</div>
              <p className="text-xs text-muted-foreground">
                More than 2 weeks overdue
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* GST/Tax Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown (GST vs Base Amount)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Pie data={gstChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Invoice Status Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Pie data={statusChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Line data={revenueTrendData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Long Dues Hot List */}
        {metrics.longDues.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Long Dues Hot List (More than 2 weeks overdue)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {metrics.longDues.map((invoice) => {
                  const daysOverdue = differenceInDays(new Date(), new Date(invoice.due_date));
                  return (
                    <div 
                      key={invoice.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-red-50 cursor-pointer"
                      onClick={() => {
                        setSelectedInvoices([invoice]);
                        setDialogTitle('Long Due Invoice Details');
                        setDialogOpen(true);
                      }}
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold">{invoice.client_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Due: {format(new Date(invoice.due_date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-600">
                          {formatCurrency(invoice.total_amount || 0)}
                        </div>
                        <Badge variant="destructive">
                          {daysOverdue} days overdue
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Invoice Details Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto flex-1">
              {selectedInvoices.length === 0 ? (
                <p className="text-muted-foreground">No invoices found</p>
              ) : (
                <div className="space-y-3">
                  {selectedInvoices.map((invoice) => (
                    <div key={invoice.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{invoice.client_name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Due: {format(new Date(invoice.due_date), 'MMM dd, yyyy')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            GST: {invoice.gst_percent}% (₹{invoice.tax_amount?.toLocaleString('en-IN') || 0})
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            {formatCurrency(invoice.total_amount || 0)}
                          </div>
                          <Badge 
                            variant={
                              invoice.status === 'paid' ? 'default' :
                              invoice.status === 'overdue' ? 'destructive' : 'secondary'
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ManagementDashboardPage;