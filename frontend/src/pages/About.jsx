import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 min-h-screen bg-white"
    >
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About <span className="text-emerald-600">StayNest</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Learn more about our story and mission
        </p>
      </div>
    </motion.div>
  );
};

export default About;