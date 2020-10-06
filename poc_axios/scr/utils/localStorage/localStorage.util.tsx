import {AsyncStorage} from "react-native";
import {LoginResponse} from "../../driver/types";

export interface LocalStorage {
  setToken(token: LoginResponse): void;
  getAccessToken(): Promise<string | null>;
  getRefreshToken(): Promise<string | null>;
  clearToken(): void;
}

class LocalStorageService implements LocalStorage {

  async setToken(token: LoginResponse) {
    await AsyncStorage.setItem('access_token', token.accessToken);
    await AsyncStorage.setItem('refresh_token', token.refreshToken);
  }

  async getAccessToken(): Promise<string | null> {
    return AsyncStorage.getItem('access_token');
  }

  async getRefreshToken(): Promise<string | null>  {
    return AsyncStorage.getItem('refresh_token');
  }

  async clearToken() {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
  }
}

export default LocalStorageService;
