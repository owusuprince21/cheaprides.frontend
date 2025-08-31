'use client'
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/Footer"; // assuming you have this already
import LeadershipSection from "./team/page"; // Import the leadership section

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-4"
        >
          About Us
        </motion.h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          At CheapRides Ghana, we believe everyone deserves access to affordable, 
          reliable, and quality vehicles. Our mission is to make car ownership 
          simple and transparent for every Ghanaian.
        </p>
      </section>

      {/* 2. Our Pledge */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Pledge to You</h2>
          <p className="mb-3">
            Our mission is to provide affordable vehicles while ensuring 
            trust, transparency, and convenience. 
          </p>
          <p>
            Our vision is to become Ghana’s most trusted car marketplace, 
            connecting people to cars they love at prices they can afford.
          </p>
        </div>
        <div className="relative h-64 md:h-96">
          <Image
            src="https://res.cloudinary.com/daebnxnfj/image/upload/v1756659740/Q8_aef1sd.jpg"
            alt="Our Mission"

            fill
            className="object-contain rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* 3. Our Values */}
      <section className="bg-gray-100 py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-3">Trust</h3>
            <p>
              We put honesty and transparency at the heart of every deal.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-3">Affordability</h3>
            <p>
              Cars priced fairly so every Ghanaian can own one without stress.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-3">Customer Care</h3>
            <p>
              Your satisfaction drives us — before, during, and after purchase.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Our Leaders */}
        <LeadershipSection />

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
