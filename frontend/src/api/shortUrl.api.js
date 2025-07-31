import axiosInstance from '../utils/axiosInstance';

export const createShortUrl = async (url, customShortId) => {
  try {
    const payload = { url };

    // Add custom short ID if provided
    if (customShortId && customShortId.trim() !== '') {
      payload.customShortId = customShortId.trim();
    }
    console.log("Payload for creating short URL:", payload);

    const response = await axiosInstance.post('api/shorturl', payload);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Something went wrong. Please try again.'
    };
  }
};