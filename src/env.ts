import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    APP_NAME: z.string().default('Mailora'),
    APP_URL: z.string().url().default('https://mailora.app'),
    APP_DOMAIN: z.string().default('mailora.app'),
    PORT: z.coerce.number().default(3000),
    AUTH_SECRET: z.string(),
    AUTH_URL: z.string().url().default('http://localhost:3000'),
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    MICROSOFT_CLIENT_ID: z.string(),
    MICROSOFT_CLIENT_SECRET: z.string(),
  },
  client: {},
  runtimeEnv: {
    APP_NAME: process.env.APP_NAME,
    APP_DOMAIN: process.env.APP_DOMAIN,
    NODE_ENV: process.env.NODE_ENV,
    APP_URL: process.env.APP_URL,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    MICROSOFT_CLIENT_ID: process.env.MICROSOFT_CLIENT_ID,
    MICROSOFT_CLIENT_SECRET: process.env.MICROSOFT_CLIENT_SECRET,
  },
});
