export type Credentials = {
  username: string;
  password: string;
}

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
}

export enum AxiosErrorEnum {
  error,
  authError
}
