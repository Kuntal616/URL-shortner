import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add auth tokens here if needed
        // config.headers.Authorization = `Bearer ${token}`;
        console.log('Request sent:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Any status code that lies within the range of 2xx causes this function to trigger
        console.log('Response received:', response.status, response.config.url);
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx causes this function to trigger
        console.error('Response error:', error.response?.status, error.config?.url);
        
        // Handle different error scenarios
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;
            
            switch (status) {
                case 400:
                    console.error('Bad Request:', data.error || 'Invalid request');
                    break;
                case 401:
                    console.error('Unauthorized:', data.error || 'Authentication required');
                    // You could redirect to login here
                    break;
                case 403:
                    console.error('Forbidden:', data.error || 'Access denied');
                    break;
                case 404:
                    console.error('Not Found:', data.error || 'Resource not found');
                    break;
                case 500:
                    console.error('Server Error:', data.error || 'Internal server error');
                    break;
                default:
                    console.error('HTTP Error:', status, data.error || 'Unknown error');
            }
        } else if (error.request) {
            // Request was made but no response received (network error)
            console.error('Network Error: No response from server');
        } else {
            // Something else happened
            console.error('Request Setup Error:', error.message);
        }
        
        return Promise.reject(error);
    }
);
export default axiosInstance;
