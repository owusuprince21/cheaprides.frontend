import Link from 'next/link';
import { Search } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/daebnxnfj/image/upload/v1756659740/Q8_aef1sd.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" /> {/* Dark overlay for readability */}
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/logo3.png"
              alt="Logo"
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect
            <span className="block text-yellow-400">Cheap Ride</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover quality used cars at unbeatable prices in Ghana. 
            Your dream car is just a click away!
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/cars"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-lg transition-colors duration-300 flex items-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Browse Cars</span>
            </Link>

            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold">Over 100+ Cars Available</p>
              <p className="text-sm opacity-90">Updated Daily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
