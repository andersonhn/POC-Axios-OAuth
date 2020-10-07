import React, { Dispatch, SetStateAction } from 'react';

export type AuthContextAction = {
  userEmail?: string;
  accessToken?: string;
  refreshToken?: string;
};

export type AppContextAction = {
  user?: AuthContextAction;
  setUser: Dispatch<SetStateAction<AuthContextAction>>;
  isAuth?: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
  isRefreshTokenValid?: boolean;
  setRefreshTokenValid: Dispatch<SetStateAction<boolean>>;
};

interface AppContextInterface extends AppContextAction {}

export const AppContext = React.createContext<AppContextInterface>({
  setAuth: () => {},
  isAuth: undefined,
  isRefreshTokenValid: undefined,
  setRefreshTokenValid: () => {},
  user: undefined,
  setUser: () => {},
});
