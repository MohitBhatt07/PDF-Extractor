
const handlePdfUpload = async (req,res)=>{
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
    const pageNumbers = req.params.pageNumbers.split(',');
    const filePath = path.join(__dirname, 'uploads', req.file?.filename); // Adjust based on storage logic

    const existingPdf = await pdf.getDocument(filePath);
    const pages = [];
    for (const pageNumber of pageNumbers) {
      const page = await existingPdf.getPage(pageNumber);
      pages.push(page);
    }

    const extractedPdf = await pdf.createDocument();
    pages.forEach((page) => extractedPdf.addPage(page));

    const extractedPdfBytes = await extractedPdf.save();
    res.json({ url: 'your-download-url' });
  } catch (error) {
    console.error('Error extracting pages:', error);
    res.status(500).json({ message: 'Error extracting pages' });
  }
}

module.exports = { handlePdfUpload , handleExtractPdf}