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
  ): Promise<unknown>;
  refreshToken(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<unknown>;
  refreshTokenInvalid(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<unknown>;
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
    response.status(201).json();;
    return next();
  }

  public async failRequest(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    response.status(400).json();
    return next();
  }

  public async refreshToken(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    response.status(200).json({ accessToken: '7YIElUxwOcz0s4avkzz6'});
    return next();
  }

  public async refreshTokenInvalid(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    response.status(403).json();;
    return next();
  }
}
