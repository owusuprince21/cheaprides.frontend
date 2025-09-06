'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function VehicleTintingServicesPage() {
  const [comments, setComments] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleAddComment = () => {
    if (input.trim() === '') return;
    setComments([input, ...comments]);
    setInput('');
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Vehicle Tinting Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional window tinting, privacy films, and UV protection solutions for your vehicle.
          </p>
        </motion.div>

        {/* Content with Side Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Our Vehicle Tinting Services provide privacy, comfort, and protection for your car. 
              We use high-quality films that reduce glare, heat, and harmful UV rays while enhancing your car’s appearance.
            </p>
            <p>
              Whether you want standard window tinting, heat-reducing films, or premium privacy shades, our team ensures precise installation with a smooth, bubble-free finish.
            </p>
            <p>
              Tinting not only improves your vehicle's aesthetics but also protects your interior from sun damage and helps maintain a cooler cabin temperature.
            </p>
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl mt-4">
              Book Vehicle Tinting Service
            </Button>
          </div>

          <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://res.cloudinary.com/daebnxnfj/image/upload/v1757173900/FAQ_a3idhq.jpg"
              alt="Vehicle Tinting"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>

          {/* Comment Form */}
          <div className="flex flex-col space-y-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <Button onClick={handleAddComment} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg w-36">
              Submit Review
            </Button>
          </div>

          {/* Display Comments */}
          <div className="space-y-4 mt-6">
            {comments.length === 0 ? (
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            ) : (
              comments.map((comment, idx) => (
                <div key={idx} className="bg-white/20 backdrop-blur-md p-4 rounded-lg shadow-md">
                  <p className="text-gray-800">{comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
