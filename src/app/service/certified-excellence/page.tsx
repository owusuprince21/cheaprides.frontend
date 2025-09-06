'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';

export default function CertifiedExcellence() {
  const [comments, setComments] = useState<string[]>([]);
  const [commentInput, setCommentInput] = useState('');

  const handleAddComment = () => {
    if (commentInput.trim() !== '') {
      setComments([...comments, commentInput]);
      setCommentInput('');
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Certified Excellence</h1>
            <p className="text-gray-700 leading-relaxed">
              At CheapRides Gh, all our services are backed by certified technicians and a commitment to quality. Our Certified Excellence ensures your vehicle receives top-tier care and professional attention.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether it's body repair, auto spraying, or premium spare parts installation, our certified team guarantees that every job is done with precision and reliability.
            </p>
            {/* <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl"
            >
              Book Service Appointment
            </Button> */}
          </div>
          <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://res.cloudinary.com/daebnxnfj/image/upload/v1757175239/d06e7554-0bf5-4d55-9f81-674681e345d4_bibw5g.jpg"
              alt="Certified Excellence"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Blog / Detailed Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Why Certified Excellence Matters</h2>
          <p className="text-gray-700 leading-relaxed">
            Certified Excellence is more than a label — it’s a promise. Our certified technicians are trained to handle every aspect of automotive care. From diagnostics to final polish, your vehicle is in safe hands.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our processes follow industry standards to ensure your car maintains its value, aesthetics, and performance. Every task is double-checked and approved by certified professionals.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Customer satisfaction is our top priority. We ensure transparency, reliability, and premium quality in every service we offer.
          </p>
        </div>

        {/* Review / Comments Section */}
        {/* <div className="space-y-6">
          <h3 className="text-3xl font-bold text-gray-900">Customer Reviews</h3> */}

          {/* Comment Input */}
          {/* <div className="flex flex-col md:flex-row gap-4">
            <textarea
              className="flex-1 p-4 border rounded-lg resize-none"
              rows={3}
              placeholder="Share your experience..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <Button onClick={handleAddComment} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg">
              Add Comment
            </Button>
          </div> */}

          {/* Comments List */}
          {/* <div className="space-y-4">
            {comments.length === 0 && <p className="text-gray-500">No comments yet. Be the first to share your experience!</p>}
            {comments.map((comment, idx) => (
              <Card key={idx} className="p-4 bg-white/10 backdrop-blur-md border-0 shadow-md">
                <p className="text-gray-800">{comment}</p>
              </Card>
            ))}
          </div> */}
        {/* </div> */}
      </div>

      <Footer />
    </section>
  );
}
