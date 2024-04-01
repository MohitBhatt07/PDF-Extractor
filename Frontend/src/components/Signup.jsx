import React from "react";
import { Link, NavLink } from "react-router-dom";

const defaultData = {
  username : "",
  password : ""
}
const Signup = () => {
  const [formData , setFormData] = useState(defaultData);
  const [isLoading,  setIsLoading] = useState(false);
  
  return (
    <div className="animate-slide-in-elliptic-top-fwd mx-auto max-w-[400px] space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">PDF EXTRactor</h1>
        <p className="text-gray-500 dark:text-gray-400">
          SIGN UP.
        </p>
      </div>
      <div className="border rounded-lg border-gray-200 dark:border-gray-800">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label
              className="block text-sm font-medium leading-5 text-gray-700 dark:text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="block w-full p-2 h-10 transition duration-150 ease-in-out border border-gray-300 rounded form-input  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 peer-disabled:opacity-70"
              id="username"
              placeholder="Mohit123"
              type="text"
            />
          </div>
          <div className="space-y-2">
            <div className="flex flex-col justify-between">
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium leading-5 text-gray-700 dark:text-gray-300"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="block w-full h-10 transition duration-150 ease-in-out border border-gray-300 rounded form-input dark:border-gray-700 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 peer-disabled:opacity-70"
                  id="password"
                  type="password"
                />
              </div>
              
            </div>
          </div>
          <button className="w-full bg-gray-600 text-white rounded-md p-2">
            Signup
          </button>
        </div>
        <hr className="border-t border-gray-200 dark:border-gray-800" />
      </div>
      <div className="space-y-2 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Already have account?
        </p>
        <div className="w-full flex justify-center  items-center ">
          <Link 
            className="w-1/2 bg-gray-400 hover:bg-gray-600  text-white rounded-md p-2 inline-block justify-start  peer-disabled:opacity-70"
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
