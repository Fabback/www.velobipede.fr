import type { Metadata, Viewport } from "next";

import { Poppins } from "next/font/google";

import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import {
  ColorSchemeScript,
  createTheme,
  List,
  ListItem,
  type MantineColorsTuple,
  MantineProvider,
  mantineHtmlProps,
  rem,
  VisuallyHidden,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import Image from "next/image";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconMail,
  IconMap2,
  IconPhoneCall,
} from "@tabler/icons-react";
import Link from "next/link";

import bav_logo_image from "../../public/assets/images/BaV_logo_noir_160x160.png";

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
  colors: {
    velobigreen: myColor,
  },
  primaryColor: "velobigreen",
  primaryShade: 8,
  fontFamily: `${font_poppins.style.fontFamily}, Helvetica, sans-serif`,
  fontSizes: {
    xs: rem(10),
    sm: rem(11),
    md: rem(14),
    lg: rem(16),
    xl: rem(20),
  },
  lineHeights: {
    xs: "1.4",
    sm: "1.45",
    md: "1.55",
    lg: "1.6",
    xl: "1.65",
  },
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
            <div className="page-vertical-flow relative mx-auto my-2 h-14 sm:my-6 sm:h-28">
              <Link href="/">
                <Image
                  className="mx-auto"
                  src="assets/images/logo_side.svg"
                  alt="Le Vélobipède - logo"
                  fill={true}
                  priority
                />
              </Link>
            </div>
          </header>

          <div className="mt-[calc(3.5rem_+_1rem)] sm:mt-[calc(7rem_+_3rem)]">
            {children}
          </div>

          <section className="page-vertical-flow mt-8">
            <div className="flex flex-col-reverse flex-wrap items-center gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="relative h-20 w-48">
                {/*<img src="/assets/images/velocargo.svg" alt="Cargo silouette" className="cargo_silhouette" fill="true"/>*/}
                <Image
                  src="/assets/images/velocargo.svg"
                  alt="Cargo silouette"
                  className="cargo_silhouette"
                  fill={true}
                  style={{ left: 0 }}
                  priority
                />
                {/**/}
              </div>

              <div className="relative w-[80%] p-4 sm:w-[400px] sm:p-0">
                {/* <img src="/assets/images/BaV_logo_noir_160x160.png" className="deco-boitesavelo"/> */}

                <Image
                  src={bav_logo_image}
                  width={80}
                  height={80}
                  className="float-right"
                  alt="Logo Les Boites à Vélo"
                ></Image>

                <p>
                  Pour plus d&apos;infos sur l&apos;entreprenariat à vélo,
                  renseignez-vous auprès de l&apos;association{" "}
                  <Link
                    href="https://lesboitesavelo.org/"
                    target="_blank"
                    rel="noopener"
                    prefetch={false}
                  >
                    Les Boites à Vélo
                  </Link>
                </p>
              </div>
            </div>
          </section>

          <footer className="bg-black text-white">
            <div className="page-vertical-flow justify-between gap-5 p-2 sm:flex">
              <div className="mx-auto block sm:ml-0">
                <div className="flex flex-col items-center gap-1.5 sm:items-start">
                  <div className="flex flex-row items-center gap-1">
                    <IconMail />
                    <Link
                      prefetch={false}
                      href="mailto:Le%20V%C3%A9lobip%C3%A8de<contact@velobipede.fr>?subject=Contact%20site&body=Je%20d%C3%A9cris%20mon%20probl%C3%A8me%0D%0AJe%20donne%20mes%20coordonn%C3%A9es"
                      title="Envoyer un email"
                      className="text-white"
                    >
                      contact@velobipede.fr
                    </Link>
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <IconPhoneCall />
                    <Link
                      href="tel:+33671495561"
                      title="Composer le 0671495561"
                      prefetch={false}
                      className="text-white"
                    >
                      06.71.49.55.61
                    </Link>
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <IconMap2 />
                    <Link
                      href="https://maps.app.goo.gl/1Tg936xBtQbsec647"
                      title="Ouvrir dans Google Maps"
                      prefetch={false}
                      className="text-white"
                    >
                      Le Vélobipède
                      <br />
                      27 rue Georges Lizé
                      <br />
                      72100 Le Mans
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative mx-auto flex flex-grow flex-col items-center gap-4 pt-2 sm:items-end">
                <div className="flex flex-row justify-end gap-2">
                  <div>
                    <Link
                      href="https://www.facebook.com/LeVelobipede/"
                      target="_blank"
                      title="Visiter ma page Facebook"
                      prefetch={false}
                    >
                      <svg viewBox="0 0 48 48" width="48" height="48">
                        <circle cx="24" cy="24" r="24" fill="white" />
                        <IconBrandFacebook
                          color="black"
                          x={9}
                          y={10}
                          width={28}
                          height={28}
                        />
                      </svg>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="https://www.instagram.com/le.velobipede/"
                      target="_blank"
                      title="Visiter ma page Instagram"
                      prefetch={false}
                    >
                      <svg viewBox="0 0 48 48" width="48" height="48">
                        <circle cx="24" cy="24" r="24" fill="white" />
                        <IconBrandInstagram
                          color="black"
                          x={10}
                          y={10}
                          width={28}
                          height={28}
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
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
