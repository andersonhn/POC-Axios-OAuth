import { Router, Request, Response, NextFunction } from 'express';

import { AuthController, AuthControllerImpl } from './controller';

export function createAuthRouter(
  controller: AuthController = new AuthControllerImpl()
): Router {
  return Router()
    .post(
      '/login',
      (request: Request, response: Response, next: NextFunction) =>
        controller.login(request, response, next).catch(next)
    )
    .post(
      '/logout',
      (request: Request, response: Response, next: NextFunction) =>
        controller.logout(request, response, next).catch(next)
    )
    .post(
      '/failRequest',
      (request: Request, response: Response, next: NextFunction) =>
        controller.failRequest(request, response, next).catch(next)
    )
    .post(
      '/refreshToken',
      (request: Request, response: Response, next: NextFunction) =>
        controller.refreshToken(request, response, next).catch(next)
    )
    .post(
      '/refreshTokenInvalid',
      (request: Request, response: Response, next: NextFunction) =>
        controller.refreshTokenInvalid(request, response, next).catch(next)
    );
}
