import {Credentials, LoginResponse} from "../driver/types";
import {useCallback, useContext, useState} from "react";
import Service from "../driver/driver";
import {AppContext} from "../context/appContext";
import {RouteTypes} from "../routes/routes";
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {default as LocalStorageService, LocalStorage} from "../utils/localStorage/localStorage.util";

const localStorage: LocalStorage = new LocalStorageService();

export type ServiceHook = {
  login: (credentials: Credentials) => Promise<LoginResponse | undefined>;
  getHealth: () => void;
  failRequest: () => void;
  failGetUser: () => void;
}

export const useService = ( navigation: StackNavigationProp<any> ): ServiceHook => {

  const appContext = useContext(AppContext);

  const authError = useCallback(() => {
    console.info('set Auth To false');
    appContext.setAuth(false);
    console.info('clear localStorage');
    localStorage.clearToken();
    console.info('navigate to login');
    navigation.navigate(RouteTypes.LOGIN);
  }, []);

  const login = useCallback(async (credentials: Credentials) => {
    try {
      return await Service.login(credentials);
    } catch (error) {
      console.error('hook login error', error);
    }
  }, []);

  const getHealth = useCallback(async () => {
    try {
      return await Service.getHealth();
    } catch (error) {
      console.error('hook getHealth error', error);
    }
  }, []);

  const failRequest = useCallback(async () => {
    try {
      return await Service.failRequest();
    } catch (error) {
      console.error('hook failRequest error', error);
    }
  }, []);

  const failGetUser = useCallback(async () => {
    try {
      return await Service.failGetUser();
    } catch (error) {
      console.error('hook failGetUser error', error.response);
      if (error.response.status === 401) {
        console.info('authError');
        authError();
      }
    }
  }, []);


  return {
    login,
    getHealth,
    failRequest,
    failGetUser
  }

};
