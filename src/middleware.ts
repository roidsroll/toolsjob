export { auth as middleware } from "@/auth"

export const config = {
  matcher: [
    "/accounting/:path*",
    "/business-marketing/:path*",
    "/network-engineer/:path*",
    // Add other protected routes here
  ],
}
