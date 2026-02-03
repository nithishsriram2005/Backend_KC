/* =========================================
   CREATE ORDER
========================================= */
exports.createOrder = (req, res, db) => {
  const { userId, items, totalAmount } = req.body;

  console.log("BODY =>", req.body);

  const orderCode = "ORD-" + Date.now();

  db.query(
    "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, 'confirmed')",
    [userId, totalAmount],
    (err, result) => {
      if (err) {
        console.log("❌ ORDER INSERT ERROR =>", err);
        return res.json({ status: false });
      }

      const orderDbId = result.insertId;

      const values = items.map((i) => [
        orderDbId,
        i.name,
        i.price,
        i.quantity,
      ]);

      db.query(
        "INSERT INTO order_items (order_id, name, price, quantity) VALUES ?",
        [values],
        (err2) => {
          if (err2) {
            console.log("❌ ITEM INSERT ERROR =>", err2);
            return res.json({ status: false });
          }

          console.log("✅ ORDER CREATED SUCCESS");
          res.json({ status: true });
        }
      );
    }
  );
};


/* =========================================
   GET ORDERS  🔥 IMPORTANT PART
========================================= */
exports.getOrders = (req, res, db) => {
  const userId = req.params.userId;

  db.query(
    "SELECT * FROM orders WHERE user_id=? ORDER BY id DESC",
    [userId],
    (err, orders) => {
      if (err) return res.json({ status: false });

      if (!orders.length)
        return res.json({ status: true, data: [] });

      const orderIds = orders.map((o) => o.id);

      db.query(
        "SELECT * FROM order_items WHERE order_id IN (?)",
        [orderIds],
        (err2, items) => {
          if (err2) return res.json({ status: false });

          const data = orders.map((o) => ({
            id: "ORD-" + o.id,
            date: o.created_at,
            totalAmount: o.total_amount,
            status: o.status,
            items: items
              .filter((i) => i.order_id === o.id)
              .map((i) => i.name),
          }));

          res.json({ status: true, data });
        }
      );
    }
  );
};
