import React, {Dispatch, SetStateAction} from 'react';

export type AppContextAction = {
  isAuth?: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
}

interface AppContextInterface extends AppContextAction {}

export const AppContext = React.createContext<AppContextInterface>({
  setAuth: () => {},
  isAuth: undefined
});
