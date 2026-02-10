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
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Taos Home Value Snapshot",
    template: "%s | Taos Home Value",
  },
  description:
    "Request a market-based pricing snapshot for your Taos-area property.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: "Taos Home Value Snapshot",
    description:
      "Request a market-based pricing snapshot for your Taos-area property.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Taos Home Value Snapshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taos Home Value Snapshot",
    description:
      "Request a market-based pricing snapshot for your Taos-area property.",
    images: ["/images/og-image.jpg"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
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
