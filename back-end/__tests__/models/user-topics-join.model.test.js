const { selectUserTopics } = require("../../models/user-topic-join.model");

describe("selectUserTopics", () => {
  test("returns all user-topic joins for given user", async () => {
    const userIdInput = 1;

    const actual = await selectUserTopics(userIdInput);

    const expected = [
      { id: 1, user_id: 1, topic_id: 1 },
      { id: 2, user_id: 1, topic_id: 2 },
      { id: 3, user_id: 1, topic_id: 3 },
      { id: 4, user_id: 1, topic_id: null },
      { id: 5, user_id: 1, topic_id: null },
      { id: 6, user_id: 1, topic_id: null },
      { id: 7, user_id: 1, topic_id: null },
      { id: 8, user_id: 1, topic_id: null },
      { id: 9, user_id: 1, topic_id: null },
      { id: 10, user_id: 1, topic_id: null },
    ];
    expect(actual).toEqual(expected);
  });

  test("returns empty array for none existent user", async () => {
    const userIdInput = 10000;

    const actual = await selectUserTopics(userIdInput);

    const expected = [];
    expect(actual).toEqual(expected);
  });
});
