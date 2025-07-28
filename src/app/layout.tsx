import type {Metadata} from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { AuthProvider } from '@/context/auth-context';
import { CartProvider } from '@/context/cart-context';
import { OnboardingProvider } from '@/context/onboarding-context';
import { Toaster } from '@/components/ui/toaster';
import AppShell from '@/components/app-shell';


export const metadata: Metadata = {
  title: 'Vista - Artisan Goods',
  description: 'Discover unique, handcrafted goods from talented artisans.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased")}>
        <OnboardingProvider>
          <AuthProvider>
            <CartProvider>
              <AppShell>
                {children}
              </AppShell>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </OnboardingProvider>
      </body>
    </html>
  );
}
