import {useContext} from "react";
import {AppContext, AppContextAction} from "../context/appContext";
import {Credentials, LoginResponse} from "../driver/types";
import LocalStorageService, {LocalStorage} from "../utils/localStorage/localStorage.util";

export type AppContextHook = {
  context: AppContextAction;
  localStorage: LocalStorage;
  signIn(user: Credentials, token: LoginResponse): void;
  signOut(RefreshTokenInvalid?: boolean): void;
};

export const useAppContext = (): AppContextHook => {
  const context = useContext(AppContext);
  const localStorage = new LocalStorageService();

  const signIn = (user: Credentials, token: LoginResponse) => {
    context.setAuth(true);
    context.setUser({accessToken: token.accessToken, refreshToken: token.refreshToken, userEmail: user.username});
    localStorage.setToken(token);
    localStorage.setUser(user.username);
  };

  const signOut = (RefreshTokenInvalid?: boolean) => {
    context.setAuth(false);
    if(RefreshTokenInvalid) {
      context.setRefreshTokenValid(false);
    }
    context.setUser((prevState) => ({...prevState, accessToken: undefined, refreshToken: undefined}));
    localStorage.clearToken();
  };

  return {
    context,
    localStorage,
    signIn,
    signOut
  }
};
