import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const SITE_NAME = "Taos Home Value";
const SITE_URL = "https://taoshomevalue.com";
const TITLE = "Taos Home Value | Request a Local Pricing Snapshot";
const DESCRIPTION =
  "Get a local, comps-based pricing snapshot for your Taos-area property. No call centers. No lead resale. Just a clear range and the data behind it.";
const OG_IMAGE = `${SITE_URL}/images/136-3x1hero.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Taos Home Value — local pricing snapshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
