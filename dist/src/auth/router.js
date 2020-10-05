"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
function createAuthRouter(controller = new controller_1.AuthControllerImpl()) {
    return express_1.Router()
        .post('/login', (request, response, next) => controller.login(request, response, next).catch(next))
        .post('/logout', (request, response, next) => controller.logout(request, response, next).catch(next))
        .post('/failRequest', (request, response, next) => controller.failRequest(request, response, next).catch(next))
        .post('/refreshToken', (request, response, next) => controller.refreshToken(request, response, next).catch(next))
        .post('/refreshTokenInvalid', (request, response, next) => controller.refreshTokenInvalid(request, response, next).catch(next));
}
exports.createAuthRouter = createAuthRouter;
