import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { InvoiceList } from "@/components/dashboard/InvoiceList";
import { CreateInvoiceDialog } from "@/components/dashboard/CreateInvoiceDialog";
import { Plus, FileText } from "lucide-react";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  issueDate: string;
  dueDate: string;
  status: "paid" | "unpaid" | "overdue";
  description?: string;
}

const Dashboard = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNumber: "INV-001",
      clientName: "Acme Corporation",
      amount: 50000,
      taxRate: 18,
      taxAmount: 9000,
      totalAmount: 59000,
      issueDate: "2025-09-01",
      dueDate: "2025-09-30",
      status: "paid",
      description: "Website development services",
    },
    {
      id: "2",
      invoiceNumber: "INV-002",
      clientName: "Tech Startup Inc",
      amount: 75000,
      taxRate: 18,
      taxAmount: 13500,
      totalAmount: 88500,
      issueDate: "2025-09-15",
      dueDate: "2025-10-15",
      status: "unpaid",
      description: "Mobile app development",
    },
    {
      id: "3",
      invoiceNumber: "INV-003",
      clientName: "Digital Agency Ltd",
      amount: 35000,
      taxRate: 18,
      taxAmount: 6300,
      totalAmount: 41300,
      issueDate: "2025-08-20",
      dueDate: "2025-09-20",
      status: "overdue",
      description: "Consulting services",
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateInvoice = (newInvoice: Omit<Invoice, "id">) => {
    const invoice: Invoice = {
      ...newInvoice,
      id: Date.now().toString(),
    };
    setInvoices([invoice, ...invoices]);
  };

  const handleUpdateInvoiceStatus = (id: string, status: Invoice["status"]) => {
    setInvoices(
      invoices.map((inv) => (inv.id === id ? { ...inv, status } : inv))
    );
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Invoice Tracker</h1>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <DashboardStats invoices={invoices} />
        <InvoiceList
          invoices={invoices}
          onUpdateStatus={handleUpdateInvoiceStatus}
          onDelete={handleDeleteInvoice}
        />
      </main>

      <CreateInvoiceDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateInvoice={handleCreateInvoice}
      />
    </div>
  );
};

export default Dashboard;
