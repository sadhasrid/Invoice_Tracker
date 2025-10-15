import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { ProfileNotifications } from './ProfileNotifications';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border/50 bg-card/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
            <SidebarTrigger />
            <ProfileNotifications />
          </header>
          <main className="flex-1 p-6 md:p-8 bg-gradient-to-br from-background via-background to-secondary/10">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
