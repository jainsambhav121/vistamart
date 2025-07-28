
'use client';

import { useOnboarding } from '@/context/onboarding-context';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Loader2 } from 'lucide-react';

const AUTH_ROUTES = ['/login', '/register'];
// Add admin and user-welcome to public routes, but with special handling
const PUBLIC_ROUTES = [...AUTH_ROUTES, '/user-welcome', '/admin'];


export default function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { loading: onboardingLoading } = useOnboarding();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loading = onboardingLoading || authLoading;
    if (loading) {
      return;
    }

    const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');

    if (user && AUTH_ROUTES.includes(pathname)) {
      router.replace('/');
    } else if (user && pathname === '/user-welcome') {
       if (hasSeenWelcome) {
         router.replace('/');
       } else {
         setIsReady(true);
       }
    } else if (!user && !isPublicRoute) {
      router.replace('/login');
    }
     else {
      setIsReady(true);
    }
  }, [onboardingLoading, authLoading, user, pathname, router]);

  if (onboardingLoading || authLoading || !isReady) {
     return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Render children if the user is allowed to be here
  return <>{children}</>;
}
