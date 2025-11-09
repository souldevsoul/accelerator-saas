import { auth } from '@/auth'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard')
  const isOnAuth = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')

  // Redirect to login if accessing dashboard without auth
  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl))
  }

  // Redirect to dashboard if accessing auth pages while logged in
  if (isOnAuth && isLoggedIn) {
    return Response.redirect(new URL('/dashboard', req.nextUrl))
  }
})

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
