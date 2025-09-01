import Hero from '@/components/Hero';
import CarCarousel from '@/components/CarCarousel';
import RecentCars from '@/components/RecentCars';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';

// app/page.tsx
import type { Metadata } from "next";
import WhyChoose from '@/components/WhyChoose';

export const metadata: Metadata = {
  title: "CheapRides – Find Your Perfect Cheap Rides",
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
    title: "CheapRides – Find Your Perfect Cheap Rides",
    description:
      "Discover quality new and used vehicles at unbeatable prices in Ghana. Your dream car is just a click away!",
    url: "https://cheapridesgh.vercel.app",
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
    title: "CheapRides – Find Your Perfect Cheap Rides",
    description:
      "Find affordable new and used cars with detailed specs, high-quality images, and secure buying options.",
    images: [
      "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    creator: "@CheapRidesgh", // optional
  },
  icons: {
    icon: "/favicon.ico",
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