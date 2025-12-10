import React from "react";
import { CheckCircle, Package, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Place Order",
    desc: "Buyer selects product, confirms quantity (MOQ enforced) and places an order.",
    icon: <CheckCircle className="w-8 h-8" />,
  },
  {
    id: 2,
    title: "Production Stages",
    desc: "Order moves through Cutting → Sewing → Finishing. Managers update production status in real-time.",
    icon: <Package className="w-8 h-8" />,
  },
  {
    id: 3,
    title: "Quality Check",
    desc: "Finished goods pass QC checks and are approved for packing and dispatch.",
    icon: <Clock className="w-8 h-8" />,
  },
  {
    id: 4,
    title: "Delivery & Tracking",
    desc: "Orders are shipped. Buyers track order status and timeline from their dashboard.",
    icon: <MapPin className="w-8 h-8" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Simple, transparent flow — from order placement to delivery. Each step
          is tracked and time-stamped.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              viewport={{ once: true }}
              className="p-6 border rounded-xl shadow-sm bg-gray-50 flex flex-col items-start gap-4"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600 text-white">
                {s.icon}
              </div>

              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.desc}</p>

              <span className="mt-auto text-xs text-gray-400">Step {s.id}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
