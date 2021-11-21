const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const ping = require("./routes/ping");
const posts = require("./routes/posts");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", ping);
app.use("/", posts);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
