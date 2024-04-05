import React, { useState } from "react";
import Logo from "../assets/docuflow.png";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/Context";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let { user } = UserState();
  if (Object.keys(user).length === 0) {
    user = null;
  }
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
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

      <div className="flex items-center ">
        <a href="/upload" className="rounded-md bg-red-600 p-2 text-white mx-4">
          Upload
        </a>

        <div className="relative ">
          {user === null ? (
            <button
              className="text-white mx-4 bg-gray-400 rounded-md p-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <>
              <button
                className="text-white mx-4 flex items-center bg-green-500 rounded-full px-4 py-3"
                onClick={toggleDropdown}
              >
                {user.username.slice(0, 1)}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-2">
                    <p className="px-4 py-2 text-sm text-gray-700">
                      Logged in as:{" "}
                      <span className="font-bold">{user.username}</span>
                    </p>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-black-700 hover:bg-blue-100"
                      onClick={() => {
                        navigate("/dashboard");
                        toggleDropdown();
                      }}
                    >
                      Dashboard
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
