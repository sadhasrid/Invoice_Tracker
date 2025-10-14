-- =====================================================
-- SUPABASE DATABASE SETUP FOR MANAGEMENT DASHBOARD
-- =====================================================
-- Run this entire script in your Supabase SQL Editor
-- This will create all necessary tables and sample data

-- =====================================================
-- 1. CREATE INVOICES TABLE (if not exists)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name TEXT NOT NULL,
    invoice_number TEXT UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    gst_percent DECIMAL(5,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'unpaid', 'paid', 'overdue')),
    due_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    pan_url TEXT,
    aadhaar_url TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- =====================================================
-- 2. CREATE SUPPLIERS TABLE (if not exists)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.suppliers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    contact_person TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- =====================================================
-- 3. CREATE ALERTS TABLE (if not exists)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'warning', 'error', 'success')),
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- =====================================================
-- 4. CREATE SUPPLIER METRICS TABLE (if not exists)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.supplier_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    supplier_id UUID REFERENCES public.suppliers(id) ON DELETE CASCADE,
    month_year TEXT NOT NULL, -- Format: "2024-01"
    total_invoices INTEGER DEFAULT 0,
    total_amount DECIMAL(10,2) DEFAULT 0,
    on_time_delivery DECIMAL(5,2) DEFAULT 0, -- Percentage
    quality_rating DECIMAL(3,2) DEFAULT 0, -- 1-5 scale
    payment_terms_compliance DECIMAL(5,2) DEFAULT 0, -- Percentage
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    UNIQUE(supplier_id, month_year)
);

-- =====================================================
-- 5. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplier_metrics ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 6. CREATE RLS POLICIES
-- =====================================================

-- Invoices policies
DROP POLICY IF EXISTS "Users can view their own invoices" ON public.invoices;
CREATE POLICY "Users can view their own invoices" ON public.invoices
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own invoices" ON public.invoices;
CREATE POLICY "Users can insert their own invoices" ON public.invoices
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own invoices" ON public.invoices;
CREATE POLICY "Users can update their own invoices" ON public.invoices
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own invoices" ON public.invoices;
CREATE POLICY "Users can delete their own invoices" ON public.invoices
    FOR DELETE USING (auth.uid() = user_id);

-- Suppliers policies
DROP POLICY IF EXISTS "Users can view their own suppliers" ON public.suppliers;
CREATE POLICY "Users can view their own suppliers" ON public.suppliers
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own suppliers" ON public.suppliers;
CREATE POLICY "Users can insert their own suppliers" ON public.suppliers
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own suppliers" ON public.suppliers;
CREATE POLICY "Users can update their own suppliers" ON public.suppliers
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own suppliers" ON public.suppliers;
CREATE POLICY "Users can delete their own suppliers" ON public.suppliers
    FOR DELETE USING (auth.uid() = user_id);

-- Alerts policies
DROP POLICY IF EXISTS "Users can view their own alerts" ON public.alerts;
CREATE POLICY "Users can view their own alerts" ON public.alerts
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own alerts" ON public.alerts;
CREATE POLICY "Users can insert their own alerts" ON public.alerts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own alerts" ON public.alerts;
CREATE POLICY "Users can update their own alerts" ON public.alerts
    FOR UPDATE USING (auth.uid() = user_id);

-- Supplier metrics policies
DROP POLICY IF EXISTS "Users can view their own supplier metrics" ON public.supplier_metrics;
CREATE POLICY "Users can view their own supplier metrics" ON public.supplier_metrics
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own supplier metrics" ON public.supplier_metrics;
CREATE POLICY "Users can insert their own supplier metrics" ON public.supplier_metrics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own supplier metrics" ON public.supplier_metrics;
CREATE POLICY "Users can update their own supplier metrics" ON public.supplier_metrics
    FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- 7. CREATE STORAGE BUCKET FOR KYC DOCUMENTS
