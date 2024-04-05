import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GrDocumentPdf } from "react-icons/gr";
import { UserState } from "../context/Context";

const Dashboard = () => {
  const url = import.meta.env.VITE_APP_SERVER_URL;
  const [pdfs, setPdfs] = useState([]);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const {setUser} = UserState();
  const user = JSON.parse(localStorage.getItem('user')) ;
  console.log(user);
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await axios.get(`${url}/api/my-pdfs`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setPdfs(response.data.pdfs);
      } catch (error) {
        console.log(error.response.status)
        if(error.response.status === 401){
          setUser({});
          setIsError(true);
          localStorage.setItem("user" , JSON.stringify(new Object(null)));
        }
        console.error("You don't have pdfs uploaded", error);
      }
    };

    fetchPdfs();
  }, []);

  const handlePdfClick = (pdfId) => {
    navigate(`/pdf/${pdfId}`);
  };

  return (
    <div className="container mx-auto py-8">
      {!isError &&<h1 className="text-3xl font-bold mb-6">Your PDFs</h1>}
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isError ?
          <div className="error-div"> 
            <p>
            You are not logged in 
              </p>
          </div>
        :pdfs?.map((pdf) => (
          <div
            key={pdf._id}
            className="pdf-card flex flex-col bg-blue-200 py-2 hover:shadow-green-300  items-center rounded-lg shadow-lg cursor-pointer"
            onClick={() => handlePdfClick(pdf._id)}
          >
            <GrDocumentPdf className="" size={30} />
            <p className="mt-2 text-center text-gray-700 truncate">
              {pdf.filename}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
