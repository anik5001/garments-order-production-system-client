import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, TechCorp",
    feedback:
      "Amazing service! The UI/UX quality is excellent and performance is super smooth.",
    rating: 5,
  },
  {
    name: "Sarah Khan",
    role: "Marketing Manager",
    feedback:
      "The project delivery was on time and the communication was very clear. Loved working with you!",
    rating: 4,
  },
  {
    name: "Michael Smith",
    role: "Entrepreneur",
    feedback:
      "Highly recommended! Clean code, modern design, and very professional.",
    rating: 5,
  },
];

const CustomerFeedback = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          className="py-10"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 shadow-xl rounded-2xl mx-6 border border-gray-200"
              >
                {/* Rating Stars */}
                <div className="flex justify-center mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500" />
                  ))}
                </div>

                <p className="text-gray-700 italic mb-6">"{item.feedback}"</p>

                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.role}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerFeedback;
