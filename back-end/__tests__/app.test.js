const app = require("../app");
const request = require("supertest");
const { Endpoints } = require("../../shared/endpoints");

describe("log in and user authentication", () => {
  test("returns 401 with error message if username isn't found", () => {
    const userLogin = {
      username: "not_a_user@email.com",
      password: "password",
    };

    return request(app)
      .post(Endpoints.loginEnd)
      .send(userLogin)
      .expect(401)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid login credentials");
      });
  });

  test("returns 401 with error message if password isn't found", () => {
    const userLogin = {
      username: "user1@email.com",
      password: "not_a_password",
    };

    return request(app)
      .post(Endpoints.loginEnd)
      .send(userLogin)
      .expect(401)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid login credentials");
      });
  });
});
