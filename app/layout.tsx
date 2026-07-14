import type { Metadata } from "next";
import { Geist_Mono, Quicksand } from "next/font/google";
import { InlineScript } from "@/components/inline-script";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { SocialRail } from "@/components/social-rail";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { localizeSiteSettings } from "@/lib/i18n/localize";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/site-settings";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const settings = localizeSiteSettings(await getSiteSettings(), locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: settings.title,
      template: `%s — ${settings.name}`,
    },
    description: settings.description,
    openGraph: {
      type: "website",
      url: siteConfig.url,
      title: settings.title,
      description: settings.description,
      siteName: settings.name,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.title,
      description: settings.description,
    },
  };
}

const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const [settings, dict] = await Promise.all([getSiteSettings(), getDictionary(locale)]);

  return (
    <html
      lang={locale}
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${quicksand.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <InlineScript html={themeInitScript} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          {dict.layout.skipToContent}
        </a>
        <SiteNav locale={locale} dict={dict} />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter name={settings.name} social={settings.social} dict={dict} />
        <SocialRail social={settings.social} dict={dict} />
      </body>
    </html>
  );
}
