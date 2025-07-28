const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { handleUpload, handleExtract } = require('../controllers/ocrController');

const upload = multer({ dest: path.join(__dirname, '../uploads/') });

router.post('/upload-financial-doc', upload.single('file'), handleUpload);
router.post('/extract-financial-info', handleExtract);

module.exports = router; 