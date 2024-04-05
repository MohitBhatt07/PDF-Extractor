import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import PdfUpload from "./components/PdfUpload";
import UserProvider from "./context/Context";
import PdfViewer from "./components/PdfViewer";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import { PrivateLayout } from "./Layout/Layouts";

function App() {
  return (
    <div>
      <Router>
        <UserProvider>
          <Routes>
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" index element={<Login />} />
            <Route element={ <PrivateLayout/>}>
              <Route path="/" element={<LandingPage />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/upload" element={<PdfUpload />} />
              <Route path="/pdf/:id" element={<PdfViewer />} />
            </Route>
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
