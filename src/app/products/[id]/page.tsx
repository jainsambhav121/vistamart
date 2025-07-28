'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { BuyNowButton } from '@/components/buy-now-button';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">({rating.toFixed(1)})</span>
    </div>
  );
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product: Product | undefined = products.find(p => p.id === params.id);
  
  if (!product) {
    notFound();
  }

  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <div className="aspect-square w-full overflow-hidden rounded-lg mb-4 border">
            <Image
              src={(mainImage as any).src || mainImage}
              alt={product.name}
              width={800}
              height={800}
              className="object-cover w-full h-full"
              data-ai-hint={(mainImage as any).hint}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                className={`aspect-square overflow-hidden rounded-md border-2 ${
                  ((img as any).src || img) === ((mainImage as any).src || mainImage) ? 'border-primary' : 'border-transparent'
                }`}
              >
                <Image
                  src={(img as any).src || img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                   data-ai-hint={(img as any).hint}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2">{product.name}</h1>
          <div className="mb-4">
            <StarRating rating={product.rating} />
          </div>
          <p className="text-3xl font-semibold text-primary mb-6">${product.price.toFixed(2)}</p>
          <p className="text-foreground/80 mb-8">{product.description}</p>
          <div className="max-w-sm space-y-2">
            <BuyNowButton product={product} />
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold font-headline mb-6">Customer Reviews</h2>
        <Card>
          <CardContent className="pt-6 space-y-6">
            {product.reviews.length > 0 ? (
              product.reviews.map(review => (
                <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{review.author}</h3>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No reviews yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
