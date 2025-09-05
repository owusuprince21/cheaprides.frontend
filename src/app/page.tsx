import Hero from '@/components/Hero';
import CarCarousel from '@/components/CarCarousel';
import RecentCars from '@/components/RecentCars';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';

// app/page.tsx
import type { Metadata } from "next";
import WhyChoose from "@/components/WhyChoose";

export const metadata: Metadata = {
  title: "CheapRides Gh – Affordable Cars, Premium Experience",
  description:
    "Discover quality new and used vehicles at unbeatable prices in Ghana. Your dream car is just a click away!",
  keywords: [
    "quality cars",
    "buy new and used cars",
    "Honda Accord",
    "Toyota Ghana",
    "car marketplace",
    "affordable vehicles",
  ],
  openGraph: {
    title: "CheapRides Ghana – Affordable Cars, Premium Experience",
    description:
      "Discover quality new and used vehicles at unbeatable prices in Ghana. Your dream car is just a click away!",
    url: "https://cheapridesgh.com",
    siteName: "CheapRides",
    images: [
      {
        url: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        width: 1200,
        height: 630,
        alt: "CheapRides - Car Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CheapRides Ghana – Affordable Cars, Premium Experience",
    description:
      "Find affordable new and used cars with detailed specs, high-quality images, and secure buying options.",
    images: [
      "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    creator: "@CheapRidesgh", // optional
  },
  icons: {
  icon: [
    { url: "/favicon.ico" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
  ],
  apple: [
    { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
  other: [
    { rel: "manifest", url: "/site.webmanifest" },
    { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#2563eb" }, // Safari pinned tabs
  ],
},
themeColor: "#2563eb",
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