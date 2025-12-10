// src/components/WhyChooseUs.jsx
import React from "react";
import { Factory, ClipboardCheck, ChartLine, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Real-Time Production Tracking",
    text: "Monitor cutting, sewing, finishing, and shipment updates instantly with a dynamic dashboard.",
    icon: <Factory className="w-6 h-6" />,
  },
  {
    title: "Error-Free Order Management",
    text: "Automated validation ensures correct quantities, minimum order rules, and prevents mistakes.",
    icon: <ClipboardCheck className="w-6 h-6" />,
  },
  {
    title: "Data Insights & Reports",
    text: "Generate order history, production progress, delivery status, and performance analytics.",
    icon: <ChartLine className="w-6 h-6" />,
  },
  {
    title: "Secure & Role-Based Access",
    text: "Protected routes with JWT. Separate permissions for Admin, Manager, and Customer.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Why Choose Garments Tracker?
        </h2>

        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          A complete digital solution for Garments Order & Production — designed
          for accuracy, transparency, and efficiency.
        </p>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-md border flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                {c.icon}
              </div>

              <h3 className="font-semibold">{c.title}</h3>

              <p className="text-sm text-gray-600 flex-1">{c.text}</p>

              <div className="text-xs text-gray-400">
                Garments Industry Standard
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
