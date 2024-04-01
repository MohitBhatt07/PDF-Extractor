import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { useParams } from "react-router-dom";
import { userState } from "../context/Context";
import { toast } from "react-toastify";
import { PDFDocument } from "pdf-lib";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { FaRegEdit } from "react-icons/fa";
import { TiDownload } from "react-icons/ti";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function PDFViewer() {
  const [editMode, setEditMode] = useState(false);
  const [selectedPages, setSelectedPages] = useState([]);
  const userToken = localStorage.getItem("userToken");
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const url = import.meta.env.VITE_APP_SERVER_URL;
  const { id } = useParams();

  const viewPdf = async () => {
    try {
      const pdfResponse = await axios.get(`${url}/api/my-pdfs/${id}`, {
        headers: {
          "Content-Type": "application/pdf",
          Authorization: `Bearer ${userToken}`,
        },
        responseType: "arraybuffer",
      });
      const pdfBlob = new Blob([pdfResponse.data], {
        type: "application/pdf",
      });
      setPdfFile(pdfBlob);
    } catch (err) {
      toast.error("You dont have such pdf");
    }
  };

  useEffect(() => {
    viewPdf();
  }, [id]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePageSelection = (pageNumber) => {
    if (selectedPages.includes(pageNumber)) {
      setSelectedPages(selectedPages.filter((page) => page !== pageNumber));
    } else {
      setSelectedPages([...selectedPages, pageNumber]);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <button
          onClick={() => setEditMode(!editMode)}
          className="edit-icon hover:cursor-pointer bg-violet-200 hover:text-white  flex items-center gap-5 w-fit p-2 rounded-lg border-2 border-violet-600 hover:bg-violet-600 "
        >
          <FaRegEdit />
          EDIT PDF
        </button>
        <button className="download-btn hover:cursor-pointer hover:text-white flex items-center gap-5 w-fit p-2 rounded-lg border-2 border-violet-600 hover:bg-violet-600">
          <TiDownload />
          Extract pdf
        </button>
      </div>
      <Document
        className="pdf-page "
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <div
            key={index}
            className="relative flex justify-center outline-double mt-10 rounded-md"
          >
            <Page
              className="text-2xl"
              key={`page_${index + 1}`}
              pageNumber={index + 1}
            />
            {editMode && (
              <div className="absolute  top-0 left-0 p-2">
                <input
                  className=" w-10 h-8 hover:cursor-pointer"
                  type="checkbox"
                  checked={selectedPages.includes(index + 1)}
                  onChange={() => handlePageSelection(index + 1)}
                />
              </div>
            )}
          </div>
        ))}
      </Document>
    </div>
  );
}

export default PDFViewer;
