const {PDFDocument} = require("pdf-lib");
const path = require("path");
const fs = require("fs");
const User = require("../model/userModel");
const { v4: uuidv4 } = require("uuid");
const PDF = require("../model/pdfModel");
const { default: mongoose } = require("mongoose");

const handlePdfUpload = async (req, res) => {
  try {
    const { filename } = req.file;
    const data = await fs.promises.readFile(req.file.path);
    const userId = req.user._id;

    const uploadsDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    const uniqueFilename = `${Date.now()}-${filename}.pdf`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    await fs.promises.rename(req.file.path, filePath);

    const pdf = new PDF({ filename: uniqueFilename, data, owner: userId });
    await pdf.save();

    res
      .status(201)
      .json({ message: "PDF uploaded successfully", pdfId: pdf._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleExtractPdf = async (req, res) => {
  try {
    const id = req.body.id;
    const pages = req.body.pages || [];
    const pdf = await PDF.findById(id);

    if (!pdf || pdf.owner.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: "PDF not found or unauthorized" });
    }

    const pdfDoc = await PDFDocument.load(pdf.data);
    const newPdfDoc = await PDFDocument.create();

    // const sortedPages = pages.sort((a, b) => a - b);
    for (let  i = 0 ;i< pages.length ;i++) {
      const [existingPdfPage] = await newPdfDoc.copyPages(pdfDoc , [pages[i]-1]);
      newPdfDoc.addPage(existingPdfPage);
    }
     
    const newPdfBytes = await newPdfDoc.save();
    const newPdfBuffer =  Buffer.from(newPdfBytes);
    const extractedPdf = new PDF({
      filename: `${pdf.filename}-extracted.pdf`,
      data: newPdfBuffer,
      owner: pdf.owner,
    });
    await extractedPdf.save();

    const extractedPdfFilePath = path.join('uploads', `${pdf._id}-extracted.pdf`);
    fs.writeFileSync(extractedPdfFilePath,newPdfBuffer);

    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", 'attachment; filename="extracted.pdf"');
    res.send(newPdfBuffer); 
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

      res.status(201).send(pdf.data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
module.exports = { handlePdfUpload, handleExtractPdf, getAllPdfs ,getPdfById };
