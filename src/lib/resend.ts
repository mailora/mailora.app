import { Resend } from 'resend';

import { env } from '@/env';

// Initialize Resend only if API key is available
export const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

export const EMAIL_CONFIG = {
  from: env.EMAIL_FROM || 'Mailora <noreply@mailora.com>',
  adminEmail: env.ADMIN_EMAIL || 'admin@mailora.com',
} as const;

export const isEmailConfigured = !!env.RESEND_API_KEY;
