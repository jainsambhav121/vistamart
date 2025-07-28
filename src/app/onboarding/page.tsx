
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/context/onboarding-context';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, Heart, Package } from 'lucide-react';

const onboardingSteps = [
  {
    icon: ShoppingCart,
    image: { src: 'https://placehold.co/600x400.png', hint: 'pottery' },
    title: 'Explore Unique Products',
    description: 'Browse through our curated collection of handcrafted goods from artisans worldwide.',
  },
  {
    icon: Heart,
    image: { src: 'https://placehold.co/600x400.png', hint: 'jewelry' },
    title: 'Save Your Favorites',
    description: 'Use the wishlist to save items you love and easily find them later.',
  },
  {
    icon: Package,
    image: { src: 'https://placehold.co/600x400.png', hint: 'packaging' },
    title: 'Track Your Orders',
    description: 'Stay updated on your purchase from checkout to delivery with real-time tracking.',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useOnboarding();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const handleFinish = () => {
    completeOnboarding();
    router.replace('/login');
  };

  const handleNext = () => {
    if (api) {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        handleFinish();
      }
    }
  };
  
  const handleSkip = () => {
    handleFinish();
  };

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background animate-in fade-in duration-500">
      <Button variant="link" onClick={handleSkip} className="absolute top-4 right-4 z-10">
        Skip
      </Button>
      <Carousel setApi={setApi} className="w-full max-w-md">
        <CarouselContent>
          {onboardingSteps.map((step, index) => (
            <CarouselItem key={index}>
              <div className="p-4 text-center">
                 <div className="relative w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                    <Image
                        src={step.image.src}
                        alt={step.title}
                        fill
                        objectFit="cover"
                        data-ai-hint={step.image.hint}
                    />
                 </div>
                <div key={current} className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                    <h2 className="text-2xl md:text-3xl font-bold font-headline mb-3">{step.title}</h2>
                    <p className="text-muted-foreground mx-auto max-w-xs">{step.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-4 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-500 delay-300">
         <div className="flex justify-center space-x-2 my-4">
          {onboardingSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-2 w-2 rounded-full transition-all ${current === i ? 'w-4 bg-primary' : 'bg-muted'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <Button onClick={handleNext} size="lg" className="w-full">
          {current === onboardingSteps.length - 1 ? 'Finish' : 'Next'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
