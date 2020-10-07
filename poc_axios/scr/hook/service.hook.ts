import { Credentials, LoginResponse } from '../driver/types';
import { useCallback, useContext, useState } from 'react';
import Service from '../driver/driver';
import { AppContext } from '../context/appContext';
import { RouteTypes } from '../routes/routes';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import {
  default as LocalStorageService,
  LocalStorage,
} from '../utils/localStorage/localStorage.util';
import { logMessage } from '../utils/logger/logger';

const localStorage: LocalStorage = new LocalStorageService();

export type ServiceHook = {
  login: (credentials: Credentials) => Promise<LoginResponse | undefined>;
  getHealth: () => void;
  failRequest: () => void;
  failGetUser: () => void;
};

export const useService = (
  navigation: StackNavigationProp<any>,
): ServiceHook => {
  const appContext = useContext(AppContext);

  const authError = useCallback((status: number) => {
    if (status === 401) {
      console.error(
        logMessage('Service Hook Auth Error', 'Fail To refresh Token'),
      );
      console.info(
        logMessage(
          'Service Hook',
          'Set Auth, Clear LocalStorage and Navigate to login screen',
        ),
      );
      appContext.setAuth(false);
      localStorage.clearToken();
      navigation.navigate(RouteTypes.LOGIN);
    }
  }, []);

  const login = useCallback(async (credentials: Credentials) => {
    try {
      const response = await Service.login(credentials);
      appContext.setAuth(true);
      localStorage.setToken(response);
      return response;
    } catch (error) {
      console.error(logMessage('Service Hook Error', 'Login'));
    }
  }, []);

  const getHealth = useCallback(async () => {
    try {
      return await Service.getHealth();
    } catch (error) {
      console.error(logMessage('Service Hook Error', 'Health'));
    }
  }, []);

  const failRequest = useCallback(async () => {
    try {
      return await Service.failRequest();
    } catch (error) {
      console.error(logMessage('Service Hook Error', 'Fail Request'));
    }
  }, []);

  const failGetUser = useCallback(async () => {
    try {
      return await Service.failGetUser();
    } catch (error) {
      console.error(logMessage('Service Hook Error', 'Fail Get User Request'));
      authError(error.response.status);
    }
  }, []);

  return {
    login,
    getHealth,
    failRequest,
    failGetUser,
  };
};
