import * as Server from 'express';
import * as BodyParser from 'body-parser';
import * as Helmet from 'helmet';
import * as CORS from 'cors';

export function createExpressServer(router: Server.Router): Server.Express {
  const app: Server.Express = Server();

  app.disable('x-powered-by');
  app.use(Helmet.frameguard());
  app.use(Helmet.xssFilter());
  app.use(Helmet.noSniff());
  app.use(Helmet.ieNoOpen());
  app.use(
    Helmet.hsts({
      maxAge: 15778476000,
      includeSubDomains: true
    })
  );
  app.use(CORS());

  app.use(BodyParser.urlencoded({ extended: false }));
  app.use(BodyParser.json());

  app.use(router);

  return app;
}
