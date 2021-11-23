const assert = require("chai").assert;
const {
  assignDefaultIfUndefined,
  checkTagsExist,
  getPosts,
  checkAcceptableFields,
} = require("../../models/models");

describe("Testing Logic", () => {
  it("Should assign and return the default value ", () => {
    const sortByDefaultValue = "id";
    let sortBy = undefined;
    sortBy = assignDefaultIfUndefined(sortBy, sortByDefaultValue);
    assert.typeOf(sortBy, "string");
    assert.equal(sortBy, "id", "sortBy equals `id`");
  });

  it("Should return an error message if tags are undefined", () => {
    let tags;
    const response = checkTagsExist(tags);
    assert.typeOf(response, "Object");
    assert.equal(
      response.error,
      "Tags parameter is required",
      `error message equals ${response.error}`
    );
  });

  it("should return an error message if fields do not exist", () => {
    const directionFields = {
      desc: true,
      asc: true,
    };
    const direction = "de";
    const directionErr = checkAcceptableFields(
      direction,
      directionFields,
      "direction"
    );
    assert.typeOf(directionErr, "object");
    assert.equal(directionErr.error, "direction parameter is invalid");
  });

  it("Should return an array", async () => {
    const tags = "science,tech";
    const sortBy = "popularity";
    const direction = "desc";
    const response = await getPosts(tags, sortBy, direction);
    assert.typeOf(response, "array");
  });
});
