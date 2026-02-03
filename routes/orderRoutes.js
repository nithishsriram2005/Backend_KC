const express = require("express");

module.exports = (db) => {
  const router = express.Router();
  const controller = require("../controllers/orderController");

  router.post("/orders", (req, res) =>
    controller.createOrder(req, res, db)
  );

  router.get("/orders/:userId", (req, res) =>
    controller.getOrders(req, res, db)
  );

  return router;
};
