const app = require("../app");
const request = require("supertest");
const { Endpoints } = require("../../shared/Endpoints");
const { HttpErrors } = require("../../shared/HttpErrors");
const userData = require("../db/data/test-data/users");

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
        expect(body.msg).toBe(HttpErrors.invalidLogin.msg);
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
        expect(body.msg).toBe(HttpErrors.invalidLogin.msg);
      });
  });

  test("returns 200 with user if username and password are valid.", () => {
    const userLogin = {
      username: "user1@email.com",
      password: "password",
    };

    return request(app)
      .post(Endpoints.loginEnd)
      .send(userLogin)
      .expect(200)
      .then(({ body }) => {
        expect(body.user).toEqual({
          user_id: 1,
          screen_name: userData[0].screen_name,
          bio: userData[0].bio,
          img_url: userData[0].img_url,
          topics: [],
        });
      });
  });

  test("returns status 401 and error message for a missing request key.", () => {
    const userLogin = {
      username: "user1@email.com",
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

describe("create user profile", () => {
  test("send valid profile data returns 200 status and stores item.", () => {
    const updateUserObj = { bio: "Updated bio test", screen_name: userData[0].screen_name, img_url: userData[0].img_url };
    return request(app)
      .patch(`${Endpoints.usersEnd}/1`)
      .send(updateUserObj)
      .expect(200)
      .then(({ body }) => {
        expect(body.user).toEqual({
          user_id: 1,
          username: "user1@email.com",
          screen_name: "user_1",
          bio: "Updated bio test",
          img_url: "",
        });
      });
  });
  test("Returns 404 for valid but non existent user id", () => {
    const updateUserObj = { bio: "Updated bio test", screen_name: userData[0].screen_name, img_url: userData[0].img_url };
    return request(app)
      .patch(`${Endpoints.usersEnd}/999`)
      .send(updateUserObj)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe(HttpErrors.itemNotFound.msg);
      });
  });
});
