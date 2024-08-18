import axiosInstance from '../axios/index';
import { Credentials } from '../interfaces/user';

export const authLogin = async (credentials: Credentials) => {
  try {
    const response = await axiosInstance.post('auth/login',
      credentials
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};
