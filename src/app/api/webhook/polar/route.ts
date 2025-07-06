import { Webhooks } from '@polar-sh/nextjs';

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onSubscriptionActive: async (payload) => {
    // Handle subscription activation
    console.log('Subscription activated:', payload);
    // You can add your custom logic here, like updating the database or sending a notification
  },
  onSubscriptionRevoked: async (payload) => {
    // Handle subscription revocation
    console.log('Subscription revoked:', payload);
    // You can add your custom logic here, like updating the database or sending a notification
  },
});
