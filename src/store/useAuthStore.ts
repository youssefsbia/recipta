import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  refreshTokens: (accessToken: string) => void;
  clearTokens: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
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
}));
