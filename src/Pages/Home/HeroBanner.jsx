import React, { useEffect, useState } from "react";
import { Link } from "react-router";
const slides = [
  {
    id: 1,
    title: "Premium Garments You Can Trust",
    text: "Order high-quality garments with professional production tracking and fast delivery.",
    btnText: "View Products",
    btnLink: "/products",
    image:
      "https://images.unsplash.com/photo-1520975698518-6a0a9d08b5c1?auto=format&fit=crop&w=1600&q=60",
  },
  {
    id: 2,
    title: "Track Orders in Real-Time",
    text: "Manage your garment production with live updates and instant tracking dashboards.",
    btnText: "Go to Dashboard",
    btnLink: "/dashboard",
    image:
      "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1600&q=60",
  },
  {
    id: 3,
    title: "Safe & Easy Payments",
    text: "Choose between Cash on Delivery or PayFast digital payment — secure and flexible.",
    btnText: "Start Ordering",
    btnLink: "/products",
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1600&q=60",
  },
];
const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out 
            ${index === current ? "opacity-100 z-20" : "opacity-0 z-0"}
          `}
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0.45),
                rgba(0, 0, 0, 0.55)
              ), url(${slide.image})`,
            }}
          />

          {/* Text Content */}
          <div className="relative z-30 flex flex-col items-center justify-center h-full text-center text-white px-6 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow">
              {slide.title}
            </h1>

            <p className="mt-4 text-base md:text-lg text-gray-200 leading-relaxed">
              {slide.text}
            </p>

            <Link
              to={slide.btnLink}
              className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold shadow-lg transition"
            >
              {slide.btnText}
            </Link>
          </div>
        </div>
      ))}

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? "bg-white w-6" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
