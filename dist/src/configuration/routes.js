"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpressRouter = void 0;
const express_1 = require("express");
const router_1 = require("../auth/router");
const router_2 = require("../health/router");
function createRouter(routers) {
    return routers.reduce((previous, current) => previous.use(current), express_1.Router());
}
function createExpressRouter() {
    const router = createRouter([
        router_1.createAuthRouter(),
        router_2.createHealthRouter(),
    ]);
    return express_1.Router()
        .use('/bff/', router);
}
exports.createExpressRouter = createExpressRouter;
