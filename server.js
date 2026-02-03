const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

/* ================= CORS FIX ================= */
app.use(
  cors({
    origin: "*", // allow all (mobile + web + localhost)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

/* ================= JSON ================= */
app.use(express.json());

/* ================= IMAGES ================= */
app.use("/images", express.static(path.join(__dirname, "images")));

/* ================= TEST ================= */
app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

/* ================= ROUTES ================= */
const db = require("./config/db");

app.use(require("./routes/authRoutes")(db));
app.use(require("./routes/userRoutes")(db));
app.use(require("./routes/productRoutes")(db));
app.use(require("./routes/orderRoutes")(db));

/* ================= SERVER ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
