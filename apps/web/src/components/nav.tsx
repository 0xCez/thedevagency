import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Nav({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const otherLang: Locale = lang === "en" ? "fr" : "en";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link href={`/${lang}`} className="font-mono text-sm tracking-tight">
          ◼ THE DEV AGENCY
        </Link>
        <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted">
          <Link
            href={`/${lang}/work`}
            className="hover:text-foreground transition"
          >
            {dict.nav.work}
          </Link>
          <Link
            href={`/${lang}/about`}
            className="hover:text-foreground transition"
          >
            {dict.nav.about}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="hover:text-foreground transition"
          >
            {dict.nav.contact}
          </Link>
          <span className="text-muted/50">·</span>
          <Link
            href={`/${otherLang}`}
            className="hover:text-foreground transition"
            aria-label={`Switch to ${otherLang.toUpperCase()}`}
          >
            {otherLang.toUpperCase()}
          </Link>
        </nav>
      </div>
    </header>
  );
}
