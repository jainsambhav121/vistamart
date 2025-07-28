
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 3000); // 3-second delay

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h1 className="text-5xl font-bold font-headline mb-4">Vista</h1>
        <p className="text-lg text-muted-foreground mb-8">Timeless Craft, Modern Home.</p>
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
      </div>
    </div>
  );
}
