import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import ReactQueryProvider from './_react-query-provider';
import { ThemeProvider } from './_theme-provider';
import { AuthProvider } from './auth-provider';
interface RootProviderProps {
  children: React.ReactNode;
}

export default async function RootProvider({ children }: RootProviderProps) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <ReactQueryProvider>
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
