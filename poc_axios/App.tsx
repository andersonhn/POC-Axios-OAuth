/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import { Routes } from './scr/routes/routes';
import {AppContext, AppContextAction} from './scr/context/appContext'

const App: React.FC = () => {

  const [isAuth, setAuth] = useState<boolean>(undefined!);

  useEffect(() => {
    setAuth(false);
  }, []);

  return (
    <>
      <AppContext.Provider value={{
        isAuth,
        setAuth
      }}>
        <Routes />
      </AppContext.Provider>
    </>
  );
};


export default App;
