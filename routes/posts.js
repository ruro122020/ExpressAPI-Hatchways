const express = require("express");
const posts = express.Router();
const {
  assignDefaultIfUndefined,
  checkTagsExist,
  checkAcceptableFields,
  checkAcceptableDirections,
  getPosts,
} = require("../helpers/helpers");

const defaultSortByValue = "id";
const defaultDirectionValue = "asc";

posts.get("/api/posts", async (req, res) => {
  let { tags, sortBy, direction } = req.query;
  sortBy = assignDefaultIfUndefined(sortBy, defaultSortByValue);
  direction = assignDefaultIfUndefined(direction, defaultDirectionValue);
  const tagErr = checkTagsExist(tags);
  const sortByErr = checkAcceptableFields(sortBy);
  const directionErr = checkAcceptableDirections(direction);
  console.log("tags", tags);
  if (tagErr && tagErr.error) {
    res.status(400).json(tagErr);
    return;
  }

  if (sortByErr && sortByErr.error) {
    res.status(400).json(sortByErr);
    return;
  }

  if (directionErr && directionErr.error) {
    res.status(400).json(directionErr);
    return;
  }

  const posts = await getPosts(tags, sortBy, direction);
  if (!posts) {
    res.status(400).send("Server unreachable");
    return;
  }
  res.status(200).json(posts);
});

module.exports = posts;
