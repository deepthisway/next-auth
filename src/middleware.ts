import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // define all the paths that are public 
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'
    
    const token = request.cookies.get("token")?.value || '';
    // if it is one of the public paths and token is available, it means public paths is being accessed as Login even after logginin
    // so we redirect it to '/profile' 
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }
    // if it is not a public path and token is not available, it means user is trying
    // to access a private path without logging in, so we redirect it to '/login'
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // array below should contain all the paths you want your middleware to work on
    
    export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/verifyemail',
    '/profile'
  ]
}