'use server';

import { calculateTax } from '@/ai/flows/tax-calculator';
import type { CartItem } from '@/lib/types';
import { z } from 'zod';

const taxSchema = z.object({
  location: z.string(),
  items: z.array(z.object({
    name: z.string(),
    price: z.number(),
    taxable: z.boolean(),
  })),
});

export async function calculateTaxesAction(location: string, items: CartItem[]) {
  const taxableProducts = items.map(item => ({
    name: item.name,
    price: item.price * item.quantity,
    taxable: true, // Assuming all products are taxable for this example
  }));

  const validation = taxSchema.safeParse({ location, items: taxableProducts });

  if (!validation.success) {
    return { error: 'Invalid input for tax calculation.' };
  }

  try {
    const result = await calculateTax({
      location,
      products: taxableProducts,
    });
    return { tax: result.tax };
  } catch (error) {
    console.error('Tax calculation failed:', error);
    return { error: 'Could not calculate taxes.' };
  }
}
