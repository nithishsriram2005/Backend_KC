const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

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

/* ========= IMPORTANT FOR RAILWAY ========= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
