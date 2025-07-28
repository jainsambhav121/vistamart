import type { Product, Category } from './types';
import { GalleryVertical, Bed, SquareAsterisk, Circle, Rows, Settings } from 'lucide-react';

export const categories: Category[] = [
  { id: 'pillows', name: 'Pillows', icon: GalleryVertical },
  { id: 'cushions', name: 'Cushions', icon: SquareAsterisk },
  { id: 'mattresses', name: 'Mattresses', icon: Bed },
  { id: 'mattress-covers', name: 'Mattress Covers', icon: Rows },
  { id: 'bolsters', name: 'Bolsters', icon: Circle },
  { id: 'customizable', name: 'Customizable', icon: Settings },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Artisan Ceramic Mug',
    description: 'A beautifully handcrafted ceramic mug, perfect for your morning coffee. Each piece is unique, with a subtle glaze that catches the light. Microwave and dishwasher safe.',
    price: 28.00,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'cushions',
    rating: 4.8,
    reviews: [
      { id: 1, author: 'Emily R.', rating: 5, comment: 'Absolutely stunning mug. It feels great to hold and looks even better on my desk.', date: '2023-05-15' },
      { id: 2, author: 'John D.', rating: 4, comment: 'Great quality, but a bit smaller than I expected.', date: '2023-05-20' }
    ],
    stock: 15,
    material: 'Ceramic',
    color: 'White',
  },
  {
    id: 'p2',
    name: 'Woven Wall Hanging',
    description: 'Add a touch of bohemian elegance to your space with this hand-woven textile art. Made with natural fibers and a minimalist design, it brings warmth and texture to any room.',
    price: 75.00,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'pillows',
    rating: 5.0,
    reviews: [
      { id: 1, author: 'Sophia L.', rating: 5, comment: 'This is the centerpiece of my living room now. The craftsmanship is incredible.', date: '2023-06-01' }
    ],
    stock: 8,
    material: 'Cotton',
    color: 'Beige',
  },
  {
    id: 'p3',
    name: 'Abstract Botanical Print',
    description: 'A high-quality giclée print featuring an abstract design inspired by nature. The soft color palette complements any decor style, from modern to classic.',
    price: 45.00,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'mattresses',
    rating: 4.5,
    reviews: [
      { id: 1, author: 'Liam G.', rating: 5, comment: 'Beautiful print, the colors are so vibrant in person.', date: '2023-04-10' },
       { id: 2, author: 'Ava C.', rating: 4, comment: 'Paper quality is good, but shipping took a while.', date: '2023-04-12' }
    ],
    stock: 30,
    material: 'Paper',
    color: 'Green',
  },
  {
    id: 'p4',
    name: 'Silver Bar Necklace',
    description: 'A delicate and minimalist sterling silver necklace with a simple bar pendant. Perfect for everyday wear or for layering with other pieces.',
    price: 60.00,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'bolsters',
    rating: 4.9,
    reviews: [
      { id: 1, author: 'Olivia P.', rating: 5, comment: 'My new favorite necklace! It\'s so simple and elegant.', date: '2023-07-01' }
    ],
    stock: 22,
    material: 'Silver',
    color: 'Silver',
  },
  {
    id: 'p5',
    name: 'Hand-Poured Soy Candle',
    description: 'Scented soy candle in a reusable ceramic vessel. The "Rose & Sandalwood" scent is calming and sophisticated. 40+ hour burn time.',
    price: 32.00,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'cushions',
    rating: 4.7,
    reviews: [],
    stock: 40,
    material: 'Soy Wax',
    color: 'White',
  },
  {
    id: 'p6',
    name: 'Linen Throw Blanket',
    description: 'A lightweight and breathable linen throw blanket. Perfect for breezy summer nights or as a stylish accent on your sofa.',
    price: 120.00,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'mattress-covers',
    rating: 4.9,
    reviews: [
      { id: 1, author: 'Noah B.', rating: 5, comment: 'Incredibly soft and looks so luxurious.', date: '2023-06-18' }
    ],
    stock: 12,
    material: 'Linen',
    color: 'Gray',
  },
   {
    id: 'p7',
    name: 'Gold Hoop Earrings',
    description: 'Classic gold hoop earrings that are lightweight and perfect for any occasion. Made with 14k gold fill for lasting shine.',
    price: 55.00,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'customizable',
    rating: 4.8,
    reviews: [],
    stock: 50,
    material: 'Gold',
    color: 'Gold',
  },
  {
    id: 'p8',
    name: 'Minimalist Line Art Print',
    description: 'A striking and simple line art print that makes a statement. Printed on archival-quality matte paper for a premium finish.',
    price: 40.00,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'mattresses',
    rating: 4.6,
    reviews: [],
    stock: 25,
    material: 'Paper',
    color: 'Black',
  }
];

// Add AI hints to images
products.forEach(p => {
  p.images = p.images.map(img => {
    const hint = p.name.split(' ').slice(0, 2).join(' ').toLowerCase();
    const urlStr = typeof img === 'string' ? img : (img as any).src;
    const url = new URL(urlStr);
    // This is a placeholder for adding a data-ai-hint attribute in the component
    // We modify the object here to carry the hint.
    return { src: url.href, hint };
  }) as any;
});
