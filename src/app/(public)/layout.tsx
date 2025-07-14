import type { Metadata } from "next";

import { Poppins } from "next/font/google";

//import "@mantine/core/styles.css";
// import "@mantine/notifications/styles.css";
import "../globals.css";
//import "@mantine/notifications/styles.css";
//import "@mantine/core/styles.css";

import {
  ColorSchemeScript,
  createTheme,
  type MantineColorsTuple,
  MantineProvider,
  mantineHtmlProps,
  rem,  
} from "@mantine/core";

import { Notifications } from "@mantine/notifications";

import Image from "next/image";
import Link from "next/link";

import FooterContactLinks from "./_components/FooterContactLinks";
import FooterSocialLinks from "./_components/FooterSocialLinks";
import SectionDecoAndBav from "./_components/SectionDecoAndBaV";

const font_poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["200", "400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Le Vélobipède",
  description:
    "Atelier de réparation de cycles sur Le Mans (à domicile ou en atelier). Réparation, entretiens, montages complets ou partiels, coaching pour vous accompagner dans votre pratique du vélo",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? ""),
  openGraph: {
    title: "Le Vélobipède - Entretiens et réparation de vélos",
    description:
      "Atelier de réparation de cycles sur Le Mans (à domicile ou en atelier). Réparation, entretiens, montages complets ou partiels, coaching pour vous accompagner dans votre pratique du vélo",
    siteName: "Le Vélobipède",
    type: "website",
    url: "/",
    images: {
      url: "assets/images/partage_og_image.jpg",
      width: "800",
      height: "490",
      type: "image/jpeg",
    },
  },
  twitter: {
    card: "summary",
    title: "Le Vélobipède - Entretiens et réparation de vélos",
    description:
      "Atelier de réparation de cycles sur Le Mans (à domicile ou en atelier). Réparation, entretiens, montages complets ou partiels, coaching pour vous accompagner dans votre pratique du vélo",
    images: {
      url: "assets/images/partage_og_image.jpg",
      alt: "Le Vélobipède",
    },
  },
  icons: {
    icon: "/assets/images/favicon.svg",
    apple: "/assets/images/favicon-iphone.png",
  },
  manifest: "/assets/browser_manifest.json",
};

const myColor: MantineColorsTuple = [
  "#fafaeb",
  "#f3f3db",
  "#e7e6b7",
  "#d9d88e",
  "#cecc6d",
  "#c6c457",
  "#c3c04a",
  "#aba93b",
  "#989631",
  "#838124",
];

const theme = createTheme({
  spacing: {
    xs: "0.625rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "2rem",
  },
  colors: {
    velobigreen: myColor,
  },
  primaryColor: "velobigreen",
  primaryShade: 8,
  fontFamily: `${font_poppins.style.fontFamily}, Helvetica, sans-serif`,
  // fontSizes: {
  //   xs: rem(10),
  //   sm: rem(11),
  //   md: rem(14),
  //   lg: rem(16),
  //   xl: rem(20),
  // },
  // lineHeights: {
  //   xs: "1.4",
  //   sm: "1.45",
  //   md: "1.55",
  //   lg: "1.6",
  //   xl: "1.65",
  // },
  headings: {
    // properties for individual headings, all of them are optional
    fontFamily: `${font_poppins.style.fontFamily}, Helvetica, sans-serif`,
    fontWeight: "700",
    sizes: {
      h1: {
        fontSize: rem(36),
        lineHeight: "1.4",
      },
      h2: { fontSize: "36px", lineHeight: "1.4" },
      h3: { fontSize: "32px", lineHeight: "1.4" },
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return (
    <html lang="fr" {...mantineHtmlProps}>
      <head>
        <meta
          httpEquiv="Cache-Control"
          content="must-revalidate, max-age=60, public"
          key="cache-control"
        />
        <ColorSchemeScript />
      </head>
      <body className={`${font_poppins.variable} antialiased`}>
        <MantineProvider theme={theme}>
          <header className="fixed top-0 z-50 w-full bg-white shadow-xl sm:shadow-2xl">
            <Link
              href="/"
              className="page-vertical-flow relative mx-auto my-2 block h-20 sm:h-32"
            >
              <Image
                className="mx-auto"
                src="assets/images/logo_side.svg"
                alt="Le Vélobipède - logo"
                fill={true}
                priority
              />
            </Link>
          </header>

          <div className="mt-24 sm:mt-36"></div>

          {children}

          {/* TODO : déporter dans pages si nécessaire */}
          <SectionDecoAndBav />

          <footer className="bg-black text-white">
            <div className="page-vertical-flow flex flex-col justify-between gap-3 py-0.5 pt-4 sm:flex-row sm:gap-5">
              <FooterContactLinks />

              <div className="relative mx-auto flex flex-grow flex-col items-center gap-4 sm:items-end">
                <FooterSocialLinks />

                <div className="text-center sm:absolute sm:right-0 sm:bottom-0 sm:text-right">
                  <a
                    href="#"
                    id="open_preferences_center"
                    title="Paramétrer vos cookies"
                  >
                    Gestion des cookies
                  </a>
                  <br />
                  <span>COPYRIGHT © TOUS DROITS RÉSERVÉS</span>
                </div>
              </div>
            </div>
          </footer>
        </MantineProvider>
      </body>
    </html>
  );
}
