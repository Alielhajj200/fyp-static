import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { parse } from 'cookie';

const TOKEN_KEY = 'abcd123';

// `withAuth` augments your `Request` with the user's token.
export async function middleware(request: any) {
  // Parse cookies from request headers
  const cookies = parse(request.headers.cookie || '');
  
  console.log('Cookies:', cookies); // Log all cookies for debugging
  
  const token = cookies[TOKEN_KEY];
  
  console.log('Token:', token); // Log the token for debugging
  
  if (token) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = { matcher: [] };
