
'use client';

import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function BuyNowButton({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const handleBuyNow = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
    });
    router.push('/checkout');
  };

  return (
    <Button onClick={handleBuyNow} className="w-full" size="sm">
      <ShoppingBag className="mr-2 h-4 w-4" /> Buy Now
    </Button>
  );
}
