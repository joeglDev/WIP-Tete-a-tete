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
    const updateUserObj = {
      bio: "Updated bio test",
      screen_name: userData[0].screen_name,
      img_url: userData[0].img_url,
    };
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
    const updateUserObj = {
      bio: "Updated bio test",
      screen_name: userData[0].screen_name,
      img_url: userData[0].img_url,
    };
    return request(app)
      .patch(`${Endpoints.usersEnd}/999`)
      .send(updateUserObj)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe(HttpErrors.itemNotFound.msg);
      });
  });
  test("Returns 400 for invalid user id data type", () => {
    const updateUserObj = {
      bio: "Updated bio test",
      screen_name: userData[0].screen_name,
      img_url: userData[0].img_url,
    };
    return request(app)
      .patch(`${Endpoints.usersEnd}/notvalidid`)
      .send(updateUserObj)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(HttpErrors.invalidRequest.msg);
      });
  });
});

/*
1) Client sends x topics from frontend ["horse-rideing", "running"]
2) Check topic exists in topics table:
	- Yes: Get topic Id;
	- No: Create topic and return id
3) Get all entries from join table where user_id is that of incoming user profile
4) Update all entries from join table with new incoming topics
*/

describe("get user topics", () => {
  test("returns status code 200 and a array object of topics for a user with topics", () => {
    return request(app)
      .get(`${Endpoints.makeUsersTopicsEnd(1)}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.user_topics).toEqual(["Topic A", "Topic B", "Topic C"]
        );
      });
  });
});
