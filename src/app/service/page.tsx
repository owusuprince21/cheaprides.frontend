'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, Paintbrush, Package, Palette, Settings, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import Footer from '@/components/Footer';
import Link from 'next/link';

const services = [
  {
    icon: Wrench,
    title: 'Body Works',
    description: 'Professional collision repair, dent removal, and complete body restoration services',
    color: 'text-blue-500',
    cardBg: 'bg-blue-100/20',
    iconBg: 'bg-blue-100/40',
    gradient: 'from-blue-100/30 to-blue-100/10',
    link: '/service/body-works'
  },
  {
    icon: Paintbrush,
    title: 'Auto Spraying',
    description: 'Expert paint jobs, color matching, and protective coating applications',
    color: 'text-green-500',
    cardBg: 'bg-green-100/20',
    iconBg: 'bg-green-100/40',
    gradient: 'from-green-100/30 to-green-100/10',
    link: '/service/auto-spraying'
  },
  {
    icon: Package,
    title: 'Body Kit Replacement',
    description: 'Custom body kit installation, replacement, and performance enhancement parts',
    color: 'text-purple-500',
    cardBg: 'bg-purple-100/20',
    iconBg: 'bg-purple-100/40',
    gradient: 'from-purple-100/30 to-purple-100/10',
    link: '/service/body-kit'
  },
  {
    icon: Palette,
    title: 'Vehicle Tinting Services',
    description: 'Professional window tinting, privacy films, and UV protection solutions',
    color: 'text-orange-500',
    cardBg: 'bg-orange-100/20',
    iconBg: 'bg-orange-100/40',
    gradient: 'from-orange-100/30 to-orange-100/10',
    link: '/service/vehicle-tinting'
  },
  {
    icon: Settings,
    title: 'Vehicle Spare Parts & Accessories',
    description: 'Genuine OEM parts, aftermarket accessories, and performance upgrades',
    color: 'text-red-500',
    cardBg: 'bg-red-100/20',
    iconBg: 'bg-red-100/40',
    gradient: 'from-red-100/30 to-red-100/10',
    link: '/service/spare-parts'
  },
  {
    icon: Award,
    title: 'Certified Excellence',
    description: 'All services backed by certified technicians and quality guarantee',
    color: 'text-yellow-500',
    cardBg: 'bg-yellow-100/20',
    iconBg: 'bg-yellow-100/40',
    gradient: 'from-yellow-100/30 to-yellow-100/10',
    link: '/service/certified-excellence'
  }
];

const galleryImages = [
  'https://res.cloudinary.com/daebnxnfj/image/upload/v1757074752/cars/images/sp5dwktrddrajnlzup0t.jpg',
  'https://res.cloudinary.com/daebnxnfj/image/upload/v1757171028/We_are_the_best_in_Harare_Autocare_Car_Wash_fj6kmk.jpg',
  'https://res.cloudinary.com/daebnxnfj/image/upload/v1757171026/Introduction__Toyota_cars_are_renowned_for_their_whmcei.jpg',
  'https://res.cloudinary.com/daebnxnfj/image/upload/v1757171026/Nigeria_s_automotive_landscape_is_predominantly_rhlglv.jpg',
  'https://res.cloudinary.com/daebnxnfj/image/upload/v1757171026/Auto_Mechanic_in_Brampton___Harrad_Auto_Services_uvt4cx.jpg',
  'https://res.cloudinary.com/daebnxnfj/image/upload/v1757171026/El_l%C3%ADder_alem%C3%A1n_de_recambios_online_ahora_en_gm0oco.jpg',
  'https://res.cloudinary.com/daebnxnfj/image/upload/v1757171026/42b396ca-ecd5-4a8c-bbb5-589ee7bc16ad_wezfqa.jpg',
  'https://res.cloudinary.com/daebnxnfj/image/upload/v1757171026/El_l%C3%ADder_alem%C3%A1n_de_recambios_online_ahora_en_gm0oco.jpg'
];

export default function Services() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="bg-gray-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Professional Automotive Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert automotive services with certified technicians and premium quality parts
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="cursor-pointer relative"
              >
                <Link href={service.link} className="block">
                  <Card
                    className={`group hover:shadow-2xl transition-all duration-500 border-0 shadow-md h-[380px] flex flex-col ${service.cardBg} backdrop-blur-md relative overflow-hidden`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-b ${service.gradient} pointer-events-none rounded-lg`} />
                    <div className="absolute -left-64 top-0 w-64 h-full bg-gradient-to-r from-white/20 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 animate-shine pointer-events-none rounded-lg" />
                    <CardContent className="p-8 text-center flex flex-col justify-between h-full relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className={`w-16 h-16 ${service.iconBg} backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-lg transition-shadow duration-300`}
                      >
                        <IconComponent className={`h-8 w-8 ${service.color}`} />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300 mt-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-800 group-hover:text-gray-700 leading-relaxed mt-2">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Gallery Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Work in Action</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((url, idx) => (
              <div
                key={idx}
                className="relative h-48 rounded-xl overflow-hidden shadow-lg cursor-pointer"
                onClick={() => setSelectedImage(url)}
              >
                <Image
                  src={url}
                  alt={`Service Sample ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative w-full max-w-5xl h-[80vh] md:h-[80vh] lg:h-[80vh] rounded-lg shadow-2xl overflow-hidden">
                <Image
                  src={selectedImage}
                  alt="Selected Service"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </motion.div>

      </div>

      <Footer />

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-20deg); opacity: 0; }
          50% { transform: translateX(200%) skewX(-20deg); opacity: 0.25; }
          100% { transform: translateX(200%) skewX(-20deg); opacity: 0; }
        }
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
