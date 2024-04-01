import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import PdfUpload from "./components/PdfUpload";
import UserProvider from "./context/Context";
import PdfViewer from "./components/PdfViewer";
// import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

function App() {
  return (
    <div>
      <Router>
        <UserProvider>
          <Routes>
            <Route exact path="/" element={<PdfUpload />}></Route>
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" index element={<Login />} />
            <Route  path = "/pdf/:id" element = {<PdfViewer />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
{
  /* <Route path="/" element={<PdfUpload />} />
          <Route path="/extract" element={<PdfExtractor />} />
          <Route path="/download" element={<DownloadPdf />} /> */
}
{
  /* <Route path="/signup" element={<Signup />} /> */
}
