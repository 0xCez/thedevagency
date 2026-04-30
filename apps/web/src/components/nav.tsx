import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="font-mono text-sm tracking-tight">
          ◼ THE DEV AGENCY
        </Link>
        <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted">
          <Link href="/work" className="hover:text-foreground transition">Work</Link>
          <Link href="/about" className="hover:text-foreground transition">About</Link>
          <Link href="/contact" className="hover:text-foreground transition">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
