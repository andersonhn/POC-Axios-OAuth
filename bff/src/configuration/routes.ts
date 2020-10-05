import { Router } from 'express';

import { createAuthRouter } from '../auth/router';
import { createHealthRouter } from '../health/router'

function createRouter(routers: Router[]): Router {
  return routers.reduce(
    (previous: Router, current: Router) => previous.use(current),
    Router()
  );
}

export function createExpressRouter(): Router {
  const router = createRouter([
    createAuthRouter(),
    createHealthRouter(),
  ]);

  return Router()
    .use('/bff/', router)
}
