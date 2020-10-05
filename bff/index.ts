import { createExpressRouter } from './src/configuration/routes';
import { createExpressServer } from './src/configuration/server';

const port = 3000;
const environment = 'dev';

createExpressServer(createExpressRouter())
  .listen(port);
