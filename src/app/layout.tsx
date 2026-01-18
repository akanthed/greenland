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
  metadataBase: new URL("https://greenland-untold.vercel.app"),
  title: {
    default: "GREENLAND: THE UNTOLD STORY | The Ultimate Interactive Guide",
    template: "%s | Greenland: The Untold Story",
  },
  description:
    "Discover the real Greenland. An immersive deep-dive into the Arctic's geopolitics, $280T mineral wealth, and the climate crisis. The most comprehensive interactive resource available.",
  keywords: [
    "Greenland",
    "Greenland facts",
    "Greenland climate change",
    "Greenland minerals",
    "Greenland independence",
    "Arctic geopolitics",
    "Greenland ice sheet",
    "Greenland resources",
    "Greenland untold",
    "Greenland economy",
    "Inuit culture",
  ],
  authors: [{ name: "Akshay Kanthed", url: "mailto:akshay.kanthed007@gmail.com" }],
  creator: "Akshay Kanthed",
  publisher: "Greenland: The Untold Story",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://greenland-untold.vercel.app",
    siteName: "Greenland: The Untold Story",
    title: "GREENLAND: THE UNTOLD STORY - Go Beyond the Map",
    description:
      "Wait, you don't know the full story of Greenland. 82% ice, $280T minerals, and a global power struggle. Explore now.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Greenland: The Untold Story Interactive Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GREENLAND: THE UNTOLD STORY",
    description:
      "The $280 Trillion Polar Battleground. Everything they didn't tell you about Greenland.",
    images: ["/og-image.jpg"],
    creator: "@akshay_kanthed", // Example placeholder, user can update
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    "name": "Greenland: The Untold Story",
    "description": "An interactive, data-driven journey into the heart of the Arctic.",
    "provider": {
      "@type": "Organization",
      "name": "Greenland Untold",
      "url": "https://greenland-untold.vercel.app"
    },
    "audience": "Students, Researchers, Geopolitical Analysts",
    "educationalLevel": "Intermediate"
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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

