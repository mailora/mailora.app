import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Console - Mailora',
  description: 'Mailora console for managing your AI email assistant',
};

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
