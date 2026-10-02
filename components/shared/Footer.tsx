export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/20 py-8 px-4 md:px-8 mt-auto">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} CityFix. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="/about" className="hover:text-primary transition-colors">About</a>
          <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
          <a href="/transparency" className="hover:text-primary transition-colors">Transparency</a>
        </div>
      </div>
    </footer>
  );
}
