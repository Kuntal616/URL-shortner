import axiosInstance from "../utils/axiosInstance";

// Create short URL
export const createShortUrl = async (url) => {
  try {
    const response = await axiosInstance.post("/api/shorturl", { url });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Something went wrong. Please try again.'
    };
  }
};