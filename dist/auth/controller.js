"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllerImpl = void 0;
class AuthControllerImpl {
    async login(request, response, _next) {
        console.log('login');
    }
    async logout(request, response, _next) {
        console.log('logout');
    }
    async refreshToken(request, response, _next) {
        console.log('refreshToken');
    }
    async refreshTokenInvalid(request, response, _next) {
        console.log('refreshTokenInvalid');
    }
}
exports.AuthControllerImpl = AuthControllerImpl;
