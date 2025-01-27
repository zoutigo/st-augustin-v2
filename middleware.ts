import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes';

export async function middleware(req: NextRequest) {
  let url;

  if (process.env.NODE_ENV === 'production') {
    const host = req.headers.get('x-forwarded-host') || req.nextUrl.host;
    const protocol = req.headers.get('x-forwarded-proto') || 'https';
    url = `${protocol}://${host}${req.nextUrl.pathname}${req.nextUrl.search}`;
  } else {
    url = req.nextUrl.href; // En développement, utilise l'URL telle quelle
  }
  console.log(`[Middleware] Incoming request: ${req.nextUrl.href}`);

  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    throw new Error('NEXTAUTH_SECRET environment variable is not defined');
  }

  const token = await getToken({ req, secret, salt: 'sfdsgdgdgdhhrg' });
  const isLoggedIn = !!token;

  const { nextUrl } = req;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow access to /api/files without authentication
  if (nextUrl.pathname.startsWith('/api/files')) {
    return NextResponse.next();
  }
  // Allow access to /api/files without authentication
  if (nextUrl.pathname.startsWith('/api/external-files')) {
    return NextResponse.next();
  }

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    }
    return NextResponse.next();
  }

  // if (!isLoggedIn && !isPublicRoute) {
  //   let callbackUrl = nextUrl.pathname;
  //   if (nextUrl.search) {
  //     callbackUrl += nextUrl.search;
  //   }

  //   const encodedCallbackUrl = encodeURIComponent(callbackUrl);
  //   return NextResponse.redirect(
  //     new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, req.url)
  //   );
  // }

  return NextResponse.next();
}

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
