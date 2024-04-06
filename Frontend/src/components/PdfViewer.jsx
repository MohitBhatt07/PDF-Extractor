import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { useParams } from "react-router-dom";
// import { userState } from "../context/Context";
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
  const user = JSON.parse(localStorage.getItem("user"));
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const url = import.meta.env.VITE_APP_SERVER_URL;
  const { id } = useParams();
  const [extractFormActive, setExtractFormActive] = useState(false);
  const [extractFilename, setExtractFilename] = useState("");
  const [formError, setFormError] = useState(false);

  const viewPdf = async () => {
    try {
      const pdfResponse = await axios.get(`${url}/api/my-pdfs/${id}`, {
        headers: {
          "Content-Type": "application/pdf",
          Authorization: `Bearer ${user.token}`,
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

  const extractNewPdf = async (event) => {
    event.preventDefault();
    try {
      const pdfName = extractFilename;
      const pdfId = id;
      const pages = selectedPages;
      const formdata = new FormData();
      formdata.append("id", pdfId);
      formdata.append("filename", pdfName);
      formdata.append("pages", pages.join(","));
      
 
      const pdfResponse = await axios.post(`${url}/api/extract`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
        responseType: "arraybuffer",
      });
      const pdfBlob = new Blob([pdfResponse.data], {
        type: "application/pdf",
      });

      const pdfUrl = URL.createObjectURL(pdfBlob);
  
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "extract.pdf";
      link.click();
      setSelectedPages([]);
      closeModal();
    } catch (err) {
      console.log(err)
      if (err.response.status === 409) {
        setFormError(true);
        return;
      }
      toast.error(err);
    }
  };
  const openModal =()=>{
    if(selectedPages.length === 0){
      toast.error("Select atleast one page");
      return;
    }
    setExtractFormActive(true);

  }
  const closeModal = () => {
    setExtractFormActive(false);
    setExtractFilename("");
  };
  return (
    <div className="mx-10 my-4">
      <div className="flex justify-between ">
        <button
          onClick={() => setEditMode(!editMode)}
          className="edit-icon hover:cursor-pointer bg-violet-200 hover:text-white  flex items-center gap-5 w-fit p-2 rounded-lg border-2 border-violet-600 hover:bg-violet-600 "
        >
          <FaRegEdit />
          EDIT PDF
        </button>
        <button
          type="submit"
          onClick={openModal}
          className="download-btn hover:cursor-pointer bg-violet-200 hover:text-white flex items-center gap-5 w-fit p-2 rounded-lg border-2 border-violet-600 hover:bg-violet-600"
        >
          <TiDownload />
          Extract pdf
        </button>
        {extractFormActive && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={closeModal}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <form onSubmit={extractNewPdf}>
                    <div>
                      <label
                        htmlFor="filename"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Filename
                      </label>
                      <input
                        type="text"
                        id="filename"
                        value={extractFilename}
                        onChange={(e) => {
                          setExtractFilename(e.target.value);
                          setFormError(false);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter filename"
                      />
                      {formError && (
                        <p className="text-sm text-red-500">
                          Already same named file existed
                        </p>
                      )}
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setExtractFormActive(false)}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Document
        className="pdf-page"
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <div
            key={index}
            className="relative flex justify-center outline-double mt-10 rounded-md"
          >
            <Page
              className=""
              key={`page_${index + 1}`}
              pageNumber={index + 1}
            />
            {editMode && (
              <div className="absolute  top-0 left-0 p-2">
                <div onClick={()=>handlePageSelection(index+1)} className="w-10 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:cursor-pointer">
                  {selectedPages.includes(index + 1) ? (
                    <span>{selectedPages.indexOf(index + 1) +1}</span>
                  ) : (
                    <input
                      className=" w-10 h-8 hover:cursor-pointer"
                      type="checkbox"
                      readOnly
                      checked={selectedPages.includes(index + 1)}
                      onChange={() => handlePageSelection(index + 1)}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </Document>
    </div>
  );
}

export default PDFViewer;
