import Axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import LocalStorageService, {LocalStorage} from '../utils/localStorage/localStorage.util';
import {Credentials, LoginResponse} from "./types";

const localStorage: LocalStorage = new LocalStorageService();

const BASE_URL =
  'http://192.168.21.45:3000/bff/';

const defaultConfig: CustomerBffDriverConfig = {
  httpClient: Axios.create({
    baseURL: BASE_URL,
  }),
};

export interface CustomerBffDriverConfig {
  httpClient: AxiosInstance;
}

export interface CustomerBffDriver {
  getHealth(): Promise<any>;
  login(credentials: Credentials): Promise<LoginResponse>;
  failRequest(): Promise<any>;
  refreshToken(refreshToken: string): Promise<LoginResponse>;
  refreshTokenInvalid(refreshToken: string): Promise<LoginResponse>;
}

export class CustomerBffDriverDefault implements CustomerBffDriver {
  public constructor(private config: CustomerBffDriverConfig = defaultConfig) {
    config.httpClient.interceptors.request.use(
      async (config) => {
        console.log(config.url);
        if (config.url !== '/login') {
          const token = await localStorage.getAccessToken();
          config.headers = {
            'Authorization': `Bearer ${token}`,
          };
        }
        return config;
      },
      (error) => {
        Promise.reject(error)
      }
    );

    config.httpClient.interceptors.response.use(
      (response) => {
        return response
      }, async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && originalRequest.url === 'http://192.168.21.45:3000/bff/auth/refreshToken') {
          // router
        }

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getRefreshToken();
          console.log('refreshToken', refreshToken);
          return config.httpClient.post('/auth/refreshToken',{
            refresh_token: refreshToken
          }).then((res: AxiosResponse) => {
            console.log('login', refreshToken);
            if (res.status === 201) {
              localStorage.setToken(res.data);
              config.httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getAccessToken();
              return config.httpClient(originalRequest);
            }
          })
        }
        return Promise.reject(error);
      }
    );
  }

  async getHealth(): Promise<any> {
    return await this.config.httpClient.get(
      '/health'
    ).then((response: any) => response.data);
  }

  async login(credentials: Credentials): Promise<LoginResponse> {
    return await this.config.httpClient
      .post('/login', credentials)
      .then((response: any) => response.data);
  }

  async failRequest(): Promise<any> {
    return await this.config.httpClient
      .post('/failRequest')
      .then((response: any) => response.data);
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    return await this.config.httpClient
      .post('/refreshToken', refreshToken)
      .then((response: any) => response.data);
  }

  async refreshTokenInvalid(refreshToken: string): Promise<LoginResponse> {
    return await this.config.httpClient
      .post('/refreshTokenInvalid', refreshToken)
      .then((response: any) => response.data);
  }
}
