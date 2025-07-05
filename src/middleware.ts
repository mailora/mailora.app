import { NextRequest, NextResponse } from 'next/server';
import { getSubdomain } from './lib/utils';

// Configuration for system subdomains
const SYSTEM_SUBDOMAINS = {
  console: '/console',
  // Add more system subdomains here in the future
  // auth: '/auth',
  // admin: '/admin',
} as const;

const PUBLIC_FILE = /\.(.*)$/;
const PUBLIC_PATHS = ['/_next', '/api', '/static', '/images', '/public'];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  const hostname = request.headers.get('host') || '';
  const systemRoutes = Object.values(SYSTEM_SUBDOMAINS);

  // Skip middleware for public files and paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path)) || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  // Extract subdomain from the hostname
  const subdomain = getSubdomain(hostname);
  // Default domain (no subdomain or www) - serve from root
  if (!subdomain) {
    // Block direct access to system subdomain routes
    if (systemRoutes.some((route) => pathname.startsWith(route))) {
      url.pathname = '/404';
      return NextResponse.rewrite(url);
    }

    // Block access to dynamic subdomain routes
    if (pathname.startsWith('/dynamic')) {
      url.pathname = '/404';
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  }

  // Handle system subdomains
  if (subdomain in SYSTEM_SUBDOMAINS) {
    const routePrefix = SYSTEM_SUBDOMAINS[subdomain as keyof typeof SYSTEM_SUBDOMAINS];

    // Block access to other system subdomain folders
    const otherSystemRoutes = systemRoutes.filter((route) => route !== routePrefix);
    if (otherSystemRoutes.some((route) => pathname.startsWith(route))) {
      url.pathname = '/404';
      return NextResponse.rewrite(url);
    }

    // Block access to dynamic subdomain routes
    if (pathname.startsWith('/dynamic')) {
      url.pathname = '/404';
      return NextResponse.rewrite(url);
    }

    // Only rewrite if not already on the correct path
    if (!pathname.startsWith(routePrefix)) {
      url.pathname = `${routePrefix}${pathname === '/' ? '' : pathname}`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  }

  // Handle all other subdomains as dynamic subdomains
  // Block access to system subdomain routes from dynamic subdomains
  if (systemRoutes.some((route) => pathname.startsWith(route))) {
    url.pathname = '/404';
    return NextResponse.rewrite(url);
  }

  url.pathname = `/dynamic/${subdomain}${pathname}`;
  return NextResponse.rewrite(url);
}

// Configure matcher to run middleware on all routes except for API routes and static files
export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
};
