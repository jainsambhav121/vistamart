import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { AddToCartButton } from './add-to-cart-button';
import { BuyNowButton } from './buy-now-button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, price, images, id, description } = product;
  const mainImage = images[0] as unknown as { src: string; hint: string };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 group bg-card border rounded-none shadow-sm hover:shadow-xl">
       <div className="relative overflow-hidden">
        <Link href={`/products/${id}`} className="block">
            <Image
              src={mainImage.src}
              alt={name}
              width={600}
              height={600}
              className="object-cover w-full h-full aspect-square transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={mainImage.hint}
            />
        </Link>
      </div>
      <CardContent className="p-3 flex-grow flex flex-col">
        <Link href={`/products/${id}`} className="block flex-grow mb-2">
          <CardTitle className="text-sm font-medium font-headline leading-tight hover:text-primary transition-colors">{name}</CardTitle>
           <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
        </Link>
        <p className="text-base font-semibold text-primary mt-auto">${price.toFixed(2)}</p>
        <div className="mt-3 flex flex-col gap-2">
           <BuyNowButton product={product} />
           <AddToCartButton product={product} />
        </div>
      </CardContent>
    </Card>
  );
}
