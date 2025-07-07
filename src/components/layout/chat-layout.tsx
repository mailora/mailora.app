'use client';

import { cn } from '@/lib/utils';

import { AppHeader } from './app-header';

interface ChatLayoutProps {
  children: React.ReactNode;
  header?: {
    showBackButton?: boolean;
    backHref?: string;
    title?: string;
    badge?: {
      text: string;
      variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    };
    userEmail?: string;
  };
  className?: string;
}

export function ChatLayout({ children, header, className }: ChatLayoutProps) {
  return (
    <div className={cn('flex flex-col h-screen bg-background', className)}>
      <AppHeader {...header} />
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
