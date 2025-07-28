
'use client';

import { useCart } from '@/context/cart-context';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function AddToCartButton({ product }: { product: Product }) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <Button onClick={handleAddToCart} className="w-full" variant="outline" size="sm">
      <Plus className="mr-2 h-4 w-4" /> Add to Cart
    </Button>
  );
}
