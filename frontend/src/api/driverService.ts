// src/services/driverService.js
import apiMethods from './api';

export const verifyDriver = async (phoneNumber, password) => {
  try {
    const response = await apiMethods.post('/api/verify-driver', { phoneNumber, password });
    return response;
  } catch (error) {
    throw new Error(error.message || 'Failed to verify driver');
  }
};
