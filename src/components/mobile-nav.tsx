
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { categories } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Home, LayoutGrid, Ruler, ShoppingCart, Heart, Package, User, HelpCircle, LogOut, LogIn } from 'lucide-react';

const NavLink = ({ href, pathname, children, onClick }: { href: string; pathname: string; children: React.ReactNode, onClick?: () => void }) => (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 rounded-md p-3 text-lg font-medium transition-colors',
        pathname === href
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
      )}
    >
      {children}
    </Link>
  );

export function MobileNav({onLinkClick}: {onLinkClick?: () => void}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full flex-col">
        <div className="flex-grow overflow-y-auto">
            <div className="p-4">
                 <Link href="/" onClick={onLinkClick} className="mb-6 flex items-center space-x-2 px-3">
                    <span className="font-headline text-2xl font-bold">Vista</span>
                </Link>
                <nav className="flex flex-col space-y-1">
                    <NavLink href="/" pathname={pathname} onClick={onLinkClick}><Home className="h-5 w-5" /> Home</NavLink>

                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="categories" className="border-b-0">
                            <AccordionTrigger className="flex items-center gap-4 rounded-md p-3 text-lg font-medium text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground hover:no-underline [&[data-state=open]>svg]:rotate-180">
                                <LayoutGrid className="h-5 w-5" />
                                <span>Shop by Category</span>
                            </AccordionTrigger>
                            <AccordionContent className="pb-0">
                                <div className="mt-1 flex flex-col space-y-1 pl-12">
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/category/${category.id}`}
                                        onClick={onLinkClick}
                                        className={cn(
                                            'flex items-center gap-3 rounded-md p-2 text-base',
                                            pathname === `/category/${category.id}`
                                            ? 'bg-accent/80 font-medium text-accent-foreground'
                                            : 'text-muted-foreground hover:bg-accent/50'
                                        )}
                                    >
                                        <category.icon className="h-4 w-4" />
                                        {category.name}
                                    </Link>
                                ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    
                    <NavLink href="/products/custom" pathname={pathname} onClick={onLinkClick}><Ruler className="h-5 w-5" /> Build Your Mattress</NavLink>
                    <NavLink href="/cart" pathname={pathname} onClick={onLinkClick}><ShoppingCart className="h-5 w-5" /> My Cart</NavLink>
                    <NavLink href="/wishlist" pathname={pathname} onClick={onLinkClick}><Heart className="h-5 w-5" /> Wishlist</NavLink>
                   
                    {user && (
                      <>
                        <NavLink href="/orders" pathname={pathname} onClick={onLinkClick}><Package className="h-5 w-5" /> My Orders</NavLink>
                        <NavLink href="/profile" pathname={pathname} onClick={onLinkClick}><User className="h-5 w-5" /> My Profile</NavLink>
                      </>
                    )}

                    <NavLink href="/help" pathname={pathname} onClick={onLinkClick}><HelpCircle className="h-5 w-5" /> Help / FAQs</NavLink>
                </nav>
            </div>
        </div>
         <div className="border-t p-4">
            {user ? (
                 <button onClick={() => { logout(); onLinkClick?.(); }} className="flex w-full items-center gap-4 rounded-md p-3 text-lg font-medium text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                 </button>
            ) : (
                <NavLink href="/login" pathname={pathname} onClick={onLinkClick}>
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                </NavLink>
            )}
         </div>
    </div>
  );
}
