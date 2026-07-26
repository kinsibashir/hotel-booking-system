import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import toast from 'react-hot-toast';
import authService from "../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);

      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...userData } = formData;

      console.log("Register data:", userData);

      await authService.register(userData);

      toast.success('Registration successful! Welcome to StayNest!');

      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl"
      >

        <h2 className="text-center text-3xl font-bold text-gray-900">
          Create Account
        </h2>

        <p className="text-center text-gray-600 mt-2">
          Join StayNest and start booking hotels
        </p>


        <form onSubmit={handleSubmit} className="mt-8 space-y-5">


          {/* First Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              First Name
            </label>

            <div className="relative mt-1">
              <FaUser className="absolute left-3 top-3 text-gray-400"/>

              <input
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>



          {/* Last Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Last Name
            </label>

            <div className="relative mt-1">
              <FaUser className="absolute left-3 top-3 text-gray-400"/>

              <input
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>



          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="relative mt-1">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400"/>

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>



          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>

            <div className="relative mt-1">
              <FaPhone className="absolute left-3 top-3 text-gray-400"/>

              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>



          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-3 text-gray-400"/>

              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>



          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-3 text-gray-400"/>

              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>



          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-xl"
          >

            {loading ? "Creating account..." : "Create Account"}

          </motion.button>



          <p className="text-center text-sm text-gray-600">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-emerald-600 font-medium"
            >
              Sign in
            </Link>

          </p>


        </form>

      </motion.div>

    </div>
  );
};


export default Register;