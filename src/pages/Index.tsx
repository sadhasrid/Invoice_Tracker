import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, TrendingUp, Bell, Shield, Zap, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              InvoiceTracker
            </h1>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost" className="font-medium">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-primary shadow-md hover:shadow-lg transition-all">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-sm">
            <Zap className="w-4 h-4" />
            Professional Invoice Management
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Manage Your Invoices with{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Confidence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Streamline your invoice tracking, get real-time alerts, and stay on top of payments with our professional management platform.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-primary shadow-lg hover:shadow-xl transition-all text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 border-2">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-primary">Succeed</span>
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features designed to help you manage invoices efficiently and professionally
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FileText className="w-8 h-8 text-primary" />}
            title="Invoice Management"
            description="Create, track, and manage all your invoices in one centralized dashboard with ease."
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8 text-accent" />}
            title="Real-time Analytics"
            description="Get insights into your revenue, pending payments, and financial trends at a glance."
          />
          <FeatureCard
            icon={<Bell className="w-8 h-8 text-primary" />}
            title="Smart Alerts"
            description="Never miss a payment deadline with automated email alerts and notifications."
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-primary" />}
            title="Secure & Reliable"
            description="Bank-level security with automated backups to keep your data safe and accessible."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-primary" />}
            title="Lightning Fast"
            description="Built for speed and efficiency, so you can focus on what matters most."
          />
          <FeatureCard
            icon={<CheckCircle className="w-8 h-8 text-accent" />}
            title="Easy to Use"
            description="Intuitive interface designed for professionals who value simplicity and power."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-hero rounded-2xl p-12 md:p-16 text-center shadow-xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Invoice Management?
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust InvoiceTracker for their business operations.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 shadow-lg hover:shadow-xl transition-all">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p className="text-sm">
            © 2024 InvoiceTracker. All rights reserved. Built with precision and care.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="bg-card rounded-xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all group">
      <div className="mb-4 bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
        {icon}
      </div>
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default Index;
