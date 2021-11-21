const assert = require("chai").assert;
const {
  assignDefaultIfUndefined,
  checkTagsExist,
  checkAcceptableFields,
  checkAcceptableDirections,
  getPosts,
} = require("../helpers/helpers");

describe("Assign default value if undefined", () => {
  it("SortBy default should be `id`", () => {
    const sortByDefaultValue = "id";
    let sortBy = undefined;
    sortBy = assignDefaultIfUndefined(sortBy, sortByDefaultValue);
    assert.typeOf(sortBy, "string");
    assert.equal(sortBy, "id", "sortBy equals `id`");
  });

  it("Direction default should be `asc`", () => {
    const directionDefaultValue = "asc";
    let direction = undefined;
    direction = assignDefaultIfUndefined(direction, directionDefaultValue);
    assert.typeOf(direction, "string");
    assert.equal(direction, "asc", "direction equals `asc`");
  });
});

describe("Returns error if tags parameter is undefined", () => {
  it("Undefined tags should return `Tags parameter is required`", () => {
    let tags;
    const response = checkTagsExist(tags);
    assert.typeOf(response, "Object");
    assert.equal(
      response.error,
      "Tags parameter is required",
      `error message equals ${response.error}`
    );
  });
});

describe("");
