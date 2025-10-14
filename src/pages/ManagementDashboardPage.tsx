import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ManagementDashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Management Dashboard</h1>
          <p className="text-muted-foreground">High-level overview for leadership and planning.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Team Productivity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Revenue Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Risk & Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagementDashboardPage;


