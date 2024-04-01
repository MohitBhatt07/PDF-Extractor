const {PDFDocument} = require("pdf-lib");
const path = require("path");
const fs = require("fs");
const User = require("../model/userModel");
const { v4: uuidv4 } = require("uuid");
const PDF = require("../model/pdfModel");

const handlePdfUpload = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No PDF file uploaded' });
    }
    res.json({ message: 'PDF uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const handleExtractPdf  = async (req, res) => {
  try {
    const id = req.body.id;
    const pages = req.body.pages || [];
    const pdf = await PDF.findById(id);

    if (!pdf || pdf.owner.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: "PDF not found or unauthorized" });
    }

    const pdfDoc = await PDFDocument.load(pdf.data);
    const newPdfDoc = await PDFDocument.create();

    const sortedPages = pages.sort((a, b) => a - b);
    for (let  i = 0 ;i< sortedPages.length ;i++) {
      const [existingPdfPage] = await newPdfDoc.copyPages(pdfDoc , [sortedPages[i]-1]);
      newPdfDoc.addPage(existingPdfPage);
    }
    
    
    const newPdfBytes = await newPdfDoc.save();
    const extractedPdfFilePath = path.join('uploads', `${pdf._id}-extracted.pdf`);
    fs.writeFileSync(extractedPdfFilePath, Buffer.from(newPdfBytes));
    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", 'attachment; filename="extracted.pdf"');
    res.send(new Buffer.from(newPdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPdfs = async (req, res) => {
  try {
    const userId = req.user._id;

    const uploadedPDFs = await PDF.find({ owner: userId });
    if (!uploadedPDFs.length) {
      return res.status(200).json({ message: "You have no uploaded PDFs" });
    }

    res.status(200).json({ message: "Your PDFs", pdfs: uploadedPDFs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching PDFs" });
  }
};

const getPdfById = async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);
    if (!pdf || pdf.owner.toString() !== req.user._id.toString()) {
      return res.status(404).json("you don't have such pdf");
    }

    res.set("Content-Type", "application/pdf");
    console.log(pdf.data)
    res.send(pdf.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports = { handlePdfUpload, handleExtractPdf, getAllPdfs ,getPdfById };
