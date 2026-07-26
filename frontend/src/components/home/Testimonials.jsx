import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  // TODO: Replace with real customer data from your database
  const testimonials = [
    // Add your real customer testimonials here
    // Example:
    // {
    //   id: 1,
    //   name: 'Real Customer Name',
    //   role: 'Guest from Nairobi',
    //   content: 'Their real feedback about their stay...',
    //   image: 'URL_TO_CUSTOMER_IMAGE',
    // },
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
            What Our <span className="text-emerald-600">Guests Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Real experiences from real travelers
          </p>
        </motion.div>

        {testimonials.length === 0 ? (
          // Empty state - show when no testimonials available
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-card">
              <FaQuoteLeft className="text-emerald-200 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Testimonials Yet
              </h3>
              <p className="text-gray-600">
                Be the first to share your experience with StayNest!
              </p>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Share Your Experience
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-8 shadow-card relative"
              >
                <FaQuoteLeft className="text-emerald-200 text-4xl absolute top-4 right-4" />
                
                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 mt-4">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-100"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Admin note - only visible in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-center mt-8 text-sm text-gray-400 bg-white/50 p-4 rounded-xl max-w-md mx-auto">
            <p className="font-semibold text-gray-600">📝 Admin Note</p>
            <p>Add real testimonials in <code className="bg-gray-100 px-2 py-1 rounded">src/components/home/Testimonials.jsx</code></p>
            <p className="text-xs mt-1">Remove this note when you have real data</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;