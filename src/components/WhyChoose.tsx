'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, CreditCard, Shield, Truck, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [

  {
    icon: Wrench,
    title: 'Expert Service',
    description: 'Certified technicians for all maintenance needs',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {

  {
    icon: Clock,
    title: 'Reliable Support',
    description: 'Round-the-clock customer assistance',
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description: 'Rigorous 150-point inspection on every vehicle',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose CheapRides Gh
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We go above and beyond to ensure your car buying experience is exceptional
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all duration-500 border-0 shadow-md bg-white h-full">
                  <CardContent className="p-8 text-center space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-lg transition-shadow duration-300`}
                    >
                      <IconComponent className={`h-8 w-8 ${service.color}`} />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
          >
            Learn More About Our Services
          </Button>
        </motion.div>
      </div>
    </section>
  );
}