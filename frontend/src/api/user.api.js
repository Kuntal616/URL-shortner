import axiosInstance from "../utils/axiosInstance";
export const loginUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('/api/user/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
} 
export const registerUser = async (name, email, password) => {
    try {
        const response = await axiosInstance.post('/api/user/register', { name, email, password });
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        const response = await axiosInstance.get('/api/user/logout');
        return response.data;
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('/api/user/me');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch current user:', error);
        throw error;
    }
}

export const getUserUrls = async () => {
    try {
        const response = await axiosInstance.get('/api/user/urls');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user URLs:', error);
        throw error;
    }
}