import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    toast.error('Request error. Please try again.');
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    toast.success('Request successful!');
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        toast.error(data.message || 'Unauthorized access. Please login.');
        window.location.href = data.redirect || '/login';
      } else if (status >= 400 && status < 500) {
        toast.warn(data.message || 'Something went wrong. Please try again.');
      } else if (status >= 500) {
        toast.error('Server error. Please try again later.');
      }
    } else {
      toast.error('Network error. Please check your connection.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
