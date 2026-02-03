const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* ========= ✅ SERVE IMAGES (IMPORTANT) ========= */
app.use(
  "/images",
  express.static(path.join(__dirname, "images"))
);

/* ========= TEST ROUTE ========= */
app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

/* ========= ROUTES ========= */
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(authRoutes(db));
app.use(userRoutes(db));
app.use(productRoutes(db));
app.use(orderRoutes(db));

/* ========= IMPORTANT FOR RENDER/RAILWAY ========= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
