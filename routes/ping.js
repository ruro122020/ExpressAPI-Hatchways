const express = require("express");
const ping = express.Router();

ping.get("/api/ping", (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = ping;
