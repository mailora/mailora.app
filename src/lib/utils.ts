import { env } from '@/env';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isProduction = () => process.env.NODE_ENV === 'production';

export function getSubdomain(hostname: string): string | null {
  // Handle localhost development
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    // For localhost without any dots, it's the root domain
    if (!hostname.includes('.')) {
      return null;
    }

    const subdomain = hostname.split('.')[0];
    if (subdomain === 'localhost' || subdomain.includes('127.0.0.1')) {
      return null; // No subdomain for root localhost
    }
    return subdomain;
  }

  // Handle production domains
  const appDomain = env.NEXT_PUBLIC_APP_DOMAIN;
  const parts = hostname.split('.');

  // Check if there's a subdomain
  if (hostname.endsWith(appDomain) && parts.length > 2) {
    return parts[0];
  }

  // Handle www as no subdomain
  if (parts.length === 2 && parts[0] === 'www') {
    return null;
  }

  return null;
}
