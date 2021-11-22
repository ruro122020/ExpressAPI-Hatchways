const express = require("express");
const posts = express.Router();
const {
  assignDefaultIfUndefined,
  checkTagsExist,
  checkAcceptableFields,
  getPosts,
} = require("../models/models");

posts.get("/api/posts", async (req, res) => {
  const defaultSortByValue = "id";
  const defaultDirectionValue = "asc";
  const sortByFields = {
    id: true,
    reads: true,
    likes: true,
    popularity: true,
  };
  const directionFields = {
    desc: true,
    asc: true,
  };
  let { tags, sortBy, direction } = req.query;
  sortBy = assignDefaultIfUndefined(sortBy, defaultSortByValue);
  direction = assignDefaultIfUndefined(direction, defaultDirectionValue);
  const tagErr = checkTagsExist(tags);
  const sortByErr = checkAcceptableFields(sortBy, sortByFields, "sortBy");
  const directionErr = checkAcceptableFields(
    direction,
    directionFields,
    "direction"
  );

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
