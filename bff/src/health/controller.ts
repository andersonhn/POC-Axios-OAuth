import { Request, Response, NextFunction } from 'express';

export interface HealthController {
  health(request: Request, response: Response, next: NextFunction): void;
}

export class HealthControllerImpl implements HealthController {
  public health(
    _request: Request,
    response: Response,
    next: NextFunction
  ): void {
    response.status(200).json({ status: 'up' });
    return next();
  }
}
