import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../store/useAuthStore';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    if (error.response.status === 401 && refreshToken) {
      const response = await axiosInstance.post('/auth/refresh', {
        refreshToken,
      });
      const {accessToken} = response.data;
      const refreshTokens = useAuthStore((state) => state.refreshTokens);
      refreshTokens(accessToken);
      useAuthStore.getState().clearTokens();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
