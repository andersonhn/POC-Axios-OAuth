"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SuperTest = require("supertest");
const shared_1 = require("../shared");
const controller_1 = require("./controller");
const router_1 = require("./router");
describe('GET /health', () => {
    test('200 - Status up', async () => {
        const controller = new controller_1.HealthControllerImpl();
        const router = router_1.createHealthRouter(controller);
        const app = shared_1.createExpressServer(router);
        const response = await SuperTest(app).get('/health').send();
        expect(response.status).toStrictEqual(200);
        expect(response.body).toStrictEqual({
            status: 'up',
        });
    });
});
