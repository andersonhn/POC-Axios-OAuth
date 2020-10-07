import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import React from 'react';
import LocalStorageService, {
  LocalStorage,
} from '../utils/localStorage/localStorage.util';
import { Credentials, LoginResponse } from './types';
import { logMessage } from '../utils/logger/logger';

const localStorage: LocalStorage = new LocalStorageService();

const BASE_URL = 'http://192.168.21.59:3000/bff/'; // LocalHost IP

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
  failGetUser(): Promise<any>;
  refreshToken(refreshToken: string): Promise<LoginResponse>;
  refreshTokenInvalid(refreshToken: string): Promise<LoginResponse>;
}

class CustomerBffDriverDefault implements CustomerBffDriver {
  public constructor(private config: CustomerBffDriverConfig = defaultConfig) {
    config.httpClient.interceptors.request.use(
      async (config) => {
        console.debug(
          logMessage(
            'Driver Axios Request Interceptor',
            'Request Url',
            config.url,
          ),
        );
        if (
          config.url !== '/login' &&
          config.url !== '/refreshToken' &&
          config.url !== '/refreshTokenInvalid'
        ) {
          const token = await localStorage.getAccessToken();
          console.debug(
            logMessage(
              'Driver Axios Request Interceptor',
              'add Token in Header',
              token,
            ),
          );
          config.headers = {
            Authorization: `Bearer ${token}`,
          };
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );

    config.httpClient.interceptors.response.use(
      (response) => {
        console.debug(
          logMessage(
            'Driver Axios Response Interceptor',
            'Response Fulfilled',
            response,
          ),
        );
        return response;
      },
      async function (error) {
        const originalRequest = error.config;
        console.debug(
          logMessage('Driver Axios Response Interceptor', 'Response Rejected', {
            status: error.response.status,
            url: originalRequest.url,
          }),
        );

        if (
          error.response.status === 401 &&
          (originalRequest.url === '/refreshToken' ||
            originalRequest.url === '/refreshTokenInvalid')
        ) {
          console.debug(
            logMessage(
              'Driver Axios Response Interceptor',
              'Refresh Token Rejected',
            ),
          );
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = await localStorage.getRefreshToken();
          console.debug(
            logMessage(
              'Driver Axios Response Interceptor',
              'Get Refresh Token',
              refreshToken,
            ),
          );

          if (originalRequest.url === '/failRequest') {
            return config.httpClient
              .post('/refreshToken', { refreshToken: refreshToken })
              .then((res: AxiosResponse) => {
                console.debug(
                  logMessage(
                    'Driver Axios Response Interceptor',
                    'Refresh Token Fulfilled',
                    res,
                  ),
                );
                if (res.status === 201) {
                  localStorage.setToken(res.data);
                  defaultConfig.httpClient.defaults.headers.common[
                    'Authorization'
                  ] = 'Bearer ' + localStorage.getAccessToken();
                  return config.httpClient(originalRequest);
                }
              });
          } else {
            console.debug(
              logMessage(
                'Driver Axios Response Interceptor',
                'Refresh Invalid Token',
              ),
            );
            return config.httpClient.post('/refreshTokenInvalid', {
              refreshToken: refreshToken,
            });
          }
        } else {
          console.debug(
            logMessage(
              'Driver Axios Response Interceptor',
              'Double Fail Request',
            ),
          );
        }
        return Promise.reject(error);
      },
    );
  }

  async getHealth(): Promise<any> {
    return await this.config.httpClient
      .get('/health')
      .then((response: any) => response.data);
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

  async failGetUser(): Promise<any> {
    return await this.config.httpClient
      .post('/failGetUser')
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

export default new CustomerBffDriverDefault();
