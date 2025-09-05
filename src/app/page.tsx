import Hero from '@/components/Hero';
import CarCarousel from '@/components/CarCarousel';
import RecentCars from '@/components/RecentCars';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';

// app/page.tsx
import type { Metadata } from "next";
import WhyChoose from "@/components/WhyChoose";

export const metadata: Metadata = {
  metadataBase: new URL("https://cheapridesgh.com"),
  title: {
    default: "CheapRides Ghana – Affordable Cars, Premium Experience",
    template: "%s | CheapRides Ghana",
  },
  description:
    "Discover quality new and used vehicles at unbeatable prices in Ghana. Find your dream car with CheapRides Ghana today!",
  keywords: [
    "cheap cars Ghana",
    "affordable vehicles",
    "buy cars online",
    "Honda Ghana",
    "Toyota Ghana",
    "used cars Ghana",
    "car marketplace",
  ],
  authors: [{ name: "CheapRides Ghana", url: "https://cheapridesgh.com" }],
  creator: "CheapRides Ghana",
  publisher: "CheapRides Ghana",
  openGraph: {
    title: "CheapRides Ghana – Affordable Cars, Premium Experience",
    description:
      "Find affordable new and used cars with detailed specs, high-quality images, and secure buying options in Ghana.",
    url: "https://cheapridesgh.com",
    siteName: "CheapRides Ghana",
    images: [
      {
        url: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=1",
        width: 1200,
        height: 630,
        alt: "CheapRides Ghana - Car Marketplace",
      },
      {
        url: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=1",
        width: 1200,
        height: 630,
        alt: "Find Your Dream Car in Ghana",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CheapRides Ghana – Affordable Cars, Premium Experience",
    description:
      "Discover your perfect car in Ghana with CheapRides – affordable, reliable, and premium vehicles all in one place.",
    images: [
      "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=1",
    ],
    creator: "@CheapRidesgh",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#2563eb" },
    ],
  },
  themeColor: "#2563eb",
  alternates: {
    canonical: "https://cheapridesgh.com",
  },
};



export default function Home() {
  return (
    <div>
      <Hero />
      <CarCarousel />
      <RecentCars />
      <WhyChoose />
      <Testimonials />
      <Footer />
    </div>
  );
}