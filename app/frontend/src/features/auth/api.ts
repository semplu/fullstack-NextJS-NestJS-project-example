import { apiClient } from '@/shared/api/client';
import { AuthResponse } from '@/shared/api/types';
import axios from 'axios';

interface AuthError {
  message: string;
  statusCode: number;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw {
        message: error.response.data.message || 'Login failed',
        statusCode: error.response.status,
      } as AuthError;
    }
    throw new Error('An unexpected error occurred during login');
  }
};

export const register = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/register', { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw {
        message: error.response.data.message || 'Registration failed',
        statusCode: error.response.status,
      } as AuthError;
    }
    throw new Error('An unexpected error occurred during registration');
  }
};