-- =====================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('kyc-documents', 'kyc-documents', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 8. CREATE STORAGE POLICIES
-- =====================================================
DROP POLICY IF EXISTS "Authenticated can upload KYC" ON storage.objects;
CREATE POLICY "Authenticated can upload KYC" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'kyc-documents' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated can view KYC" ON storage.objects;
CREATE POLICY "Authenticated can view KYC" ON storage.objects
    FOR SELECT USING (bucket_id = 'kyc-documents' AND auth.role() = 'authenticated');

-- =====================================================
-- 9. CREATE SAMPLE DATA
-- =====================================================
-- Note: Replace 'YOUR_USER_ID' with an actual user ID from auth.users
-- You can get this by running: SELECT id FROM auth.users LIMIT 1;

-- Sample suppliers
INSERT INTO public.suppliers (name, contact_person, email, phone, address, user_id)
VALUES 
    ('Tech Solutions Ltd', 'John Smith', 'john@techsolutions.com', '+91-9876543210', '123 Tech Park, Bangalore', (SELECT id FROM auth.users LIMIT 1)),
    ('Digital Innovations', 'Sarah Johnson', 'sarah@digitalinnovations.com', '+91-9876543211', '456 Innovation Hub, Mumbai', (SELECT id FROM auth.users LIMIT 1)),
    ('Cloud Services Inc', 'Mike Wilson', 'mike@cloudservices.com', '+91-9876543212', '789 Cloud Street, Delhi', (SELECT id FROM auth.users LIMIT 1)),
    ('Data Analytics Co', 'Lisa Brown', 'lisa@dataanalytics.com', '+91-9876543213', '321 Data Center, Chennai', (SELECT id FROM auth.users LIMIT 1)),
    ('AI Solutions Pvt Ltd', 'David Lee', 'david@aisolutions.com', '+91-9876543214', '654 AI Plaza, Hyderabad', (SELECT id FROM auth.users LIMIT 1))
ON CONFLICT (name) DO NOTHING;

-- Sample invoices with varied data for charts
INSERT INTO public.invoices (client_name, invoice_number, amount, gst_percent, tax_amount, total_amount, status, due_date, created_at, user_id)
VALUES 
    -- Paid invoices (for revenue charts)
    ('Tech Solutions Ltd', 'INV-2024-001', 50000.00, 18.00, 9000.00, 59000.00, 'paid', '2024-09-15', '2024-09-01', (SELECT id FROM auth.users LIMIT 1)),
    ('Digital Innovations', 'INV-2024-002', 75000.00, 18.00, 13500.00, 88500.00, 'paid', '2024-09-20', '2024-09-05', (SELECT id FROM auth.users LIMIT 1)),
    ('Cloud Services Inc', 'INV-2024-003', 30000.00, 12.00, 3600.00, 33600.00, 'paid', '2024-09-25', '2024-09-10', (SELECT id FROM auth.users LIMIT 1)),
    ('Data Analytics Co', 'INV-2024-004', 60000.00, 18.00, 10800.00, 70800.00, 'paid', '2024-10-01', '2024-09-15', (SELECT id FROM auth.users LIMIT 1)),
    ('AI Solutions Pvt Ltd', 'INV-2024-005', 45000.00, 18.00, 8100.00, 53100.00, 'paid', '2024-10-05', '2024-09-20', (SELECT id FROM auth.users LIMIT 1)),
    
    -- Pending invoices
    ('Tech Solutions Ltd', 'INV-2024-006', 25000.00, 18.00, 4500.00, 29500.00, 'pending', '2024-10-15', '2024-09-25', (SELECT id FROM auth.users LIMIT 1)),
    ('Digital Innovations', 'INV-2024-007', 40000.00, 12.00, 4800.00, 44800.00, 'unpaid', '2024-10-20', '2024-09-30', (SELECT id FROM auth.users LIMIT 1)),
    
    -- Overdue invoices
    ('Cloud Services Inc', 'INV-2024-008', 35000.00, 18.00, 6300.00, 41300.00, 'overdue', '2024-09-10', '2024-08-25', (SELECT id FROM auth.users LIMIT 1)),
    
    -- Long dues (more than 2 weeks overdue)
    ('Data Analytics Co', 'INV-2024-009', 55000.00, 18.00, 9900.00, 64900.00, 'overdue', '2024-08-20', '2024-08-05', (SELECT id FROM auth.users LIMIT 1)),
    
    -- Recent invoices for trend chart
    ('AI Solutions Pvt Ltd', 'INV-2024-010', 20000.00, 18.00, 3600.00, 23600.00, 'paid', '2024-10-12', '2024-10-01', (SELECT id FROM auth.users LIMIT 1)),
    ('Tech Solutions Ltd', 'INV-2024-011', 15000.00, 12.00, 1800.00, 16800.00, 'paid', '2024-10-14', '2024-10-02', (SELECT id FROM auth.users LIMIT 1)),
    ('Digital Innovations', 'INV-2024-012', 30000.00, 18.00, 5400.00, 35400.00, 'paid', '2024-10-13', '2024-10-03', (SELECT id FROM auth.users LIMIT 1))
ON CONFLICT (invoice_number) DO NOTHING;

-- Sample alerts
INSERT INTO public.alerts (title, message, type, user_id)
VALUES 
    ('Invoice Overdue', 'Invoice INV-2024-008 is overdue by 25 days', 'warning', (SELECT id FROM auth.users LIMIT 1)),
    ('Long Due Alert', 'Invoice INV-2024-009 has been overdue for more than 2 weeks', 'error', (SELECT id FROM auth.users LIMIT 1)),
    ('Payment Received', 'Payment received for Invoice INV-2024-001', 'success', (SELECT id FROM auth.users LIMIT 1)),
    ('New Invoice Created', 'Invoice INV-2024-012 has been created and sent to client', 'info', (SELECT id FROM auth.users LIMIT 1))
ON CONFLICT DO NOTHING;

-- Sample supplier metrics
INSERT INTO public.supplier_metrics (supplier_id, month_year, total_invoices, total_amount, on_time_delivery, quality_rating, payment_terms_compliance, user_id)
VALUES 
    ((SELECT id FROM public.suppliers WHERE name = 'Tech Solutions Ltd' LIMIT 1), '2024-09', 2, 84000.00, 95.5, 4.2, 90.0, (SELECT id FROM auth.users LIMIT 1)),
    ((SELECT id FROM public.suppliers WHERE name = 'Digital Innovations' LIMIT 1), '2024-09', 1, 88500.00, 88.0, 4.5, 85.0, (SELECT id FROM auth.users LIMIT 1)),
    ((SELECT id FROM public.suppliers WHERE name = 'Cloud Services Inc' LIMIT 1), '2024-09', 1, 33600.00, 92.0, 4.0, 95.0, (SELECT id FROM auth.users LIMIT 1)),
    ((SELECT id FROM public.suppliers WHERE name = 'Data Analytics Co' LIMIT 1), '2024-09', 1, 70800.00, 90.0, 4.3, 88.0, (SELECT id FROM auth.users LIMIT 1)),
    ((SELECT id FROM public.suppliers WHERE name = 'AI Solutions Pvt Ltd' LIMIT 1), '2024-09', 1, 53100.00, 85.0, 4.1, 92.0, (SELECT id FROM auth.users LIMIT 1))
ON CONFLICT (supplier_id, month_year) DO NOTHING;

-- =====================================================
-- 10. CREATE FUNCTIONS FOR DASHBOARD METRICS
-- =====================================================

-- Function to get dashboard metrics
CREATE OR REPLACE FUNCTION get_dashboard_metrics(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_revenue', COALESCE(SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END), 0),
        'total_tax', COALESCE(SUM(CASE WHEN status = 'paid' THEN tax_amount ELSE 0 END), 0),
        'pending_count', COUNT(CASE WHEN status IN ('pending', 'unpaid') THEN 1 END),
        'overdue_count', COUNT(CASE WHEN status = 'overdue' THEN 1 END),
        'paid_count', COUNT(CASE WHEN status = 'paid' THEN 1 END),
        'total_invoices', COUNT(*),
        'long_dues_count', COUNT(CASE WHEN status != 'paid' AND due_date < CURRENT_DATE - INTERVAL '14 days' THEN 1 END)
    ) INTO result
    FROM public.invoices
    WHERE user_id = user_uuid;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get revenue trend data
CREATE OR REPLACE FUNCTION get_revenue_trend(user_uuid UUID, days_back INTEGER DEFAULT 30)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    WITH daily_revenue AS (
        SELECT 
            DATE(created_at) as date,
            SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END) as revenue
        FROM public.invoices
        WHERE user_id = user_uuid 
        AND created_at >= CURRENT_DATE - INTERVAL '1 day' * days_back
        GROUP BY DATE(created_at)
        ORDER BY date
    )
    SELECT json_agg(
        json_build_object(
            'date', date,
            'revenue', revenue
        )
    ) INTO result
    FROM daily_revenue;
    
    RETURN COALESCE(result, '[]'::json);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 11. CREATE TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS update_invoices_updated_at ON public.invoices;
