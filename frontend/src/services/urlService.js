import axios from 'axios';

const API_URL = 'http://localhost:8080/api/url';

export const urlService = {

  //API endpoint for shorten URL
  shortenUrl: async (originalUrl, expiresAt) => {
    try {
      const response = await axios.post(`${API_URL}/shorten`, {
        originalUrl,
        expiresAt,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to shorten URL');
    }
  },

  //API endpoint for get URL s
  getUrls: async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch URLs');
    }
  },

  //API endpoint for delete URL 
  deleteUrl: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete URL');
    }
  },
};
