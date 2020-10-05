"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpressServer = void 0;
const Server = require("express");
const BodyParser = require("body-parser");
const Helmet = require("helmet");
const CORS = require("cors");
function createExpressServer(router) {
    const app = Server();
    app.disable('x-powered-by');
    app.use(Helmet.frameguard());
    app.use(Helmet.xssFilter());
    app.use(Helmet.noSniff());
    app.use(Helmet.ieNoOpen());
    app.use(Helmet.hsts({
        maxAge: 15778476000,
        includeSubDomains: true
    }));
    app.use(CORS());
    app.use(BodyParser.urlencoded({ extended: false }));
    app.use(BodyParser.json());
    app.use(router);
    return app;
}
exports.createExpressServer = createExpressServer;
