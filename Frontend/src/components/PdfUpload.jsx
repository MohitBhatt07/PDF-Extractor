import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PDFDocument } from 'pdf-lib';
import PdfViewer from './PdfViewer';
import {  userState } from '../context/Context';

const PdfUpload = () => {
  const url =import.meta.env.VITE_APP_SERVER_URL;
  const {userToken} = userState();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPages, setPdfPages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    
    if (!file || file.type !== 'application/pdf') {
      setError('Please select a PDF file.');
      return;
    }
    console.log(file);
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post(`${url}/api/upload`,  formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`
        },
        
      });
      
      console.log("yes");
      const { pdfId } = response.data;
      navigate(`/pdf/${pdfId}`);
      // const pdfResponse = await axios.get(`${url}/api/my-pdfs/${pdfId}`,{
      //   responseType: 'arraybuffer',
      //   headers:{
      //     Authorization: `Bearer ${userToken}`
      //   }
        
      // });
      // const pdfDoc = await PDFDocument.load(pdfResponse.data);
      // const pages = pdfDoc.getPages();
      // const pageImages = await Promise.all(
      //   pages.map(async (page) => {
      //     const viewport = page.getViewport({ scale: 1 });
      //     const canvas = document.createElement('canvas');
      //     const context = canvas.getContext('2d');
      //     canvas.height = viewport.height;
      //     canvas.width = viewport.width;
      //     const renderContext = {
      //       canvasContext: context,
      //       viewport,
      //     };
      //     await page.render(renderContext);
      //     return canvas.toDataURL();
      //   })
      // );
      // setPdfPages(pageImages);
      // setPdfFile({ pdfId });
      // navigate('/extract', { state: { pdfId } });
    } catch (error) {
      setError('Error uploading PDF: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload PDF</h1>
      <input type="file" onChange={handleFileUpload} accept="application/pdf" disabled={isUploading} />
      {isUploading && <p>Uploading PDF...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PdfUpload;