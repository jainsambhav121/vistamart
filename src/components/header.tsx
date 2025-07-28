
'use client';

import Link from "next/link";
import { User, Search, Heart, LogIn } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartIcon } from "@/components/cart-icon";
import { MobileNavMenu } from "./mobile-nav-menu";
import { Skeleton } from "./ui/skeleton";

export function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <MobileNavMenu />

        <div className="mr-auto hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-2xl">Vista</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/#all-products">Products</Link>
            <Link href="/#categories">Categories</Link>
            <Link href="/orders">My Orders</Link>
          </nav>
        </div>

        <div className="flex-1 md:flex-none md:mx-auto">
            <form>
            <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
            </div>
            </form>
        </div>

        <div className="ml-auto flex items-center space-x-2">
          <nav className="flex items-center">
             <Button asChild variant="ghost" size="icon">
                <Link href="/wishlist">
                    <Heart />
                    <span className="sr-only">Wishlist</span>
                </Link>
            </Button>
            
            {loading ? (
              <Skeleton className="h-8 w-8 rounded-full" />
            ) : user ? (
              <Button asChild variant="ghost" size="icon">
                  <Link href="/profile">
                      <User />
                      <span className="sr-only">User Profile</span>
                  </Link>
              </Button>
            ) : (
              <Button asChild variant="ghost" size="sm">
                  <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                  </Link>
              </Button>
            )}

            <CartIcon />
          </nav>
        </div>
      </div>
    </header>
  );
}
