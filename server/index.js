const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const financialAdviceRoutes = require("./routes/financialAdvice");
const businessTypesRoutes = require("./routes/businessTypes");
const addRoutes = require("./routes/add");

const app = express();
const PORT = process.env.PORT || 8080;

// Allow both local and production frontend URLs
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend.vercel.app" // <-- Replace with your actual Vercel frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/financial-advice", financialAdviceRoutes);
app.use("/api/business-types", businessTypesRoutes);
app.use("/api/add", addRoutes);

app.get("/ping", (req, res) => {
  res.send("Hello Server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});