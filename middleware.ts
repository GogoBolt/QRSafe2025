import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // For demo purposes, we'll skip actual authentication checks
  // You would normally verify a JWT token here
  
  // Public paths that don't require authentication
  const publicPaths = ['/', '/auth/login', '/auth/register'];
  
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // For demo, we'll allow all dashboard access
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  // Redirect to login for any other protected routes
  return NextResponse.redirect(new URL('/auth/login', request.url));
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
};