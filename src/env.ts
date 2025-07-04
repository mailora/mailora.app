import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    APP_NAME: z.string().default('Letr'),
    APP_URL: z.string().url().default('https://letr.app'),
    APP_DOMAIN: z.string().default('letr.app'),
    PORT: z.coerce.number().default(3000),
  },
  client: {},
  runtimeEnv: {
    APP_NAME: process.env.APP_NAME,
    APP_DOMAIN: process.env.APP_DOMAIN,
    NODE_ENV: process.env.NODE_ENV,
    APP_URL: process.env.APP_URL,
    PORT: process.env.PORT,
  },
});
