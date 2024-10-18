import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../api/axiosInstance';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: Object | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  refreshTokens: (accessToken: string) => void;
  clearTokens: () => void;
  fetchUserProfile: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  setTokens: (accessToken, refreshToken) => {
    AsyncStorage.setItem('accessToken', accessToken);
    AsyncStorage.setItem('refreshToken', refreshToken);
    set({ accessToken, refreshToken });
  },
  refreshTokens: async (accessToken) => {
    AsyncStorage.setItem('accessToken', accessToken);
    set({ accessToken });
  },
  clearTokens: () => {
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('refreshToken');
    set({ accessToken: null, refreshToken: null });
  },
  fetchUserProfile: async () => {
    try {
      const response = await axiosInstance.get('/auth/me'); // DummyJSON user endpoint
      set({user: response.data});
    } catch (error) {
      console.error(error);
    }
  }
}));
