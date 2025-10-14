import { Card, CardContent } from "@/components/ui/card";
import { Invoice } from "@/pages/Dashboard";
import { IndianRupee, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

interface DashboardStatsProps {
  invoices: Invoice[];
}

export const DashboardStats = ({ invoices }: DashboardStatsProps) => {
  const totalRevenue = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const isPendingLike = (status: string) => status === "pending" || status === "unpaid" || status === "overdue";

  const pendingAmount = invoices
    .filter((inv) => isPendingLike(inv.status))
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const overdueAmount = invoices
    .filter((inv) => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const totalTax = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.taxAmount, 0);

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      trend: "+12.5%",
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      title: "Pending Payments",
      value: `₹${pendingAmount.toLocaleString("en-IN")}`,
      icon: Clock,
      trend: `${invoices.filter((inv) => isPendingLike(inv.status)).length} invoices`,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      title: "Overdue",
      value: `₹${overdueAmount.toLocaleString("en-IN")}`,
      icon: TrendingUp,
      trend: `${invoices.filter((inv) => inv.status === "overdue").length} invoices`,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
    {
      title: "Tax Collected",
      value: `₹${totalTax.toLocaleString("en-IN")}`,
      icon: CheckCircle2,
      trend: "GST 18%",
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden transition-all hover:shadow-lg border-muted/60 hover:border-muted">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-semibold tracking-tight">{stat.value}</h3>
                <p className={`text-xs ${stat.color}`}>{stat.trend}</p>
              </div>
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl shadow-sm`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
