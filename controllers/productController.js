/* =========================================
   GET ALL CATEGORIES
========================================= */
exports.getCategories = (req, res, db) => {
  db.query("SELECT * FROM categories", (err, rows) => {
    if (err) {
      console.log(err);
      return res.json({ status: false });
    }

    res.json({
      status: true,
      data: rows,
    });
  });
};


/* =========================================
   GET CARDS BY CATEGORY
========================================= */
exports.getCardsByCategory = (req, res, db) => {
  const categoryId = req.params.id;

  console.log("Category ID =>", categoryId); // debug log

  db.query(
    "SELECT * FROM subcategories WHERE category_id = ?",
    [categoryId],
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.json({ status: false });
      }

      console.log("Rows =>", rows); // debug log

      const data = rows.map((row) => ({
        id: row.id,
        title: row.name,
        imageUrl: `http://192.168.29.224:3000/images/${row.image}`,
        price: row.price,
        stock: row.stock,
        description: row.description,
      }));

      res.json({
        status: true,
        data,
      });
    }
  );
};
