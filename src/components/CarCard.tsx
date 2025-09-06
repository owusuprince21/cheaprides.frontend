'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Car } from '@/types/car';
import { Button } from '@/components/ui/button';
import { Calendar, Gauge, Fuel, ShoppingCart, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

interface CarCardProps {
  car: Car;
  showHotSaleBadge?: boolean;
}

export default function CarCard({ car, showHotSaleBadge }: CarCardProps) {
  const { user } = useAuth();
  const router = useRouter();

    const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
    
  };


  const handleContactWhatsApp = () => {
    if (!user) {
      router.push('/auth/login');
      toast({
        title: 'Login Required!',
        description: 'You need to be logged in to contact the seller.',
      });
      return;
    }

    let firstName = '';
    let lastName = '';

    if (user.displayName) {
      const parts = user.displayName.split(' ');
      firstName = parts[0];
      lastName = parts.slice(1).join(' ');
    }

    const adminNumber = '233557557236';
    const message = `Hi CheapRides Ghana, I'm ${firstName} ${lastName}. I'm interested in the ${car.title} listed for GH₵${Number(
      car.price
    ).toLocaleString('en-GH')}. Is it still available?`;

    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500 flex flex-col">
      {/* Car Image */}
      <div className="relative w-full h-64">
        <Image src={car.main_image} alt={car.title} fill className="object-cover w-full h-full" />
        {showHotSaleBadge && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            Hot Sale
          </div>
        )}
        {car.condition && (
          <span className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            {car.condition.toUpperCase()}
          </span>
        )}
      </div>

      {/* Car Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="mb-3">
          <h3 className="text-gray-900 text-lg font-semibold uppercase">{car.title}</h3>
          <div className="flex justify-between items-center mt-1">
            <p className="text-blue-600 font-bold text-xl">
              {formatPrice(car.price)}
            </p>
            <p className="text-gray-500 font-medium text-sm">{car.make.toUpperCase()}</p>
          </div>
        </div>

        <hr className="border-gray-200 my-3" />

        <div className="grid grid-cols-3 text-center gap-4">
          <div className="flex flex-col items-center">
            <Calendar className="h-6 w-6 text-gray-500 mb-1" />
            <span className="font-semibold">{car.year}</span>
            <span className="text-gray-500 text-sm">Year</span>
          </div>
          <div className="flex flex-col items-center">
            <Gauge className="h-6 w-6 text-gray-500 mb-1" />
            <span className="font-semibold">{car.mileage.toLocaleString()}</span>
            <span className="text-gray-500 text-sm">Miles</span>
          </div>
          <div className="flex flex-col items-center">
            <Fuel className="h-6 w-6 text-gray-500 mb-1" />
            <span className="font-semibold">{car.fuel_type}</span>
            <span className="text-gray-500 text-sm">Fuel Type</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Link href={`/cars/${car.slug}`} className="flex-1">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 rounded-lg shadow-md flex items-center justify-center space-x-2 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Eye className="h-5 w-5" />
              <span>View Details</span>
            </Button>
          </Link>
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-3 rounded-lg shadow-md flex items-center justify-center space-x-2 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            onClick={handleContactWhatsApp}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Buy Now</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
