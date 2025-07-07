import { Polar } from '@polar-sh/sdk';

import { env } from '@/env';

export const polarApi = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN!,
  server: 'sandbox', // Use this option if you're using the sandbox environment - else use 'production' or omit the parameter
});
