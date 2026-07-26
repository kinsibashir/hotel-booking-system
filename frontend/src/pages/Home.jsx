
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import FeaturedHotels from '../components/home/FeaturedHotels';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <FeaturedHotels />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </motion.div>
  );
};

export default Home;