import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { requireAuth } from '@/lib/auth-server';

export const metadata: Metadata = {
  title: 'Console - Mailora',
  description: 'Mailora console for managing your AI email assistant',
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Protect all dashboard routes with current URL as redirect
  await requireAuth();
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <div className="min-h-screen bg-background w-full">{children}</div>
    </SidebarProvider>
  );
}
