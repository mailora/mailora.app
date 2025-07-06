'use client';

import React from 'react';
import { MainLayout } from '@/components/layout';

interface DashboardContentProps {
  children: React.ReactNode;
}

export function DashboardContent({ children }: DashboardContentProps) {
  return (
    <MainLayout
      header={{
        badge: { text: 'Community Plan' },
      }}
    >
      {children}
    </MainLayout>
  );
}
