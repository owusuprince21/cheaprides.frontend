'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function AutoSprayingPage() {
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
            Auto Spraying
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert paint jobs, color matching, and protective coating applications for your vehicle.
          </p>
        </motion.div>

        {/* Content with Side Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Our Auto Spraying service ensures your car gets a flawless finish every time. 
              Whether it’s a full repaint, touch-up, or color customization, our team uses high-quality paints and advanced spraying techniques.
            </p>
            <p>
              We carefully prepare each surface, apply multiple layers for durability, and finish with polishing and protective coatings. 
              This guarantees long-lasting shine and protection against wear, weather, and UV damage.
            </p>
            <p>
              Auto Spraying is ideal for restoring older vehicles, personalizing new cars, or repairing damage from accidents. 
              Our experienced technicians ensure a smooth, even, and visually stunning result.
            </p>
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl mt-4">
              Book Auto Spraying Service
            </Button>
          </div>

          <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://res.cloudinary.com/daebnxnfj/image/upload/v1757174091/003428c8-edce-4099-9e66-7dedade93afc_kpke9n.jpg"
              alt="Auto Spraying"
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
