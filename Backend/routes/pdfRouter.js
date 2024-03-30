const express = require('express');
const multer = require('multer');
const { handlePdfUpload, handleExtractPdf, getAllPdfs, getPdfById } = require('../controller/pdfController');
const { authenticateUser } = require('../middleware/authMiddleware');
const router = express.Router();

const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed!'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/upload' ,authenticateUser, upload.single('file') , handlePdfUpload);
router.post('/extract' ,authenticateUser,upload.none(), handleExtractPdf);
router.get('/my-pdfs' ,authenticateUser ,getAllPdfs );
router.get('/my-pdfs/:id' ,authenticateUser , getPdfById)
module.exports = router;