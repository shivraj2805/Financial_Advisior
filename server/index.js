const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
require('./models/db');

const financialAdviceRoutes = require("./routes/financialAdvice");
const businessTypesRoutes = require("./routes/businessTypes");
const addRoutes = require("./routes/add");
const communityRoutes = require('./routes/community');

const app = express();
const PORT = process.env.PORT || 8080;

// Allow both local and production frontend URLs
const allowedOrigins = [
  "http://localhost:3000",
  "https://finadvisior.vercel.app",
  "https://www.finadvisior.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("Request Origin:", origin); // For debugging
    if (!origin) return callback(null, true); // Allow non-browser requests
    if (
      allowedOrigins.includes(origin) ||
      origin?.startsWith("http://localhost") ||
      /^https:\/\/.*\.finadvisior\.vercel\.app$/.test(origin)
    ) {
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
app.use('/api/communities', communityRoutes);

app.get("/ping", (req, res) => {
  res.send("Hello Server");
});

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});