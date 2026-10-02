import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="w-full border-b bg-background h-16 flex items-center px-4 md:px-8">
      <div className="font-bold text-xl text-primary">
        <Link href="/">CityFix</Link>
      </div>
      <nav className="ml-auto hidden md:flex gap-6 items-center">
        <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
        <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
        <Link href="/transparency" className="text-sm font-medium hover:text-primary transition-colors">Transparency</Link>
        <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>
          Log In
        </Link>
      </nav>
    </header>
  );
}
