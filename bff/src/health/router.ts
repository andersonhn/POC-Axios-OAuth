import { Router, Request, Response, NextFunction } from 'express';

import { HealthController, HealthControllerImpl } from './controller';

export function createHealthRouter(
  controller: HealthController = new HealthControllerImpl()
): Router {
  return Router().get(
    '/health',
    (request: Request, response: Response, next: NextFunction) =>
      controller.health(request, response, next)
  );
}
