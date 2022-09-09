const {
  selectTopicAndInsertIfNonExistent: getTopicAndInsertIfNonExistent,
} = require("../../models/topicss.model");

const testData = require(`../../db/data/test-data/index.js`);
const seed = require("../../db/seeds/seed");

beforeEach(() => {
  return seed(testData);
});

describe("getTopicAndInsertIfNonExistent", () => {
  test("returns inserted entry if given topic was not in db", async () => {
    const topicInput = "Non-existent";

    const actual = await getTopicAndInsertIfNonExistent(topicInput);

    const expected = { topic_id: 4, topic_name: topicInput };
    expect(actual).toEqual(expected);
  });

  test("returns topic entry if given topic was in db", async () => {
    const topicInput = "Topic A";

    const actual = await getTopicAndInsertIfNonExistent(topicInput);

    const expected = { topic_id: 1, topic_name: topicInput };
    expect(actual).toEqual(expected);
  });
});
