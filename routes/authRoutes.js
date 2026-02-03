const express = require("express");
const authController = require("../controllers/authController");

module.exports = (db) => {
  const router = express.Router();

  // ✅ LOGIN (GET for browser testing)
  router.get("/login", (req, res) =>
    authController.login(req, res, db)
  );

  // ✅ LOGIN (POST for Flutter)
  router.post("/login", (req, res) =>
    authController.login(req, res, db)
  );

  return router;
};
