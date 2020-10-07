/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import { Routes } from './src/routes';
import {AppContext, AuthContextAction} from './src/context/appContext'
import {default as LocalStorageService, LocalStorage} from "./src/utils/localStorage/localStorage.util";

const App: React.FC = () => {

  const [isAuth, setAuth] = useState<boolean>(undefined!);
  const [isRefreshTokenValid, setRefreshTokenValid] = useState<boolean>(undefined!);
  const [user, setUser] = useState<AuthContextAction>(undefined!);
  const localStorage: LocalStorage = new LocalStorageService();

  useEffect(() => {
    const initialParams = async (): Promise<void> => {
      const userEmail = await localStorage.getUserEmail();
      const accessToken = await localStorage.getAccessToken();
      const refreshToken = await localStorage.getRefreshToken();

      setUser({
        userEmail: userEmail || '',
        accessToken: accessToken || '',
        refreshToken: refreshToken || ''
      });
      setAuth(!!accessToken);
      setRefreshTokenValid(true);
    };
    initialParams();
  }, []);

  return (
    <>
      <AppContext.Provider value={{
        isAuth,
        setAuth,
        isRefreshTokenValid,
        setRefreshTokenValid,
        user,
        setUser
      }}>
        <Routes />
      </AppContext.Provider>
    </>
  );
};


export default App;
