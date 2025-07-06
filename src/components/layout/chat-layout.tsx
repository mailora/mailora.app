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
    <div className={cn('min-h-screen bg-background flex flex-col', className)}>
      <AppHeader {...header} />
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">{children}</div>
    </div>
  );
}
