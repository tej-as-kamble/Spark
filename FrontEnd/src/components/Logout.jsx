import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        if(document.cookie.includes("token")){
            alert("You have been logged out");
            // console.log("You have been logged out");
        }
        else{
            alert("You have already logged out");
            // console.log("You have already logged out");
        }

        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.clear();
        navigate("/");
    }, []);
    
    return null;
}

export default Logout;
