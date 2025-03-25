import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"));
    useEffect(() => {
        if(userData){
            alert("You have been logged out");
            // console.log("You have been logged out");
        }
        else{
            alert("You have already logged out");
            // console.log("You have already logged out");
        }
        
        localStorage.clear();
        navigate("/");
    }, []);
    
    return null;
}

export default Logout;
