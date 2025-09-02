'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CarCard from './CarCard';
import { Car } from '@/types/car';
import api from '@/lib/api';

export default function CarCarousel() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const response = await api.get('/cars/featured/');
        setFeaturedCars(response.data);
      } catch (error) {
        console.error('Error fetching featured cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  const nextSlide = () => {
    if (scrollRef.current && window.innerWidth < 768) {
      // Mobile: horizontal scroll
      const container = scrollRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (Math.abs(container.scrollLeft - maxScroll) < 10) {
        // At the end → loop back to start
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
      }
    } else {
      // Desktop: keep original looping behavior
      setCurrentIndex(
        (prev) => (prev + 1) % Math.max(1, featuredCars.length - 2)
      );
    }
  };

  const prevSlide = () => {
    if (scrollRef.current && window.innerWidth < 768) {
      // Mobile: horizontal scroll
      const container = scrollRef.current;

      if (container.scrollLeft <= 0) {
        // At the beginning → loop to end
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
      }
    } else {
      // Desktop: keep original looping behavior
      setCurrentIndex(
        (prev) =>
          (prev - 1 + Math.max(1, featuredCars.length - 2)) %
          Math.max(1, featuredCars.length - 2)
      );
    }
  };

  // 🔥 Auto-scroll setup
  useEffect(() => {
    if (featuredCars.length === 0) return;

    // clear any previous auto-scroll
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    autoScrollRef.current = setInterval(() => {
      nextSlide();
    }, 5000); // every 5 seconds

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [featuredCars, currentIndex]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Hot Sales Cars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (featuredCars.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Hot Sales Cars
          </h2>
          <p className="text-center text-gray-600">
            No featured cars available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Hot Sales Cars
        </h2>

        <div className="relative">
          {featuredCars.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </>
          )}

          {/* Mobile: horizontal scroll with snapping */}
          <div
            ref={scrollRef}
            className="md:hidden flex overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory"
          >
            {featuredCars.map((car) => (
              <div
                key={car.id}
                className="min-w-full flex-shrink-0 snap-start px-2"
              >
                <CarCard car={car} showHotSaleBadge={true} />
              </div>
            ))}
          </div>

          {/* Desktop: unchanged original sliding */}
          <div className="hidden md:block overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              }}
            >
              {featuredCars.map((car) => (
                <div
                  key={car.id}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                >
                  <CarCard car={car} showHotSaleBadge={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
