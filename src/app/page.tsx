
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { products, categories } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { ProductFilters } from '@/components/product-filters';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const maxPrice = useMemo(() => Math.ceil(Math.max(...products.map(p => p.price)) / 10) * 10, []);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortOption, setSortOption] = useState('rating-desc');

  const materials = useMemo(() => [...new Set(products.map(p => p.material).filter(Boolean))], []) as string[];
  const colors = useMemo(() => [...new Set(products.map(p => p.color).filter(Boolean))], []) as string[];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleMaterialChange = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };
  
  const handleColorChange = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, maxPrice]);
    setSelectedMaterials([]);
    setSelectedColors([]);
    setSelectedRating(0);
    setSearchTerm('');
  };
  
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesMaterial = selectedMaterials.length === 0 || (product.material && selectedMaterials.includes(product.material));
      const matchesColor = selectedColors.length === 0 || (product.color && selectedColors.includes(product.color));
      const matchesRating = selectedRating === 0 || product.rating >= selectedRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesMaterial && matchesColor && matchesRating;
    });

    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming products are already sorted by date in data, or we can add a date field
        // For now, we will reverse the order to simulate newest
        filtered.reverse();
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategories, priceRange, selectedMaterials, selectedColors, selectedRating, sortOption]);
  
  const featuredProducts = useMemo(() => products.slice(0, 4), []);
  const heroProducts = useMemo(() => products.slice(4, 7), []);
  const newArrivals = useMemo(() => products.slice(4, 8), []);

  return (
    <div className="animate-in fade-in duration-500">
      <section className="relative w-full bg-background">
          <Carousel
            opts={{ loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {heroProducts.map((product, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[500px] md:h-[600px]">
                    <Image
                      src={(product.images[0] as any).src}
                      alt={product.name}
                      fill
                      objectFit="cover"
                      className="brightness-50"
                      data-ai-hint={(product.images[0] as any).hint}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white p-4">
                      <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                          <h1 className="text-3xl md:text-6xl font-bold font-headline mb-4 tracking-tight">{product.name}</h1>
                          <p className="text-base md:text-xl text-white/80 max-w-lg mx-auto">
                              {product.description}
                          </p>
                          <Button size="lg" className="mt-8" asChild>
                              <Link href={`/products/${product.id}`}>
                                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                          </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex" />
          </Carousel>
      </section>
      
      <section id="categories" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center font-headline mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">Shop by Category</h2>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100"
          >
            <CarouselContent>
              {categories.map((category, index) => (
                <CarouselItem key={index} className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                   <Link href="#" key={category.id} className="flex flex-col items-center space-y-2 group p-1">
                        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                            <category.icon className="w-7 h-7 text-secondary-foreground" />
                        </div>
                        <h3 className="font-headline text-xs font-semibold text-foreground text-center">{category.name}</h3>
                    </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex"/>
          </Carousel>
        </div>
      </section>

      <section id="featured-products" className="py-12 md:py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center font-headline mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">Featured Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, i) => (
              <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms`}}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="new-arrivals" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center font-headline mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">New Arrivals</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product, i) => (
              <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms`}}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

       <section id="offer" className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center animate-in fade-in duration-500">
          <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">Summer Sale!</h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-6">Get up to <span className="text-yellow-300">30% OFF</span> on selected items. Don't miss out on these amazing deals!</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="#all-products">
                Browse Deals <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="testimonials" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center font-headline mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms`}}>
                      <CardContent className="pt-6">
                          <div className="flex items-center mb-2">
                              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                          </div>
                          <p className="text-muted-foreground mb-4">"Absolutely stunning mug. It feels great to hold and looks even better on my desk."</p>
                          <p className="font-semibold">- Emily R.</p>
                      </CardContent>
                  </Card>
                ))}
            </div>
        </div>
      </section>
      
      <section id="all-products" className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold font-headline animate-in fade-in slide-in-from-bottom-4 duration-500">Explore Our Collection</h2>
            <p className="text-muted-foreground mt-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">Find the perfect piece to complement your style.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 animate-in fade-in slide-in-from-left-4 duration-500">
             <ProductFilters 
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              maxPrice={maxPrice}
              materials={materials}
              selectedMaterials={selectedMaterials}
              onMaterialChange={handleMaterialChange}
              colors={colors}
              selectedColors={selectedColors}
              onColorChange={handleColorChange}
              selectedRating={selectedRating}
              onRatingChange={setSelectedRating}
              onClearFilters={clearFilters}
            />
          </aside>
          <main className="lg:col-span-3">
             <div className="flex justify-end mb-4 animate-in fade-in duration-500">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating-desc">Popularity</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 animate-in fade-in duration-500">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
                <div className="text-center py-20 animate-in fade-in duration-500">
                    <h2 className="text-2xl font-headline">No Products Found</h2>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters or clearing them.</p>
                </div>
            )}
          </main>
        </div>
      </section>
      
    </div>
  );
}
