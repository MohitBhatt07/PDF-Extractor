import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/auth";
import { UserState } from "../context/Context";

const defaultData = {
  username : "",
  password : ""
}
const Login = () => {
  const [formData , setFormData] = useState(defaultData);
  const {setUser} = UserState();
  const [isLoading,  setIsLoading] = useState(false);
  const pageRoute = useNavigate();
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
   
    if (/\d/.test(formData.username) && formData.password.length > 6) {
      setIsLoading(true);
      const {data}  = await loginUser(formData);
      
      if (data.token) {
        localStorage.setItem("user",JSON.stringify( data));
        toast.success("Succesfully Login!");
        setUser(data);
        setIsLoading(false);
        pageRoute("/dashboard");
      } else {
        setIsLoading(false);
        toast.error("Invalid Credentials!");
        setFormData({ ...formData, password: "" });
      }
    } else {
      setIsLoading(false);
      toast.warning("Provide valid Credentials!");
      setFormData(defaultData);
    }
  };
  // useEffect(() => {
  //   const isValid = async () => {
  //     const data = await validUser();
  //     if (data?.user) {
  //       window.location.href = "/chats";
  //     }
  //   };
  //   isValid();
  // }, []);

  return (
    <div className="animate-slide-in-elliptic-top-fwd mx-auto max-w-[400px] space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">PDF EXTRactor</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome! Please sign in.
        </p>
      </div>
      <form onSubmit= {handleLogin} className="border rounded-lg border-gray-200 dark:border-gray-800">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label
              className="block text-sm font-medium leading-5 text-gray-700 dark:text-gray-300"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="block w-full p-2 h-10 transition duration-150 ease-in-out border border-gray-300 rounded form-input  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 peer-disabled:opacity-70"
              id="username"
              onChange={handleOnChange}
              placeholder="Mohit123"
              name="username"
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
                  name="password"
                  onChange={handleOnChange}
                  type="password"
                />
              </div>
              
            </div>
          </div>
          <button type="submit" className="w-full bg-gray-600 text-white rounded-md p-2">
            Sign in
          </button>
        </div>
        <hr className="border-t border-gray-200 dark:border-gray-800" />
      </form>
      <div className="space-y-2 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Don't have an account?
        </p>
        <div className="w-full flex justify-center  items-center ">
          <Link
            className="w-1/2 bg-gray-400 hover:bg-gray-600  text-white rounded-md p-2 inline-block justify-start  peer-disabled:opacity-70"
            to="/signup"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
