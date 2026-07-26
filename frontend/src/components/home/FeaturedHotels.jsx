import React from 'react';
import { motion } from 'framer-motion';
import HotelCard from '../hotel/HotelCard';

const FeaturedHotels = () => {
  const kenyanHotels = [
    {
      id: 1,
      name: 'Maasai Mara Safari Lodge',
      location: 'Maasai Mara, Kenya',
      price: 350,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
      description: 'Experience the great wildebeest migration from our luxury safari lodge',
    },
    {
      id: 2,
      name: 'Diani Beach Resort & Spa',
      location: 'Diani Beach, Kenya',
      price: 250,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
      description: 'White sandy beaches and crystal clear waters of the Indian Ocean',
    },
    {
      id: 3,
      name: 'Nairobi Serena Hotel',
      location: 'Nairobi, Kenya',
      price: 280,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      description: 'Luxury hotel in the heart of Nairobi with breathtaking city views',
    },
    {
      id: 4,
      name: 'Lake Naivasha Sopa Resort',
      location: 'Naivasha, Kenya',
      price: 220,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
      description: 'Peaceful lakeside retreat surrounded by stunning wildlife',
    },
    {
      id: 5,
      name: 'Watamu Blue Bay Resort',
      location: 'Watamu, Kenya',
      price: 200,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
      description: 'Tropical paradise with stunning coral reefs and marine life',
    },
    {
      id: 6,
      name: 'Amboseli Serena Safari Lodge',
      location: 'Amboseli, Kenya',
      price: 320,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      description: 'Spectacular views of Mount Kilimanjaro with abundant wildlife',
    },
    {
      id: 7,
      name: 'Lamu Old Town Hotel',
      location: 'Lamu, Kenya',
      price: 190,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      description: 'Cultural heritage hotel in Kenya\'s oldest Swahili settlement',
    },
    {
      id: 8,
      name: 'Nakuru Lake View Resort',
      location: 'Nakuru, Kenya',
      price: 180,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      description: 'Overlooking Lake Nakuru with stunning flamingo views',
    },
    {
      id: 9,
      name: 'Malindi Ocean Resort',
      location: 'Malindi, Kenya',
      price: 230,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      description: 'Coastal paradise with Swahili architecture and ocean views',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-emerald-600">Kenyan Hotels</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover the best accommodations across Kenya's most beautiful destinations
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {kenyanHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedHotels;