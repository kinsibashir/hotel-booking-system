import api from './api';

export const reviewService = {
  // Create review
  createReview: async (reviewData) => {
    try {
      const response = await api.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create review' };
    }
  },

  // Get hotel reviews
  getHotelReviews: async (hotelId) => {
    try {
      const response = await api.get(`/reviews/hotel/${hotelId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch reviews' };
    }
  },

  // Update review
  updateReview: async (id, reviewData) => {
    try {
      const response = await api.put(`/reviews/${id}`, reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update review' };
    }
  },

  // Delete review
  deleteReview: async (id) => {
    try {
      const response = await api.delete(`/reviews/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete review' };
    }
  },

  // Mark review as helpful
  markHelpful: async (id) => {
    try {
      const response = await api.post(`/reviews/${id}/helpful`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to mark as helpful' };
    }
  },
};