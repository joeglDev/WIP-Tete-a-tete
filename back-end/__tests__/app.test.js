const app = require("../app");
const request = require("supertest");
const { Endpoints } = require("../../shared/endpoints");

describe("log in and user authentication", () => {
  test("returns 401 if user isn't found", () => {
    return request(app)
    .post(Endpoints.loginEnd)
    .expect(401);
  });
});
