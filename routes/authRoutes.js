const express = require("express");
const authController = require("../controllers/authController");

module.exports = (db) => {
  const router = express.Router();
router.get("/login", (req, res) =>
  controller.login(req, res, db)
);


  return router;
};
