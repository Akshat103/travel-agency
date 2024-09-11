import apiClient from './api';

export const apiHandler = async (method, url, data = {}, config = {}) => {
  try {
    const response = await apiClient({
      method,
      url,
      data,
      ...config,
    });
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
