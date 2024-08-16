import axiosInstance from '../axios/index';
import { Credentials } from '../interfaces/user';

export const authLogin = async (credentials: Credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login',
      credentials
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
