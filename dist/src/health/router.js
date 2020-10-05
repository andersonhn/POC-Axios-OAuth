"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHealthRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
function createHealthRouter(controller = new controller_1.HealthControllerImpl()) {
    return express_1.Router().get('/health', (request, response, next) => controller.health(request, response, next));
}
exports.createHealthRouter = createHealthRouter;
