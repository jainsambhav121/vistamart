import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function ConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <Card className="max-w-2xl mx-auto text-center">
        <CardHeader>
            <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          <CardTitle className="text-3xl font-headline mt-4">Thank you for your order!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            We've received your order and will start processing it right away. A confirmation email has been sent to you with the order details.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
                <Link href="/">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline">
                <Link href="/orders">View Orders</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
