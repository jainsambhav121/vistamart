import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl font-bold font-headline">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mt-2">Find answers to common questions below.</p>
      </div>

      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            We offer a 30-day return policy for all our products. If you're not satisfied with your purchase, you can return it for a full refund or exchange.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I track my order?</AccordionTrigger>
          <AccordionContent>
            Once your order has shipped, you will receive an email with a tracking number. You can use this number to track your order on the carrier's website.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
          <AccordionContent>
            Yes, we ship to most countries worldwide. Shipping costs and times will vary depending on your location.
          </AccordionContent>
        </AccordionItem>
         <AccordionItem value="item-4">
          <AccordionTrigger>How do I care for my product?</AccordionTrigger>
          <AccordionContent>
            Care instructions are specific to each product. Please refer to the product page or the tag on your item for detailed care information.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
