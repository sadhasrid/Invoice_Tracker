import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Invoice {
  id: string;
  client_name: string;
  amount: number;
  due_date: string;
  status: string;
  total_amount?: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to_email } = await req.json();
    
    if (!to_email) {
      throw new Error("to_email is required");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get current date
    const today = new Date().toISOString().split('T')[0];
    const threeDaysLater = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Fetch overdue invoices
    const { data: overdueInvoices, error: overdueError } = await supabase
      .from('invoices')
      .select('*')
      .lt('due_date', today)
      .in('status', ['Pending', 'Unpaid', 'Overdue'])
      .order('due_date', { ascending: true });

    if (overdueError) {
      console.error("Error fetching overdue invoices:", overdueError);
    }

    // Fetch upcoming invoices (due within 3 days)
    const { data: upcomingInvoices, error: upcomingError } = await supabase
      .from('invoices')
      .select('*')
      .gte('due_date', today)
      .lte('due_date', threeDaysLater)
      .in('status', ['Pending', 'Unpaid'])
      .order('due_date', { ascending: true });

    if (upcomingError) {
      console.error("Error fetching upcoming invoices:", upcomingError);
    }

    const overdueList = (overdueInvoices || []) as Invoice[];
    const upcomingList = (upcomingInvoices || []) as Invoice[];

    // Calculate totals
    const overdueTotal = overdueList.reduce((sum, inv) => sum + (Number(inv.total_amount) || Number(inv.amount) || 0), 0);
    const upcomingTotal = upcomingList.reduce((sum, inv) => sum + (Number(inv.total_amount) || Number(inv.amount) || 0), 0);

    // Build HTML email
    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 30px; }
    .summary { display: flex; gap: 20px; margin-bottom: 30px; }
    .summary-card { flex: 1; padding: 20px; border-radius: 8px; text-align: center; }
    .overdue-card { background-color: #fee; border: 2px solid #f66; }
    .upcoming-card { background-color: #fef; border: 2px solid #fa6; }
    .summary-card h2 { margin: 0 0 10px 0; font-size: 32px; color: #333; }
    .summary-card p { margin: 0; font-size: 14px; color: #666; }
    .section { margin-bottom: 30px; }
    .section h3 { color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-bottom: 15px; }
    table { width: 100%; border-collapse: collapse; }
    th { background-color: #667eea; color: white; padding: 12px; text-align: left; font-size: 14px; }
    td { padding: 12px; border-bottom: 1px solid #ddd; font-size: 14px; }
    tr:hover { background-color: #f9f9f9; }
    .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
    .status-overdue { background-color: #fee; color: #c33; }
    .status-pending { background-color: #fef; color: #f90; }
    .footer { background-color: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 12px; }
    .amount { font-weight: bold; color: #667eea; }
    .empty { text-align: center; padding: 20px; color: #999; font-style: italic; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Invoice Alert Report</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Your invoice summary for ${new Date().toLocaleDateString()}</p>
    </div>
    
    <div class="content">
      <div class="summary">
        <div class="summary-card overdue-card">
          <h2>${overdueList.length}</h2>
          <p>Overdue Invoices</p>
          <p class="amount">₹${overdueTotal.toLocaleString('en-IN')}</p>
        </div>
        <div class="summary-card upcoming-card">
          <h2>${upcomingList.length}</h2>
          <p>Upcoming (3 days)</p>
          <p class="amount">₹${upcomingTotal.toLocaleString('en-IN')}</p>
        </div>
      </div>

      ${overdueList.length > 0 ? `
      <div class="section">
        <h3>🚨 Overdue Invoices</h3>
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${overdueList.map(inv => `
              <tr>
                <td>${inv.client_name}</td>
                <td>${new Date(inv.due_date).toLocaleDateString()}</td>
                <td class="amount">₹${(Number(inv.total_amount) || Number(inv.amount) || 0).toLocaleString('en-IN')}</td>
                <td><span class="status status-overdue">OVERDUE</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ` : '<div class="empty">✅ No overdue invoices</div>'}

      ${upcomingList.length > 0 ? `
      <div class="section">
        <h3>⏰ Upcoming Invoices (Next 3 Days)</h3>
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${upcomingList.map(inv => `
              <tr>
                <td>${inv.client_name}</td>
                <td>${new Date(inv.due_date).toLocaleDateString()}</td>
                <td class="amount">₹${(Number(inv.total_amount) || Number(inv.amount) || 0).toLocaleString('en-IN')}</td>
                <td><span class="status status-pending">${inv.status.toUpperCase()}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ` : '<div class="empty">✅ No upcoming invoices</div>'}
    </div>

    <div class="footer">
      <p>This is an automated alert from Invoice Tracker</p>
      <p>Generated on ${new Date().toLocaleString()}</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send email
    const emailResponse = await resend.emails.send({
      from: "Invoice Tracker <onboarding@resend.dev>",
      to: [to_email],
      subject: `Invoice Alert: ${overdueList.length} Overdue, ${upcomingList.length} Upcoming`,
      html: html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully",
        stats: {
          overdue: overdueList.length,
          upcoming: upcomingList.length,
          overdueTotal,
          upcomingTotal
        }
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-invoice-alert function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
