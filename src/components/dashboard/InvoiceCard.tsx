import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Invoice } from "@/pages/Dashboard";
import { Calendar, MoreVertical, Trash2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import InvoiceDetailsDialog from "./InvoiceDetailsDialog";

interface InvoiceCardProps {
  invoice: Invoice;
  onUpdateStatus: (id: string, status: Invoice["status"]) => void;
  onDelete: (id: string) => void;
}

export const InvoiceCard = ({
  invoice,
  onUpdateStatus,
  onDelete,
}: InvoiceCardProps) => {
  const statusColors = {
    paid: "bg-chart-2/10 text-chart-2 hover:bg-chart-2/20",
    unpaid: "bg-chart-3/10 text-chart-3 hover:bg-chart-3/20",
    overdue: "bg-chart-4/10 text-chart-4 hover:bg-chart-4/20",
  };

  const isOverdue =
    invoice.status === "unpaid" && new Date(invoice.dueDate) < new Date();

  if (isOverdue && invoice.status !== "overdue") {
    onUpdateStatus(invoice.id, "overdue");
  }

  const [open, setOpen] = useState(false);
  return (
    <Card className="p-4 hover:shadow-md transition-shadow" onClick={() => setOpen(true)}>
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">{invoice.clientName}</h3>
                <Badge className={statusColors[invoice.status]}>
                  {invoice.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {invoice.invoiceNumber}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {invoice.status !== "paid" && (
                  <DropdownMenuItem
                    onClick={() => onUpdateStatus(invoice.id, "paid")}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark as Paid
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => onDelete(invoice.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {invoice.description && (
            <p className="text-sm text-muted-foreground">
              {invoice.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Issue: {new Date(invoice.issueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Base Amount</p>
              <p className="font-semibold">
                ₹{invoice.amount.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Tax ({invoice.taxRate}%)
              </p>
              <p className="font-semibold">
                ₹{invoice.taxAmount.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">Total Amount</p>
              <p className="text-lg font-bold text-primary">
                ₹{invoice.totalAmount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <InvoiceDetailsDialog open={open} onOpenChange={setOpen} invoice={{
        id: invoice.id,
        client_name: invoice.clientName,
        invoiceNumber: invoice.invoiceNumber,
        due_date: invoice.dueDate,
        status: invoice.status,
        amount: invoice.amount,
        tax_amount: invoice.taxAmount,
        total_amount: invoice.totalAmount,
      }} />
    </Card>
  );
};
