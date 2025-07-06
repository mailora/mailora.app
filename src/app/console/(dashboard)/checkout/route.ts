import { env } from '@/env';
import { Checkout } from '@polar-sh/nextjs';

export const GET = Checkout({
  accessToken: env.POLAR_ACCESS_TOKEN!,
  successUrl: 'http://console.mailora.me/confirmation?checkout_id={CHECKOUT_ID}',
  includeCheckoutId: true, // Include the checkout ID in the success URL
  theme: 'dark', // Use the default theme for the checkout page
  server: 'sandbox', // Use this option if you're using the sandbox environment - else use 'production' or omit the parameter
});
