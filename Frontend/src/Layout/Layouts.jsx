import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Logo from "../assets/docuflow.png";
// import { useNavigate } from "react-router-dom";

export const PublicLayout = ({ children }) => {
 
  return (
    <>
      <nav className="bg-gray-800 py-4 flex items-center justify-between">
        <div className="ml-4">
          <a
            href="/"
            className="flex items-center gap-2 text-white font-bold text-xl"
          >
            <img src={Logo} className="w-10 h-10 rounded-full" alt="" />
            DOCUVIEW
          </a>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export const PrivateLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
