import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaHeadset, 
  FaGem, 
  FaMoneyBillWave 
} from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaMoneyBillWave,
      title: 'Best Prices',
      description: 'Get the best rates with our price match guarantee. No hidden fees, just the best deals.',
      color: 'from-emerald-400 to-emerald-500',
    },
    {
      icon: FaShieldAlt,
      title: 'Secure Booking',
      description: 'Your payments and personal information are protected with enterprise-grade security.',
      color: 'from-blue-400 to-blue-500',
    },
    {
      icon: FaHeadset,
      title: '24/7 Support',
      description: 'Our dedicated team is always ready to assist you with any queries or concerns.',
      color: 'from-purple-400 to-purple-500',
    },
    {
      icon: FaGem,
      title: 'Luxury Experience',
      description: 'Handpicked luxury hotels with premium amenities and exceptional service.',
      color: 'from-amber-400 to-yellow-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-emerald-600">StayNest</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience the difference with our premium services
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;