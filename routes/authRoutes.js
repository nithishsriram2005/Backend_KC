const express = require("express");
const authController = require("../controllers/authController");

module.exports = (db) => {
  const router = express.Router();

  /* ================= LOGIN ================= */

  // for browser testing (GET)
  router.get("/login", (req, res) =>
    authController.login(req, res, db)
  );

  // for app / flutter (POST)  ⭐ IMPORTANT
  router.post("/login", (req, res) =>
    authController.login(req, res, db)
  );

  return router;
};
