import { Credentials, LoginResponse } from '../driver/types';
import { useCallback } from 'react';
import Service from '../driver/driver';
import { RouteTypes } from '../routes';
import { logMessage } from '../utils/logger/logger';
import {useAppContext} from "./context.hook";

export type ServiceHook = {
  login: (credentials: Credentials) => Promise<LoginResponse | undefined>;
  getHealth: () => void;
  failRequest: () => void;
  failGetUser: () => void;
};

export const useService = (): ServiceHook => {
  const {signOut, signIn} = useAppContext();

  const authError = useCallback((status: number) => {
    if (status === 401) {
      console.error(
        logMessage('Service Hook Auth Error', 'Fail To refresh Token'),
      );
      console.info(
        logMessage(
          'Service Hook',
          'Set Auth and Clear LocalStorage',
        ),
      );
      signOut(true);
    }
  }, []);

  const login = useCallback(async (credentials: Credentials) => {
    try {
      const response = await Service.login(credentials);
      signIn(credentials, response);
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
