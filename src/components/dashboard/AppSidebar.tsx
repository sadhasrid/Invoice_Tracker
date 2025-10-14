import { FileText, LayoutDashboard, Plus, LogOut, Settings, BarChart3, Bell, CalendarDays } from 'lucide-react';
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

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Invoices', url: '/invoices', icon: FileText },
  { title: 'Create Invoice', url: '/create-invoice', icon: Plus },
  { title: 'Management', url: '/management', icon: BarChart3 },
  { title: 'Supplier Matrix', url: '/suppliers', icon: BarChart3 },
  { title: 'Alerts & Overdue', url: '/alerts', icon: Bell },
  { title: 'Calendar', url: '/calendar', icon: CalendarDays },
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
    <Sidebar collapsible="icon">
      <SidebarHeader className={isCollapsed ? 'items-center' : ''}>
        {!isCollapsed && <div className="px-2 text-sm font-semibold tracking-wide">Navigation</div>}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url} end>
                    {({ isActive: active }) => (
                      <SidebarMenuButton
                        isActive={active}
                        tooltip={isCollapsed ? item.title : undefined}
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip={isCollapsed ? 'Logout' : undefined}>
              <LogOut />
              {!isCollapsed && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
