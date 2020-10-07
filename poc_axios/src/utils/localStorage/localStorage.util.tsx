import AsyncStorage from '@react-native-community/async-storage';
import { LoginResponse } from '../../driver/types';

export interface LocalStorage {
  setToken(token: LoginResponse): void;
  setUser(userEmail: string): void;
  getAccessToken(): Promise<string | null>;
  getRefreshToken(): Promise<string | null>;
  getUserEmail(): Promise<string | null>
  clearToken(): void;
}

class LocalStorageService implements LocalStorage {
  async setToken(token: LoginResponse) {
    await AsyncStorage.setItem('accessToken', token.accessToken);
    await AsyncStorage.setItem('refreshToken', token.refreshToken);
  }

  async setUser(userEmail: string) {
    await AsyncStorage.setItem('userEmail', userEmail);
  }

  async getAccessToken(): Promise<string | null> {
    return AsyncStorage.getItem('accessToken');
  }

  async getRefreshToken(): Promise<string | null> {
    return AsyncStorage.getItem('refreshToken');
  }

  async getUserEmail(): Promise<string | null> {
    return AsyncStorage.getItem('userEmail');
  }

  async clearToken() {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  }
}

export default LocalStorageService;
