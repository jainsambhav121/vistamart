
'use client';

import { usePathname } from 'next/navigation';
import OnboardingGuard from '@/components/onboarding-guard';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const AUTH_ROUTES = ['/login', '/register', '/user-welcome'];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  return (
    <OnboardingGuard>
      <div className="relative flex min-h-screen flex-col">
        {!isAuthRoute && <Header />}
        <main className="flex-1">{children}</main>
        {!isAuthRoute && <Footer />}
      </div>
    </OnboardingGuard>
  );
}
