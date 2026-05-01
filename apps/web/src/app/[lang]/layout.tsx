import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = "https://thedevagency.xyz";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const isFr = lang === "fr";
  const title = "The Dev Agency";
  const description = isFr
    ? "On conçoit et développe des logiciels. Apps mobile, plateformes web, intégrations IA, automatisation."
    : "We design and build software. Mobile apps, web platforms, AI integrations, automation.";

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s — ${title}` },
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        fr: "/fr",
        "x-default": "/en",
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}`,
      siteName: title,
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Nav lang={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "The Dev Agency",
              url: SITE_URL,
              email: "cesar@thedevagency.xyz",
              description:
                "Software studio. Mobile apps, web platforms, AI integrations, automation.",
              sameAs: ["https://github.com/0xCez"],
            }),
          }}
        />
      </body>
    </html>
  );
}
