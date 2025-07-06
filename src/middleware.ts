import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host') || '';

  const isConsoleSubdomain = hostname.startsWith('console.');

  if (isConsoleSubdomain) {
    // If it's already prefixed with /console, don't double prefix
    if (!url.pathname.startsWith('/console')) {
      url.pathname = `/console${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

// Configure matcher to run middleware on all routes except for API routes and static files
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
