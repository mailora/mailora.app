'use client';

import React from 'react';
import { MainLayout } from '@/components/layout';
import { useAuth } from '@/providers/auth-provider';

interface DashboardContentProps {
  children: React.ReactNode;
}

export function DashboardContent({ children }: DashboardContentProps) {
  const { user } = useAuth();

  return (
    <MainLayout
      header={{
        badge: { text: 'Community Plan' },
        userEmail: user?.email,
      }}
    >
      {children}
    </MainLayout>
  );
}
