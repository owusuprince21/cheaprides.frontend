"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"

const leaders = [
  {
    id: "enoch",
    name: "Enoch Nii Cheiku Armah",
    role: "Founder & CEO",
    image:
      "https://res.cloudinary.com/daebnxnfj/image/upload/v1756682513/WhatsApp_Image_2025-08-31_at_22.40.35_63d0cdf8_kfkxej.jpg",
    bio: "Enoch has over 10 years of experience in leadership and management. He has been pivotal in driving strategic initiatives at Cheaprides Ghana.",
  },
  {
    id: "gabriel",
    name: "Gabriel Antwi Asempa",
    role: "Managing Director ",
    image:
      "https://res.cloudinary.com/daebnxnfj/image/upload/v1756658708/download_biv7wp.jpg",
    bio: "Gabriel drives strategy and execution for Cheaprides Ghana. His leadership has shaped the company into a trusted mobility provider.",
  },
  {
    id: "adwoa",
    name: "Adwoa Adepa Mensah",
    role: "Associate Director",
    image:
      "https://res.cloudinary.com/daebnxnfj/image/upload/v1756658708/download_1_kbgb7k.jpg",
    bio: "Adwoa oversees company growth and innovation initiatives. His mission is to transform transport accessibility in Ghana.",
  },
]

export default function LeadershipSection() {
  const [selectedLeader, setSelectedLeader] = useState<any>(null)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-purple-900 mb-12"
        >
          Our Team
        </motion.h2>

        {/* Leader Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => setSelectedLeader(leader)}
              className="cursor-pointer"
            >
              <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-100">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/30 text-white p-4 text-left">
                    <h3 className="text-lg font-semibold">{leader.name}</h3>
                    <p className="text-sm">{leader.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedLeader && (
        <div
          className="fixed inset-0 flex items-start justify-center bg-black/50 z-50"
          onClick={() => setSelectedLeader(null)} // click outside closes modal
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative mt-20"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedLeader(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X className="h-7 w-7" /> {/* bigger on mobile */}
            </button>

            <div className="flex flex-col items-center">
              <div className="w-32 h-32 relative rounded-full overflow-hidden mb-4">
                <Image
                  src={selectedLeader.image}
                  alt={selectedLeader.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-purple-900">
                {selectedLeader.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{selectedLeader.role}</p>
              <p className="text-gray-700 text-center">{selectedLeader.bio}</p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}
