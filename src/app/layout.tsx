// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import { AuthProvider } from "@/components/providers/session-provider";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Tools Job",
  description: "Professional tools for your job needs",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tools Job",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/only-logo.png",
    apple: "/only-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased"
      >
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Analytics />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(function(registration) {
                      console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    }, function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    });
                  });
                }
              `,
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
