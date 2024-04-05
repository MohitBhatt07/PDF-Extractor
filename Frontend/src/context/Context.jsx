import {createContext,useEffect, useContext ,useState} from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({children}) =>{
  const [user, setUser] = useState({});
  const [isLoggedIn , setIsLoggedIn ] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("user"));
    // if(!userInfo){
    //   navigate('/login');
    // }
    setUser(userInfo);
  },[navigate]);
  
  return <UserContext.Provider value={{user,setUser , isLoggedIn , setIsLoggedIn}}>
    {children}
  </UserContext.Provider>
}

export const UserState = ()=>{
  return useContext(UserContext);
}


export default UserProvider;