import axios from "axios";
import { toast } from "react-toastify";

const API = (token) =>
  axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_URL,
    headers: { Authorization: token },
  });

export const loginUser = async (body) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_APP_SERVER_URL}/auth/login`,
      body
    );
  } catch (error) {
    console.log("error in loginuser api");
  }
};

