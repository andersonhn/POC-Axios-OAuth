import { Request, Response, NextFunction } from 'express';

export interface AuthController {
  login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>;
  logout(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>;
  failRequest(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>;
  failGetUser(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>;
  refreshToken(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>;
  refreshTokenInvalid(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>;
}

export class AuthControllerImpl implements AuthController {

  public async login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    response.status(200).json({ accessToken: 'lhWsBUud2PvBQnz7AR1o', refreshToken: 'rdlnTmIoNtoNrRgSiv28'});
    return next();
  }

  public async logout(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    response.status(201).json();
    return next();
  }

  public async failRequest(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    response.status(401).json();
    return next();
  }

  public async failGetUser(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    response.status(401).json();
    return next();
  }

  public async refreshToken(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    response.status(201).json({ accessToken: '7YIElUxwOcz0s4avkzz6', refreshToken: 'rdlnTmIoNtoNrRgSiv28'});
    return next();
  }

  public async refreshTokenInvalid(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    response.status(401).json();
    return next();
  }
}
