import { IconButton } from "@mui/material";
import profileImage from '../assets/Profile Image.png';
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useState } from "react";
import ProfileOptions from "./ProfileOptions";

function ProfileClick(){
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [profileClick, setProfileClick] = useState(false);

    const handleClick = ()=>{
        setProfileClick(!profileClick);
        console.log(profileClick);
    }

    return (
        <>
        {userData ? (userData.profileImage?.length>0 ? (
            <IconButton title="Profile" onClick={handleClick}>
                <img src={`data:image/png;base64,${userData.profileImage}`} alt="profile" className="nav-profile-pic"/>
            </IconButton>
            ) 
            : (
                <IconButton title="Profile" onClick={handleClick}>
                    <img 
                        src={profileImage} alt="profile" className='nav-profile-pic'
                    />
                </IconButton>
            )
        )
        : (
            <Link to="/login" title="Login">
                   <LoginButton loginSignup="Login" />
               </Link>
        )}
        {profileClick ? <ProfileOptions setProfileClick={setProfileClick}/> : <></>}
        </>
    ) 
}

export default ProfileClick;