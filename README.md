# POC-Axios-OAuth
This Poc shows a simple demostration of the axios interception. 
 
# Description:
the POC-Axios_Oauth repository posses a bff, a react native application and a axios driver.

## BFF

## React Native

## Axios

### Interceptor 

interceptors are functions that Axios calls for every request. You can use interceptors to transform the request before Axios sends it, or transform the response before Axios returns the response to your code.

#### Request Interceptor

```
  config.httpClient.interceptors.request.use(
    async (config) => {
      console.log('request', config.url);
      if (
        config.url !== '/login' &&
        config.url !== '/refreshToken' &&
        config.url !== '/refreshTokenInvalid'
      ) {
        const token = await localStorage.getAccessToken();
        console.log('Token', token);
        config.headers = {
          'Authorization': `Bearer ${token}`,
        };
      }
      return config;
    },
    (error) => {
      Promise.reject(error)
    }
  );
```

#### Response Interceptor

```
config.httpClient.interceptors.response.use(
  (response) => {
    console.log('response Fulfilled', response);
    return response
  },
  async function (error) {
    const originalRequest = error.config;

    console.info('response', error.response.status, originalRequest.url);

    if (error.response.status === 401 && (
      originalRequest.url === '/refreshToken' ||
      originalRequest.url === '/refreshTokenInvalid')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await localStorage.getRefreshToken();
      console.log('getRefreshToken', refreshToken);

      if (originalRequest.url === '/failRequest') {
        return config.httpClient.post('/refreshToken',{refreshToken: refreshToken})
          .then((res: AxiosResponse) => {
            console.log('request RefreshToken Response');
            if (res.status === 201) {
              // localStorage.setToken(res.data);
              defaultConfig.httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getAccessToken();
              return config.httpClient(originalRequest);
            }
          })
      } else {
        return config.httpClient.post('/refreshTokenInvalid',{refreshToken: refreshToken})
          .then((res: AxiosResponse) => {
            console.log('request RefreshToken Response');
            if (res.status === 201) {
              // localStorage.setToken(res.data);
              defaultConfig.httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getAccessToken();
              return config.httpClient(originalRequest);
            }
          })
      }

    } else {
      console.log('Double fail request');
      console.log('Possibly logout');
    }
    return Promise.reject(error);
  }
);
```

# How to run

## BFF (bff)

| Description | Command |
| :--- | :--- |
| Install dependencies | `npm install` |
| Start Local Server | `npm start` |

## React (poc_axios)

### Change the BASE_URL (192.168.21.31) with your machine ip

Location = porc_axios\scr\driver\driver.tsx
```
const BASE_URL =
  'http://192.168.21.31:3000/bff/'; // LocalHost IP
```

| Description | Command |
| :--- | :--- |
| Install dependencies | `npm install` |
| Start Aplication | `npm run android` |
