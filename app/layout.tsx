import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Script from "next/script";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const GTM_ID = "GTM-WDGT2XPV";

export const metadata: Metadata = {
  title: "Mavinic Solar | Simulador de Economia Solar Inteligente",
  description: "Descubra quanto você pode economizar com energia solar. Simulação gratuita e instantânea para sua residência ou empresa pela Mavinic Solar.",
  manifest: "/manifest.json",
  icons: {
    icon: "/assets/branding/favicon.svg",
    apple: "/assets/branding/favicon.svg",
  },
  openGraph: {
    title: "Mavinic Solar | Simulador de Economia Solar Inteligente",
    description: "Transforme o sol em economia real com a inteligência da Mavinic Solar. Reduza até 95% da sua conta de luz.",
    url: "https://solar.mavinic.com.br",
    siteName: "Mavinic Solar",
    images: [
      {
        url: "/assets/branding/logo-dark.svg",
        width: 1200,
        height: 630,
        alt: "Mavinic Solar",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mavinic Solar | Simulador de Economia Solar",
    description: "Transforme o sol em economia real com a inteligência da Mavinic Solar.",
    images: ["/assets/branding/logo-dark.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
