import { FileText, LayoutDashboard, Plus, LogOut, Settings, CalendarDays } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Invoices', url: '/invoices', icon: FileText },
  { title: 'Create Invoice', url: '/create-invoice', icon: Plus },
  { title: 'Calendar', url: '/calendar', icon: CalendarDays },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { signOut } = useAuth();
  const currentPath = location.pathname;
  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-card/50 backdrop-blur-sm">
      <SidebarHeader className={cn("py-4", isCollapsed ? 'items-center' : 'px-4')}>
        {!isCollapsed ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-sm">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">InvoiceTracker</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-sm">
            <FileText className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className={cn("gap-1", !isCollapsed && "px-2")}>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url} end>
                    {({ isActive: active }) => (
                      <SidebarMenuButton
                        isActive={active}
                        tooltip={isCollapsed ? item.title : undefined}
                        className={cn(
                          "rounded-lg transition-all",
                          active && "bg-primary text-primary-foreground shadow-sm font-medium"
                        )}
                      >
                        <item.icon />
                        {!isCollapsed && <span>{item.title}</span>}
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout} 
              tooltip={isCollapsed ? 'Logout' : undefined}
              className="hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut />
              {!isCollapsed && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
