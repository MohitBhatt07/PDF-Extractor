import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PDFDocument } from "pdf-lib";
import PdfViewer from "./PdfViewer";
// import { userState } from "../context/Context";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

const PdfUpload = () => {
  const url = import.meta.env.VITE_APP_SERVER_URL;
  // const {}
  const user =  JSON.parse(localStorage.getItem('user'));
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPages, setPdfPages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const file= event.target.elements["pdf-file"].files[0];
    const filename = event.target.elements["filename"].value;

    if (!file || file.type !== "application/pdf") {
      setError("Please select a PDF file.");
      return;
    }
    
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename" , filename);
    console.log(formData.values);
    try {
      const response = await axios.post(`${url}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const { pdfId } = response.data;
      navigate(`/pdf/${pdfId}`);
    } catch (error) {
      toast.error('You are not logged in ');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-page flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-black">Upload PDF</h1>
        <p className="text-gray-600 mb-6">
          PDFs must be uploaded in PDF format. Max file size 10MB.
        </p>
        <form id="pdf-form" onSubmit={handleFileUpload} >
          <div className="mb-4">
            <label htmlFor="pdf-file" className="block text-gray-700 font-bold mb-2">
              Select PDF:
            </label>
            <input
              type="file"
              id="pdf-file"
              name="pdf-file"
              accept=".pdf"
              required
              className="file-input w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="filename" className="block text-gray-700 font-bold mb-2">
              Filename:
            </label>
            <input
              type="text"
              id="filename"
              name="filename"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div className="flex justify-end">
            <button
            disabled = {isUploading}
              type="submit"
              className="bg-gray-700 w-20 flex justify-center text-white py-2 px-4 rounded-md hover:bg-[#000000] focus:bg-green-500 focus:ring-4 focus:ring-green-300 transition-colors duration-300"
            >
            {isUploading ?<AiOutlineLoading3Quarters className="animate-spin" /> : "Submit"}  
            </button>
          </div>
        </form>
      </div>
      {isUploading && <p>Uploading PDF...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PdfUpload;