CREATE TRIGGER update_invoices_updated_at
    BEFORE UPDATE ON public.invoices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_suppliers_updated_at ON public.suppliers;
CREATE TRIGGER update_suppliers_updated_at
    BEFORE UPDATE ON public.suppliers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_supplier_metrics_updated_at ON public.supplier_metrics;
CREATE TRIGGER update_supplier_metrics_updated_at
    BEFORE UPDATE ON public.supplier_metrics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 12. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Indexes for invoices table
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON public.invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON public.invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON public.invoices(created_at);

-- Indexes for suppliers table
CREATE INDEX IF NOT EXISTS idx_suppliers_user_id ON public.suppliers(user_id);

-- Indexes for alerts table
CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON public.alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_is_resolved ON public.alerts(is_resolved);

-- Indexes for supplier_metrics table
CREATE INDEX IF NOT EXISTS idx_supplier_metrics_user_id ON public.supplier_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_supplier_metrics_supplier_id ON public.supplier_metrics(supplier_id);

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================
DO $$
BEGIN
    RAISE NOTICE '=====================================================';
    RAISE NOTICE 'SUPABASE SETUP COMPLETED SUCCESSFULLY!';
    RAISE NOTICE '=====================================================';
    RAISE NOTICE 'Tables created: invoices, suppliers, alerts, supplier_metrics';
    RAISE NOTICE 'Storage bucket created: kyc-documents';
    RAISE NOTICE 'RLS policies enabled for all tables';
    RAISE NOTICE 'Sample data inserted for testing';
    RAISE NOTICE 'Functions created for dashboard metrics';
    RAISE NOTICE 'Indexes created for performance optimization';
    RAISE NOTICE '=====================================================';
    RAISE NOTICE 'Your Management Dashboard should now display real data!';
    RAISE NOTICE '=====================================================';
END $$;
