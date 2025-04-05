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

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
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
