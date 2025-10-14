import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  invoice: any | null;
};

export const InvoiceDetailsDialog = ({ open, onOpenChange, invoice }: Props) => {
  const [fullInvoice, setFullInvoice] = useState<any>(null);
  
  useEffect(() => {
    const handleOpenDetails = (event: any) => {
      setFullInvoice(event.detail);
      onOpenChange(true);
    };
    
    window.addEventListener('openInvoiceDetails', handleOpenDetails);
    return () => window.removeEventListener('openInvoiceDetails', handleOpenDetails);
  }, [onOpenChange]);

  const displayInvoice = fullInvoice || invoice;
  if (!displayInvoice) return null;
  
  const format = (n?: number) => typeof n === 'number' ? n.toLocaleString('en-IN') : '—';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Invoice Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 overflow-y-auto flex-1 pr-2">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-lg font-bold text-gray-700">Client Name</Label>
              <div className="mt-2 text-lg font-medium">{displayInvoice.client_name || displayInvoice.clientName}</div>
            </div>
            <div>
              <Label className="text-lg font-bold text-gray-700">Invoice Number</Label>
              <div className="mt-2 text-lg font-medium">{displayInvoice.invoiceNumber || displayInvoice.id}</div>
            </div>
            <div>
              <Label className="text-lg font-bold text-gray-700">Due Date</Label>
              <div className="mt-2 text-lg font-medium">{(displayInvoice.due_date || displayInvoice.dueDate || '').toString().slice(0,10)}</div>
            </div>
            <div>
              <Label className="text-lg font-bold text-gray-700">Status</Label>
              <div className="mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  displayInvoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                  displayInvoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {displayInvoice.status}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-4 border-t">
            <div>
              <Label className="text-lg font-bold text-gray-700">Base Amount (₹)</Label>
              <div className="mt-2 text-xl font-bold">₹{format(displayInvoice.amount)}</div>
            </div>
            <div>
              <Label className="text-lg font-bold text-gray-700">GST %</Label>
              <div className="mt-2 text-xl font-bold">{displayInvoice.gst_percent ?? '—'}</div>
            </div>
            <div>
              <Label className="text-lg font-bold text-gray-700">Tax Amount (₹)</Label>
              <div className="mt-2 text-xl font-bold">₹{format(displayInvoice.tax_amount || displayInvoice.taxAmount)}</div>
            </div>
            <div className="col-span-3">
              <Label className="text-lg font-bold text-gray-700">Total Amount (₹)</Label>
              <div className="mt-2 text-2xl font-bold text-primary">₹{format(displayInvoice.total_amount || displayInvoice.totalAmount)}</div>
            </div>
          </div>

          {(displayInvoice.pan_url || displayInvoice.aadhaar_url) && (
            <div className="pt-4 border-t">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Uploaded Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayInvoice.pan_url && (
                  <div>
                    <Label className="text-lg font-bold text-gray-700">PAN Card</Label>
                    <div className="mt-2 max-h-96 overflow-y-auto border rounded-lg">
                      <img 
                        src={displayInvoice.pan_url} 
                        alt="PAN Card" 
                        className="w-full h-auto rounded-lg border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow cursor-pointer" 
                        onClick={() => window.open(displayInvoice.pan_url, '_blank')}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Click image to view full size</p>
                  </div>
                )}
                {displayInvoice.aadhaar_url && (
                  <div>
                    <Label className="text-lg font-bold text-gray-700">Aadhaar Card</Label>
                    <div className="mt-2 max-h-96 overflow-y-auto border rounded-lg">
                      <img 
                        src={displayInvoice.aadhaar_url} 
                        alt="Aadhaar Card" 
                        className="w-full h-auto rounded-lg border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow cursor-pointer" 
                        onClick={() => window.open(displayInvoice.aadhaar_url, '_blank')}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Click image to view full size</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDetailsDialog;


