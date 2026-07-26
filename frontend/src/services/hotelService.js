import api from './api';

export const hotelService = {

  // Get all hotels
  getHotels: async (params = {}) => {
    try {
      const response = await api.get('/hotels/', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || {
        message: 'Failed to fetch hotels'
      };
    }
  },


  // Get single hotel
  getHotel: async (id) => {
    try {
      const response = await api.get(`/hotels/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || {
        message: 'Hotel not found'
      };
    }
  },


  // Create hotel (admin later)
  createHotel: async (hotelData) => {
    try {
      const response = await api.post('/hotels/', hotelData);
      return response.data;
    } catch (error) {
      throw error.response?.data || {
        message: 'Failed to create hotel'
      };
    }
  },


  // Update hotel (admin later)
  updateHotel: async (id, hotelData) => {
    try {
      const response = await api.put(`/hotels/${id}`, hotelData);
      return response.data;
    } catch (error) {
      throw error.response?.data || {
        message: 'Failed to update hotel'
      };
    }
  },


  // Delete hotel (admin later)
  deleteHotel: async (id) => {
    try {
      const response = await api.delete(`/hotels/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || {
        message: 'Failed to delete hotel'
      };
    }
  }

};