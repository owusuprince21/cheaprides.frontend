'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  carPurchased: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Kwame Asante",
    location: "Accra",
    rating: 4,
    comment: "Excellent service! Found my dream Toyota Camry at an unbeatable price. The team was very professional and helpful throughout the process.",
    carPurchased: "Toyota Camry 2018",
    image: "https://avatar.iran.liara.run/public/48"
  },
  {
    id: 2,
    name: "Ama Osei",
    location: "Kumasi",
    rating: 5,
    comment: "Amazing experience! The car was exactly as described and the WhatsApp communication made everything so easy. Highly recommend Cheap Rides Gh!",
    carPurchased: "Honda Civic 2019",
    image: "https://avatar.iran.liara.run/public/91"
  },
  {
    id: 3,
    name: "Kofi Mensah",
    location: "Tema",
    rating: 5,
    comment: "Great selection of cars and transparent pricing. Got my Nissan Sentra in perfect condition. The team went above and beyond to help me.",
    carPurchased: "Nissan Sentra 2017",
    image: "https://avatar.iran.liara.run/public/10"
  },
  {
    id: 4,
    name: "Akosua Darko",
    location: "Takoradi",
    rating: 5,
    comment: "Professional service from start to finish. The car inspection was thorough and I felt confident in my purchase. Thank you Cheap Rides Gh!",
    carPurchased: "Hyundai Elantra 2020",
    image: "https://avatar.iran.liara.run/public/96"
  },
  {
    id: 5,
    name: "Yaw Boateng",
    location: "Cape Coast",
    rating: 5,
    comment: "Best car buying experience ever! Quick response on WhatsApp, fair pricing, and excellent customer service. Will definitely recommend to friends.",
    carPurchased: "Kia Forte 2019",
    image: "https://avatar.iran.liara.run/public/19"
  },
  {
    id: 6,
    name: "Efua Adjei",
    location: "Ho",
    rating: 5,
    comment: "Fantastic service! The team helped me find the perfect family car within my budget. The entire process was smooth and hassle-free.",
    carPurchased: "Toyota Corolla 2018",
    image: "https://avatar.iran.liara.run/public/89"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: false,  // <--- now it updates every time
    threshold: 0.3
  });

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
                    <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          </motion.div>

                              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about their experience with Cheap Rides Gh.
          </p>
          </motion.div>
        </div>
            
                  <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            
                  <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
            <Quote className="absolute top-6 right-6 h-12 w-12 text-blue-100" />
            
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    width={96}   // 24 * 4 (Tailwind w-24 = 6rem = 96px)
                    height={96}  // same as width for a square image
                    className="rounded-full object-cover border-4 border-blue-100"
                  />

              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                
                <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                  &quot;{testimonials[currentIndex].comment}&quot;
                </blockquote>
                
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-gray-900">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].location}
                  </p>
                  <p className="text-sm text-blue-600 font-medium">
                    Purchased: {testimonials[currentIndex].carPurchased}
                  </p>
                </div>
              </div>
            </div>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {inView && (
                   <CountUp key="customers" start={0} end={200} duration={3} suffix="+" />
                  )}
                </div>
                <div className="text-gray-600">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                    {inView && (
                  <CountUp key="cars" start={0} end={100} duration={3} suffix="+" />
                    )}
                </div>
                <div className="text-gray-600">Cars Sold</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">4.5/5.0</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
        
        </div>
        </motion.div>
      </div>
    </section>
  );
}