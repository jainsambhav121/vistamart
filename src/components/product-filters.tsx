'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { categories } from '@/lib/data';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Star } from 'lucide-react';

interface ProductFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (categoryId: string) => void;
  priceRange: [number, number];
  onPriceChange: (value: [number, number]) => void;
  maxPrice: number;
  materials: string[];
  selectedMaterials: string[];
  onMaterialChange: (material: string) => void;
  colors: string[];
  selectedColors: string[];
  onColorChange: (color: string) => void;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
  onClearFilters: () => void;
}

const StarRatingDisplay = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
        ))}
    </div>
);

export function ProductFilters({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  maxPrice,
  materials,
  selectedMaterials,
  onMaterialChange,
  colors,
  selectedColors,
  onColorChange,
  selectedRating,
  onRatingChange,
  onClearFilters,
}: ProductFiltersProps) {
  return (
    <Card className="rounded-none">
      <CardHeader className='flex-row items-center justify-between'>
        <CardTitle className="font-headline">Filters</CardTitle>
        <Button variant="link" onClick={onClearFilters} className="p-0 h-auto">Clear All</Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => onCategoryChange(category.id)}
                />
                <Label htmlFor={`cat-${category.id}`} className="cursor-pointer">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Price Range</h3>
          <Slider
            min={0}
            max={maxPrice}
            step={10}
            value={priceRange}
            onValueChange={onPriceChange}
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Rating</h3>
          <RadioGroup value={String(selectedRating)} onValueChange={(value) => onRatingChange(Number(value))}>
            {[4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center space-x-2">
                <RadioGroupItem value={String(rating)} id={`rating-${rating}`} />
                <Label htmlFor={`rating-${rating}`} className="flex items-center gap-2 cursor-pointer">
                  <StarRatingDisplay rating={rating} />
                  <span>& Up</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Material</h3>
          <div className="space-y-2">
            {materials.map((material) => (
              <div key={material} className="flex items-center space-x-2">
                <Checkbox
                  id={`mat-${material}`}
                  checked={selectedMaterials.includes(material)}
                  onCheckedChange={() => onMaterialChange(material)}
                />
                <Label htmlFor={`mat-${material}`} className="cursor-pointer">
                  {material}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Color</h3>
          <div className="space-y-2">
            {colors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={selectedColors.includes(color)}
                  onCheckedChange={() => onColorChange(color)}
                />
                <Label htmlFor={`color-${color}`} className="cursor-pointer">
                  {color}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
