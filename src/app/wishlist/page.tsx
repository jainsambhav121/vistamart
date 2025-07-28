import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="flex justify-center mb-4">
        <Heart className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-4xl font-headline mb-4">Your Wishlist</h1>
      <p className="text-muted-foreground mb-8">
        Your wishlist is empty. Start adding products you love!
      </p>
      <Button asChild>
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
}
