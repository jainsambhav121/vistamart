// Tax Calculator
'use server';

/**
 * @fileOverview Calculates taxes for an order based on location and products.
 *
 * - calculateTax - A function that calculates the tax for an order.
 * - CalculateTaxInput - The input type for the calculateTax function.
 * - CalculateTaxOutput - The return type for the calculateTax function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateTaxInputSchema = z.object({
  location: z.string().describe('The location of the customer.'),
  products: z.array(z.object({
    name: z.string().describe('The name of the product.'),
    price: z.number().describe('The price of the product.'),
    taxable: z.boolean().describe('Whether the product is taxable.'),
  })).describe('The products in the order.'),
});
export type CalculateTaxInput = z.infer<typeof CalculateTaxInputSchema>;

const CalculateTaxOutputSchema = z.object({
  tax: z.number().describe('The total tax for the order.'),
});
export type CalculateTaxOutput = z.infer<typeof CalculateTaxOutputSchema>;

export async function calculateTax(input: CalculateTaxInput): Promise<CalculateTaxOutput> {
  return calculateTaxFlow(input);
}

const calculateTaxPrompt = ai.definePrompt({
  name: 'calculateTaxPrompt',
  input: {schema: CalculateTaxInputSchema},
  output: {schema: CalculateTaxOutputSchema},
  prompt: `You are a tax expert who calculates the tax for an order based on the location and products.

Calculate the tax for the following order:

Location: {{{location}}}
Products: {{#each products}}{{{name}}} - {{{price}}} - {{{taxable}}}
{{/each}}

Return the total tax for the order.`,    
});

const calculateTaxFlow = ai.defineFlow(
  {
    name: 'calculateTaxFlow',
    inputSchema: CalculateTaxInputSchema,
    outputSchema: CalculateTaxOutputSchema,
  },
  async input => {
    let subtotal = 0;
    let tax = 0;

    input.products.forEach(product => {
      subtotal += product.price;
    });

    if (input.location === 'California') {
      tax = subtotal * 0.0725;
    } else {
      tax = subtotal * 0.05;
    }

    return {tax: tax};
  }
);
