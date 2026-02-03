const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const db = require("./config/db");

app.use(cors());
app.use(express.json());

/* ================= IMAGES STATIC ================= */
app.use("/images", express.static("images"));

/* ================= ROUTES ================= */
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
app.use(authRoutes(db));
app.use(userRoutes(db));
app.use(productRoutes(db));
app.use(orderRoutes(db));
/* ================= SERVER ================= */
app.listen(3000, () => {
  console.log("🚀 Server running http://192.168.29.224:3000");
});
