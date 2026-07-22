const request = require("supertest");
const app = require("../src/app");

describe("CareerTrack API", () => {

    it("GET /", async () => {
        const res = await request(app).get("/");

        expect(res.statusCode).toBe(200);
    });

    it("GET /health", async () => {
        const res = await request(app).get("/health");

        expect(res.statusCode).toBe(200);
    });

});