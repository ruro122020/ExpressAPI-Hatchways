const axios = require("axios");

//These functions help sort the data
const sortByProperty = (array, property = "id", direction = "asc") => {
  if (direction === "desc") {
    //sort by descend
    return array.sort((a, b) => (a[property] > b[property] ? -1 : 1));
  }
  if (direction === "asc") {
    //sort by ascend
    return array?.sort((a, b) => (a[property] > b[property] ? 1 : -1));
  }
};

const getDataArr = (tags) => {
  const baseUrl = "https://api.hatchways.io/assessment/blog/posts";
  const tagsAsArray = tags.split(",");
  const queries = tagsAsArray.map((tag) => {
    return axios.get(baseUrl, {
      params: { tag },
    });
  });
  return queries;
};

const combine = (arr) => {
  const resultsAsArray = arr.map((postObject) => postObject.data.posts);
  const combine = [].concat(...resultsAsArray);
  return combine;
};

const removeRepeats = (arr) => {
  const repeatsRemoved = Array.from(new Set(arr.map((a) => a.id))).map((id) => {
    return arr.find((a) => a.id === id);
  });
  return repeatsRemoved;
};

/***************************************************************/

const assignDefaultIfUndefined = (parameter, defaultValue) => {
  if (typeof parameter === "undefined") return defaultValue;
  return parameter;
};

const checkTagsExist = (tags) => {
  if (!tags) {
    return { error: "Tags parameter is required" };
  }
};
const getPosts = async (tags, sortBy, direction) => {
  const queries = getDataArr(tags);
  try {
    const blogPostsByTag = await Promise.all(queries);
    const combined = combine(blogPostsByTag);
    const reducedArr = removeRepeats(combined);
    const postsSorted = sortByProperty(reducedArr, sortBy, direction);
    return postsSorted;
  } catch (err) {
    return false;
  }
};

const checkAcceptableFields = (field, objectOfFields, type) => {
  if (!objectOfFields[field]) {
    return { error: `${type} parameter is invalid` };
  }
};
module.exports = {
  assignDefaultIfUndefined,
  checkTagsExist,
  checkAcceptableFields,
  getPosts,
};
