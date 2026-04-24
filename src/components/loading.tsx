"use client";

import { motion } from "framer-motion";

// Reusable Spinner
const Spinner = () => (
  <div className="relative w-12 h-12">
    <div className="absolute inset-0 border-4 border-gray-300 rounded-full" />
    <div className="absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin" />
  </div>
);

// Optional subtle animated logo block
const Logo = () => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center"
  >
    <div className="relative w-20 h-20 mb-4">
      <div className="absolute inset-0 border-4 border-black rounded-xl" />

      {/* Accent stripes */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-0 left-0 h-2 bg-red-500 rounded-b-xl"
      />
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-2 left-0 h-2 bg-yellow-400"
      />
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-4 left-0 h-2 bg-cyan-400"
      />
    </div>

    <h1 className="text-2xl font-semibold tracking-widest text-gray-900">
      ZEEL FASHION
    </h1>
  </motion.div>
);

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      
      {/* Logo */}
      <Logo />

      {/* Spinner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Spinner />
      </motion.div>

      {/* Subtext */}
      
    </div>
  );
}