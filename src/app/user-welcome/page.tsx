
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PartyPopper } from 'lucide-react';

export default function UserWelcomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Mark that the user has seen this page for the current session
    sessionStorage.setItem('hasSeenWelcome', 'true');
  }, []);
  
  const handleContinue = () => {
      router.replace('/');
  }

  return (
    <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-screen">
      <Card className="max-w-md mx-auto text-center animate-in fade-in zoom-in-95 duration-500">
        <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center animate-in fade-in zoom-in-50 delay-200 duration-500">
                <PartyPopper className="h-10 w-10 text-primary" />
            </div>
          <CardTitle className="text-3xl font-headline mt-4">Welcome, {user?.displayName?.split(' ')[0] || 'friend'}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            We're so glad to have you here. Get ready to discover amazing handcrafted goods.
          </p>
          <Button onClick={handleContinue} size="lg">
            Start Shopping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
