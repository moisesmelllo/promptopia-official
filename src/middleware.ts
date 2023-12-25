import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const privatePath = path === '/profile'

  const token = request.cookies.get('next-auth.session-token')?.value || ''
  
  if (privatePath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher:[
    '/',
    '/profile',
  ]
}