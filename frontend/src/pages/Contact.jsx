import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 min-h-screen bg-gray-50"
    >
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Contact <span className="text-emerald-600">Us</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Get in touch with our team
        </p>
      </div>
    </motion.div>
  );
};

export default Contact;