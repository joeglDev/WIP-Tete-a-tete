const app = require("../app");
const request = require("supertest");
const { Endpoints } = require("../../shared/endpoints");

describe("log in and user authentication", () => {
  test("returns 401 if user isn't found", () => {
    return request(app)
      .post(Endpoints.loginEnd)
      .send({})
      .expect(401)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid login credentials");
      });
  });
});
