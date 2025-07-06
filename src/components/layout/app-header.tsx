'use client';

import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserNav } from '@/components/user-nav';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import AppConfig from '@/lib/app-config';

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

export function AppHeader({
  showBackButton = false,
  backHref = '/',
  title = AppConfig.name,
  badge,
  userEmail,
  className,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        'border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <div className="container mx-auto px-6 py-4 max-w-4xl flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <Link
              href={backHref}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          )}
          <div className="flex items-center space-x-2">
            <Mail className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">{title}</span>
          </div>
          {badge && (
            <Badge variant={badge.variant || 'secondary'} className="text-xs">
              {badge.text}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-4">
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
