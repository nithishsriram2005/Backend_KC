const express = require("express");
const router = express.Router();
const controller = require("../controllers/user-controller");

module.exports = (db) => {

  router.put("/user/update", (req, res) => {
    controller.updateProfile(req, res, db);
  });

  return router;
};
