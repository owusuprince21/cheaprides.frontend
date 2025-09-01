'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CarCard from './CarCard';
import { Car } from '@/types/car';
import api from '@/lib/api';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecentCars() {
  const [recentCars, setRecentCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentCars = async () => {
      try {
        const response = await api.get('/cars/recent/');
        setRecentCars(response.data);
      } catch (error) {
        console.error('Error fetching recent cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentCars();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Recently Added Cars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
                            <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
          <h2 className="text-3xl font-bold text-gray-900">
            Recently Added Cars
          </h2>
      </motion.div>
          <Link
            href="/cars"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <span>View All</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          x
        </div>
        

        {recentCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  // className="text-center mb-16"
                >
          {recentCars.map((car) => (
              <CarCard key={car.id} car={car} />
         ))}
          </motion.div>
          </div>
         
        ) : (
          <p className="text-center text-gray-600">No cars available at the moment.</p>
        )}
      </div>
    </section>
  );
}