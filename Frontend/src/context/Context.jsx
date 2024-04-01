import {createContext,useEffect, useContext ,useState} from "react";
import { useNavigate } from "react-router-dom";

const userContext = createContext();

const UserProvider = ({children}) =>{
  const [userToken , setUserToken] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    const userInfo = localStorage.getItem("userToken");
    setUserToken(userInfo);

    if(!userInfo){
      navigate('/login');
    }
  },[navigate]);
  
  return <userContext.Provider value={{userToken ,setUserToken}}>
    {children}
  </userContext.Provider>
}

export const userState = ()=>{
  return useContext(userContext);
}


export default UserProvider;