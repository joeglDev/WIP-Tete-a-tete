const app = require("../app");
const request = require("supertest");
const { Endpoints } = require("../../shared/Endpoints");
const { HttpErrors } = require("../../shared/HttpErrors");
const userData = require("../db/data/test-data/users");
const testData = require(`../db/data/test-data/index.js`);
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(testData);
});

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

describe("get user topics", () => {
  test("returns status code 200 and a array object of topics for a user with topics", () => {
    return request(app)
      .get(`${Endpoints.makeUsersTopicsEnd(1)}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.user_topics).toEqual(["Topic A", "Topic B", "Topic C"]);
      });
  });
  test("returns status code 200 and a empty array object of topics for a user with no topics", () => {
    return request(app)
      .get(`${Endpoints.makeUsersTopicsEnd(2)}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.user_topics).toEqual([]);
      });
  });

  test("returns status code 404 and an error message for user_id not found", () => {
    return request(app)
      .get(`${Endpoints.makeUsersTopicsEnd(999)}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe(HttpErrors.itemNotFound.msg);
      });
  });

  test("returns status code 400 and an error message for invalid user_id", () => {
    return request(app)
      .get(`${Endpoints.makeUsersTopicsEnd("invalid")}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(HttpErrors.invalidRequest.msg);
      });
  });
});

describe("PATCH / UPDATE user topics", () => {
  test("returns http status code of 200 and a array of updated topics for topics of a specific user", () => {
    const newTopics = { new_topics: ["A"] };
    const expected = { updated_topics: ["A"] };
    return request(app)
      .patch(Endpoints.makeUsersTopicsEnd(2))
      .send(newTopics)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(expected);
      });
  });

  test("returns http status code of 200 and a array of updated topics for topics of a specific user if many new topic", () => {
    const newTopics = { new_topics: ["A", "B", "C"] };
    const expected = { updated_topics: ["A", "B", "C"] };
    return request(app)
      .patch(Endpoints.makeUsersTopicsEnd(2))
      .send(newTopics)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(expected);
      });
  });

  test("returns http status code of 200 and a array of updated topics for an empty array of input topics", () => {
    const newTopics = { new_topics: [] };
    const expected = { updated_topics: [] };
    return request(app)
      .patch(Endpoints.makeUsersTopicsEnd(2))
      .send(newTopics)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(expected);
      });
  });

  test("returns http status code of 200 and a array of updated topics for an empty array of input topics if a topic is preexisting", () => {
    const newTopics = { new_topics: ["Topic A", "B", "C"] };
    const expected = { updated_topics: ["Topic A", "B", "C"] };
    return request(app)
      .patch(Endpoints.makeUsersTopicsEnd(1))
      .send(newTopics)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(expected);
      });
  });
});

describe("POST /user/:user_id/conversation", () => {
  test("returns http status 201 and a object representing a newly created conversation", () => {
    const newConversation = {
      new_conversation: {
        title: "Chat A",
        body: "Body A",
        topics: ["Topic A"],
      },
    };
    const expected = {
      conversation_id: 4,
      title: "Chat A",
      body: "Body A",
      topics: ["Topic A"],
      topic_id: 1,
      user_id: 1,
    };

    return request(app)
      .post(Endpoints.makePostUserConversationEnd(1))
      .send(newConversation)
      .expect(201)
      .then(({ body }) => {
        expect(body.new_conversation).toEqual(expected);
      });
  });
});

describe("GET / conversation", () => {
  test("returns status 200 and an object representing a list of conversations matching an input topic", () => {
    const body = { topic_names: ["Topic A"] };
    const res = [
      [
        {
          author_user_id: 1,
          conversation_id: 1,
          topic_id: 1,
          topic_name: "Topic A",
          title: "Chat A",
          body: "Body A",
          author: "user_1",
        },
      ],
    ];
    return request(app)
      .post(Endpoints.conversationsEnd)
      .send(body)
      .expect(200)
      .then(({ body }) => {
        expect(body.conversations).toEqual(res);
      });
  });

  test("returns status 200 and an object representing a list of conversations matching many input topics", () => {
    const body = { topic_names: ["Topic A", "Topic B"] };
    const res = [
      [
        {
          author_user_id: 1,
          conversation_id: 1,
          topic_id: 1,
          topic_name: "Topic A",
          title: "Chat A",
          body: "Body A",
          author: "user_1",
        },
      ],
      [
        {
          author_user_id: 2,
          conversation_id: 2,
          topic_id: 2,
          topic_name: "Topic B",
          title: "Chat B",
          body: "Body B",
          author: "user_2",
        },
      ],
    ];
    return request(app)
      .post(Endpoints.conversationsEnd)
      .send(body)
      .expect(200)
      .then(({ body }) => {
        expect(body.conversations).toEqual(res);
      });
  });

  test("returns status 200 and a empty object representing no found conversations", () => {
    const body = { topic_names: [] };
    const res = [];
    return request(app)
      .post(Endpoints.conversationsEnd)
      .send(body)
      .expect(200)
      .then(({ body }) => {
        expect(body.conversations).toEqual(res);
      });
  });
});
