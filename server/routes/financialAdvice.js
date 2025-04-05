const express = require("express");
const { generateFinancialAdvice } = require("../controllers/financialAdviceController");

const router = express.Router();

router.post("/generate", generateFinancialAdvice);

module.exports = router;
