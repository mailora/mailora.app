import type { Metadata } from 'next';
import { requireAuth } from '@/lib/auth-server';

export const metadata: Metadata = {
  title: 'Console - Mailora',
  description: 'Mailora console for managing your AI email assistant',
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Protect all dashboard routes with current URL as redirect
  await requireAuth();

  return <div className="min-h-screen bg-background">{children}</div>;
}
