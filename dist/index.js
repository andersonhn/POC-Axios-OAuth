"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./src/configuration/routes");
const server_1 = require("./src/configuration/server");
const port = 3000;
const environment = 'dev';
server_1.createExpressServer(routes_1.createExpressRouter())
    .listen(port);
