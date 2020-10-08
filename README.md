# POC-Axios-OAuth
This Poc shows a simple demostration of the axios interception and other implementations. 
 
# Description:
the POC-Axios_Oauth repository posses a bff, a react native application and a axios driver.

### Interceptor 

interceptors are functions that Axios calls for every request. You can use interceptors to transform the request before Axios sends it, or transform the response before Axios returns the response to your code.

#### Request Interceptor

```
//...
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
//...
```

#### Response Interceptor

```
//...
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
//...
```
# Hooks

[React Native Hooks](https://reactjs.org/docs/hooks-intro.html)

## Service Hook

Works like a middleware between driver and layout. 

It will take all requests from the driver and control the return of the response with status 401, in which it is a user with invalid refresh token.

```
export type ServiceHook = {
  login: (credentials: Credentials) => Promise<LoginResponse | undefined>;
  getHealth: () => void;
  failRequest: () => void;
  failGetUser: () => void;
};

export const useService = (): ServiceHook => {
  const { signOut, signIn } = useAppContext();

  const authError = useCallback((status: number) => {...}, []);

  const login = useCallback(async (credentials: Credentials) => {...}, []);

  const getHealth = useCallback(async () => {...}, []);

  const failRequest = useCallback(async () => {...}, []);

  const failGetUser = useCallback(async () => {...}, []);

  return {
    login,
    getHealth,
    failRequest,
    failGetUser,
  };
};
```

## Context Hook

```
export type AppContextHook = {
  context: AppContextAction;
  localStorage: LocalStorage;
  signIn(user: Credentials, token: LoginResponse): void;
  signOut(RefreshTokenInvalid?: boolean): void;
};

export const useAppContext = (): AppContextHook => {
  const context = useContext(AppContext);
  const localStorage = new LocalStorageService();
 
  // signIn the user, populate the context and AsyncStorage;
  const signIn = (user: Credentials, token: LoginResponse) => {...};

  // signOut the user, clean the context and data on AsyncStorage;
  const signOut = (RefreshTokenInvalid?: boolean) => {...};

  return {
    context,
    localStorage,
    signIn,
    signOut,
  };
};
```

# LocalStorage

```
export interface LocalStorage {
  setToken(token: LoginResponse): void;
  setUser(userEmail: string): void;
  getAccessToken(): Promise<string | null>;
  getRefreshToken(): Promise<string | null>;
  getUserEmail(): Promise<string | null>;
  clearToken(): void;
}

class LocalStorageService implements LocalStorage {
  async setToken(token: LoginResponse) {
    await AsyncStorage.setItem('accessToken', token.accessToken);
    await AsyncStorage.setItem('refreshToken', token.refreshToken);
  }

  async setUser(userEmail: string) {
    await AsyncStorage.setItem('userEmail', userEmail);
  }

  async getAccessToken(): Promise<string | null> {
    return AsyncStorage.getItem('accessToken');
  }

  async getRefreshToken(): Promise<string | null> {
    return AsyncStorage.getItem('refreshToken');
  }

  async getUserEmail(): Promise<string | null> {
    return AsyncStorage.getItem('userEmail');
  }

  async clearToken() {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  }
}

export default LocalStorageService;
```

# Authenticated Routes

## App Routes

```
export enum AuthRouteTypes {
  HOME = 'Home',
}

export type AuthStackRoutesParams = {
  [AuthRouteTypes.HOME]: undefined;
};

export const AuthStack = createStackNavigator<AuthStackRoutesParams>();

export const AuthRoutes: React.FC = () => {
  return (
    <AuthStack.Navigator mode="modal" initialRouteName={AuthRouteTypes.HOME}>
      <AuthStack.Screen component={Home} name={AuthRouteTypes.HOME} />
    </AuthStack.Navigator>
  );
};

```

## Auth Routes

```
export enum AppRouteTypes {
  LOGIN = 'Login',
}

export type AppStackRoutesParams = {
  [AppRouteTypes.LOGIN]: undefined;
};

export const AppStack = createStackNavigator<AppStackRoutesParams>();

export const AppRoutes: React.FC = () => {
  return (
    <AppStack.Navigator mode="modal" initialRouteName={AppRouteTypes.LOGIN}>
      <AppStack.Screen component={Login} name={AppRouteTypes.LOGIN} />
    </AppStack.Navigator>
  );
};
```

## Routes

```
export const Routes: React.FC = () => {
  const { context } = useAppContext();

  return (
    <>
      <NavigationContainer>
        {context.isAuth ? <AuthRoutes /> : <AppRoutes />}
      </NavigationContainer>
      {!context.isRefreshTokenValid && (
        <View
          style={{ position: 'absolute', bottom: 0, width: 200, height: 100 }}>
          <Text style={{ fontSize: 32 }}>SnackBar</Text>
        </View>
      )}
    </>
  );
};
```

# How to run

## BFF (bff)

| Description | Command |
| :--- | :--- |
| Install dependencies | `npm install` |
| Start Local Server | `npm start` |

## React (poc_axios)

### Change the BASE_URL (192.168.21.31) with your machine ip

Location = porc_axios\src\driver\driver.tsx
```
const BASE_URL =
  'http://192.168.21.31:3000/bff/'; // LocalHost IP
```

| Description | Command |
| :--- | :--- |
| Install dependencies | `npm install` |
| Start Aplication | `npm run android` |
