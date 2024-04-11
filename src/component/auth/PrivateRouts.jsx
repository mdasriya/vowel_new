import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRouts({children}) {
    const {Token} = useSelector((state) => state.auth)

    if(Token != null)
        return children;
    else 
        return <Navigate to={"/login"} />
} 

export  default PrivateRouts