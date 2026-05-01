import type { Locale } from "@/lib/i18n";

export function Footer({ lang: _lang }: { lang: Locale }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 lg:px-8 py-8 font-mono text-xs text-muted">
        <span>© {new Date().getFullYear()} The Dev Agency</span>
        <span>cesar@thedevagency.xyz</span>
      </div>
    </footer>
  );
}
