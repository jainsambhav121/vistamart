
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Ruler } from 'lucide-react';

export default function CustomProductPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Ruler className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl font-bold font-headline">Build Your Own Mattress</h1>
        <p className="text-muted-foreground mt-2">Create a mattress that's perfect for you.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Customization Options</CardTitle>
              <CardDescription>Select your preferences below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">1. Select Size</h3>
                <RadioGroup defaultValue="queen" className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="twin" id="twin" className="peer sr-only" />
                    <Label htmlFor="twin" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                      Twin
                    </Label>
                  </div>
                   <div>
                    <RadioGroupItem value="full" id="full" className="peer sr-only" />
                    <Label htmlFor="full" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                      Full
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="queen" id="queen" className="peer sr-only" />
                    <Label htmlFor="queen" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                      Queen
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="king" id="king" className="peer sr-only" />
                    <Label htmlFor="king" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                      King
                    </Label>
                  </div>
                </RadioGroup>
              </div>

               <div className="space-y-4">
                <h3 className="text-lg font-semibold">2. Select Firmness</h3>
                <RadioGroup defaultValue="medium" className="grid grid-cols-3 gap-4">
                  <div><RadioGroupItem value="soft" id="soft" className="sr-only peer" /><Label htmlFor="soft" className="block text-center p-4 rounded-lg border-2 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Soft</Label></div>
                  <div><RadioGroupItem value="medium" id="medium" className="sr-only peer" /><Label htmlFor="medium" className="block text-center p-4 rounded-lg border-2 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Medium</Label></div>
                  <div><RadioGroupItem value="firm" id="firm" className="sr-only peer" /><Label htmlFor="firm" className="block text-center p-4 rounded-lg border-2 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Firm</Label></div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">3. Add-ons</h3>
                 <div className="flex items-center space-x-3">
                    <Checkbox id="cooling-gel" />
                    <Label htmlFor="cooling-gel" className="text-base font-normal">Cooling Gel Topper</Label>
                 </div>
                 <div className="flex items-center space-x-3">
                    <Checkbox id="pillow-top" />
                    <Label htmlFor="pillow-top" className="text-base font-normal">Extra Pillow Top</Label>
                 </div>
              </div>

            </CardContent>
          </Card>
        </div>
         <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Your Custom Mattress</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span>Base Price</span>
                        <span>$799.00</span>
                    </div>
                     <div className="flex justify-between">
                        <span>Size: Queen</span>
                        <span>+$0.00</span>
                    </div>
                     <div className="flex justify-between">
                        <span>Firmness: Medium</span>
                        <span>+$0.00</span>
                    </div>
                     <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
                        <span>Total</span>
                        <span>$799.00</span>
                    </div>
                    <Button className="w-full mt-4">Add to Cart</Button>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
