import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
                <h3 className="font-bold font-headline text-lg mb-2">Vista</h3>
                <p className="text-muted-foreground text-sm">Timeless Craft, Modern Home.</p>
                 <div className="flex space-x-4 mt-4">
                    <Link href="#"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
                    <Link href="#"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
                    <Link href="#"><Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
                </div>
            </div>
            <div className="col-span-1">
                <h3 className="font-semibold mb-2">Shop</h3>
                <ul className="space-y-2 text-sm">
                    <li><Link href="/#categories" className="text-muted-foreground hover:text-primary">Categories</Link></li>
                    <li><Link href="/#featured-products" className="text-muted-foreground hover:text-primary">Featured</Link></li>
                    <li><Link href="/#all-products" className="text-muted-foreground hover:text-primary">All Products</Link></li>
                </ul>
            </div>
            <div className="col-span-1">
                <h3 className="font-semibold mb-2">About</h3>
                <ul className="space-y-2 text-sm">
                    <li><Link href="#" className="text-muted-foreground hover:text-primary">Our Story</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary">Artisans</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
                </ul>
            </div>
            <div className="col-span-1 md:col-span-1">
                <h3 className="font-semibold mb-2">Stay in Touch</h3>
                <p className="text-muted-foreground text-sm mb-2">Subscribe to our newsletter for updates and special offers.</p>
                <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Input type="email" placeholder="Your email" className="bg-background flex-grow" />
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p className="text-center md:text-left">© {new Date().getFullYear()} Vista. All Rights Reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
                <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
                <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
