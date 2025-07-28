
'use client';

import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { User, MapPin, FileText, LogOut, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
         <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mr-4">
            <User className="h-8 w-8 text-muted-foreground" />
         </div>
        <div>
          <h1 className="text-4xl font-bold font-headline">{user.displayName || 'My Profile'}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <Card>
        <CardContent className="p-6 grid gap-6">
          <Link href="#" className="flex items-center p-4 rounded-lg hover:bg-secondary">
              <MapPin className="h-6 w-6 mr-4 text-primary" />
              <div>
                  <h3 className="font-semibold">Manage Addresses</h3>
                  <p className="text-sm text-muted-foreground">Add or edit your shipping addresses</p>
              </div>
          </Link>
          <Separator />
          <Link href="/orders" className="flex items-center p-4 rounded-lg hover:bg-secondary">
              <FileText className="h-6 w-6 mr-4 text-primary" />
              <div>
                  <h3 className="font-semibold">Invoices & Order History</h3>
                  <p className="text-sm text-muted-foreground">View your past orders and invoices</p>
              </div>
          </Link>
           <Separator />
           <button onClick={logout} className="flex items-center p-4 rounded-lg hover:bg-secondary text-red-500 w-full text-left">
               <LogOut className="h-6 w-6 mr-4" />
               <div>
                   <h3 className="font-semibold">Logout</h3>
                   <p className="text-sm ">Sign out of your account</p>
               </div>
           </button>
        </CardContent>
      </Card>
    </div>
  );
}
