const express = require("express");

module.exports = (db) => {
  const router = express.Router();
  const controller = require("../controllers/productController");

  router.get("/categories", (req, res) =>
    controller.getCategories(req, res, db)
  );

  router.get("/categories/:id/cards", (req, res) =>
    controller.getCardsByCategory(req, res, db)
  );

  return router;
};
