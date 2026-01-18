import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { PerspectiveProvider } from "@/lib/context/PerspectiveContext";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { BackToTop } from "@/components/shared/BackToTop";

// Font configurations
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://greenland-untold.com"),
  title: {
    default: "GREENLAND: THE UNTOLD STORY | Interactive Experience",
    template: "%s | Greenland: The Untold Story",
  },
  description:
    "82% ice. $280T minerals. 56,000 people. Who owns the future? Explore the most comprehensive interactive resource about Greenland's geopolitics, climate, and future.",
  keywords: [
    "Greenland",
    "Arctic",
    "climate change",
    "rare earth minerals",
    "geopolitics",
    "Denmark",
    "Trump Greenland",
    "ice sheet",
    "Inuit",
    "independence",
  ],
  authors: [{ name: "Akshay Kanthed", url: "mailto:akshay.kanthed007@gmail.com" }],
  creator: "Akshay Kanthed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://greenland-untold.com",
    siteName: "Greenland: The Untold Story",
    title: "GREENLAND: THE UNTOLD STORY",
    description:
      "82% ice. $280T minerals. 56,000 people. Who owns the future?",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Greenland: The Untold Story",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GREENLAND: THE UNTOLD STORY",
    description:
      "82% ice. $280T minerals. 56,000 people. Who owns the future?",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A2463",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <PerspectiveProvider>
          <ScrollProgress />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <BackToTop />
        </PerspectiveProvider>
      </body>
    </html>
  );
}

