const { PDFDocument } = require("pdf-lib");
const path = require("path");
const fs = require("fs");
const User = require("../model/userModel");
const { v4: uuidv4 } = require("uuid");
const PDF = require("../model/pdfModel");

const handlePdfUpload = async (req, res) => {
  try {
    const filename = req.body.filename;
    const existingFile = await PDF.find({ filename: filename });
    if (Object.keys(existingFile).length !== 0) {
      try {
        await fs.promises.unlink(req.file.path); 
      } catch (error) {
        console.error("Error deleting temporary file:", error);
      }
      res.status(409).json({ message: "Same name file already exists" });
      return;
    }
    const data = await fs.promises.readFile(req.file.path);
    const userId = req.user._id;
    const uploadsDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    const uniqueFilename = `${filename}.pdf`;
    const filePath = path.join(uploadsDir, uniqueFilename);
    await fs.promises.rename(req.file.path, filePath);
    const pdf = new PDF({ filename: uniqueFilename, data, owner: userId });
    await pdf.save();
    res
      .status(201)
      .json({ message: "PDF uploaded successfully", pdfId: pdf._id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleExtractPdf = async (req, res) => {
  try {
    const pdfName = req.body.filename;
    const id = req.body.id;
    const pageString = req.body.pages || '';
    const pages = pageString.split(',').map(Number);
    const pdf = await PDF.findById(id);
    const alreadySameNamePdf = await PDF.findOne({filename : `${pdfName}.pdf`});
  
    if (alreadySameNamePdf && Object.keys(alreadySameNamePdf).length !== 0){
      const error = new Error('A PDF with the same name already exists');
      return res.status(409).json({ error: error.message });
    }
    
    if (!pdf || pdf.owner.toString() !== req.user._id.toString()) {
      const error = new Error('PDF not found or unauthorized');
      error.statusCode = 404; 
      return res.status(404).json({ error});
    }
    const pdfDoc = await PDFDocument.load(pdf.data);
    const newPdfDoc = await PDFDocument.create();

    for (let i = 0; i < pages.length; i++) {
      const [existingPdfPage] = await newPdfDoc.copyPages(pdfDoc, [
        pages[i] - 1,
      ]);
      newPdfDoc.addPage(existingPdfPage);
    }
    
    const newPdfBytes = await newPdfDoc.save();
    const newPdfBuffer = Buffer.from(newPdfBytes);
    const extractedPdf = new PDF({
      filename: `${pdfName}.pdf`,
      data: newPdfBuffer,
      owner: pdf.owner,
    });
    await extractedPdf.save();

    const extractedPdfFilePath = path.join(
      "uploads",
      `${pdfName}.pdf`
    );
    fs.writeFileSync(extractedPdfFilePath, newPdfBuffer);

    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", 'attachment; filename="extracted.pdf"');
    res.send(newPdfBuffer);
  } catch (err) {
    const error = new Error('Internal server error');
    console.log(error);
    error.statusCode = 500; 
    res.status(500).json({ error: error.message });
  }
};

const getAllPdfs = async (req, res) => {
  try {
    const userId = req.user._id;
    const uploadedPDFs = await PDF.find({ owner: userId }).select('_id filename owner');
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
module.exports = { handlePdfUpload, handleExtractPdf, getAllPdfs, getPdfById };
