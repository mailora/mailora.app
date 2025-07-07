import { cn } from '@/lib/utils';

import { AppHeader } from './app-header';

interface MainLayoutProps {
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
  containerClassName?: string;
  className?: string;
}

export function MainLayout({ children, header, containerClassName, className }: MainLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <AppHeader {...header} />
      <main className={cn('container mx-auto px-6 py-8 max-w-4xl', containerClassName)}>
        {children}
      </main>
    </div>
  );
}
