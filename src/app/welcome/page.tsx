
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 animate-in fade-in duration-1000">
       <div className="relative w-full max-w-md h-64 md:h-80 mb-8 rounded-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <Image
                src="https://placehold.co/600x400.png"
                alt="Artisan Goods"
                fill
                objectFit="cover"
                data-ai-hint="pottery artisan"
                className="brightness-90"
            />
       </div>
      <div className="text-center max-w-md animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Welcome to Vista</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Discover unique, handcrafted goods from talented artisans around the world.
        </p>
        <Button asChild size="lg">
          <Link href="/onboarding">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
