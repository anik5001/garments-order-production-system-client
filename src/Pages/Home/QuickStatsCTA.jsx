// src/components/QuickStatsCTA.jsx
import React from "react";
import { Trophy, Users, ShoppingBag, Clock } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Products",
    value: "10k+",
    icon: <ShoppingBag className="w-6 h-6" />,
  },
  {
    label: "Orders Tracked",
    value: "32k+",
    icon: <Clock className="w-6 h-6" />,
  },
  { label: "Active Users", value: "8.4k", icon: <Users className="w-6 h-6" /> },
  {
    label: "On-time Delivery",
    value: "99%",
    icon: <Trophy className="w-6 h-6" />,
  },
];

const QuickStatsCTA = () => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:col-span-2">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="p-4 bg-white/10 rounded-lg flex flex-col items-start gap-2"
              >
                <div className="p-2 rounded bg-white/20">{s.icon}</div>
                <div className="text-xl font-bold">{s.value}</div>
                <div className="text-sm opacity-90">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-white text-blue-700 rounded-lg p-6 shadow-md lg:col-span-1">
            <h3 className="text-2xl font-bold mb-2">
              Ready to streamline production?
            </h3>
            <p className="text-sm mb-4">
              Sign up as a buyer to place orders or as a manager to add
              products.
            </p>

            <div className="flex gap-3">
              <a href="/register" className="btn btn-primary w-full">
                Get Started
              </a>
              <a href="/contact" className="btn btn-ghost w-full">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default QuickStatsCTA;
