import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Invoice } from "@/pages/Dashboard";
import { useToast } from "@/hooks/use-toast";

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateInvoice: (invoice: Omit<Invoice, "id">) => void;
}

export const CreateInvoiceDialog = ({
  open,
  onOpenChange,
  onCreateInvoice,
}: CreateInvoiceDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    clientName: "",
    amount: "",
    taxRate: "18",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.invoiceNumber || !formData.clientName || !formData.amount || !formData.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(formData.amount);
    const taxRate = parseFloat(formData.taxRate);
    const taxAmount = (amount * taxRate) / 100;
    const totalAmount = amount + taxAmount;

    const invoice: Omit<Invoice, "id"> = {
      invoiceNumber: formData.invoiceNumber,
      clientName: formData.clientName,
      amount,
      taxRate,
      taxAmount,
      totalAmount,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
      status: "unpaid",
      description: formData.description,
    };

    onCreateInvoice(invoice);
    toast({
      title: "Success",
      description: "Invoice created successfully",
    });

    // Reset form
    setFormData({
      invoiceNumber: "",
      clientName: "",
      amount: "",
      taxRate: "18",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: "",
      description: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new invoice
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number *</Label>
              <Input
                id="invoiceNumber"
                placeholder="INV-001"
                value={formData.invoiceNumber}
                onChange={(e) =>
                  setFormData({ ...formData, invoiceNumber: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                placeholder="Client name"
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({ ...formData, clientName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Base Amount (₹) *</Label>
              <Input
                id="amount"
                type="number"
                placeholder="50000"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%) *</Label>
              <Input
                id="taxRate"
                type="number"
                placeholder="18"
                value={formData.taxRate}
                onChange={(e) =>
                  setFormData({ ...formData, taxRate: e.target.value })
                }
                required
                min="0"
                max="100"
                step="0.01"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date *</Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) =>
                  setFormData({ ...formData, issueDate: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of services provided..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          {formData.amount && formData.taxRate && (
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Base Amount:</span>
                <span className="font-semibold">
                  ₹{parseFloat(formData.amount).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax ({formData.taxRate}%):</span>
                <span className="font-semibold">
                  ₹
                  {(
                    (parseFloat(formData.amount) * parseFloat(formData.taxRate)) /
                    100
                  ).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t">
                <span>Total Amount:</span>
                <span className="text-primary">
                  ₹
                  {(
                    parseFloat(formData.amount) +
                    (parseFloat(formData.amount) * parseFloat(formData.taxRate)) /
                      100
                  ).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Invoice</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
