"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllerImpl = void 0;
class AuthControllerImpl {
    async login(request, response, next) {
        response.status(200).json({ accessToken: 'lhWsBUud2PvBQnz7AR1o', refreshToken: 'rdlnTmIoNtoNrRgSiv28' });
        return next();
    }
    async logout(request, response, next) {
        response.status(201).json();
        ;
        return next();
    }
    async failRequest(request, response, next) {
        response.status(400).json();
        return next();
    }
    async refreshToken(request, response, next) {
        response.status(200).json({ accessToken: '7YIElUxwOcz0s4avkzz6' });
        return next();
    }
    async refreshTokenInvalid(request, response, next) {
        response.status(403).json();
        ;
        return next();
    }
}
exports.AuthControllerImpl = AuthControllerImpl;
