"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthControllerImpl = void 0;
class HealthControllerImpl {
    health(_request, response, next) {
        response.status(200).json({ status: 'up' });
        return next();
    }
}
exports.HealthControllerImpl = HealthControllerImpl;
