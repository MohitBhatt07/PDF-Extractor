const express = require('express');
const multer = require('multer');
const { handlePdfUpload, handleExtractPdf } = require('../controller/pdfController');
const router = express.Router();

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/upload' , upload.single('file') , handlePdfUpload);
router.post('/extract/:pageNumbers' , handleExtractPdf);

module.exports = router;