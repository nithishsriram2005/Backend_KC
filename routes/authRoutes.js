const express = require("express");
const authController = require("../controllers/authController");

module.exports = (db) => {
  const router = express.Router();

  router.post("/login", (req, res) => {
    authController.login(req, res, db);
  });

  return router;
};
