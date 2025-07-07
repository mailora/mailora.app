'use client';

import { Mail } from 'lucide-react';
import Link from 'next/link';

import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { UserNav } from '@/components/user-nav';
import AppConfig from '@/lib/app-config';
import { cn } from '@/lib/utils';

import { SidebarTrigger } from '../ui/sidebar';

interface AppHeaderProps {
  showBackButton?: boolean;
  backHref?: string;
  title?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  userEmail?: string;
  className?: string;
}

export function AppHeader({ title = AppConfig.name, badge, userEmail, className }: AppHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b',
        className
      )}
    >
      <div className=" mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <Link className="flex items-center space-x-2" href="/">
            <Mail className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">{title}</span>
          </Link>
          {badge && (
            <Badge variant={badge.variant || 'secondary'} className="text-xs">
              {badge.text}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {userEmail && (
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              {userEmail}
            </span>
          )}
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
