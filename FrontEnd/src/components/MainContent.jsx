import "./MainContent.css";
import logoSpark from '../assets/logo.png'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; //if account is verified
import GppMaybeIcon from '@mui/icons-material/GppMaybe'; //if account is not verified
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck'; //if account vefication is under process
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginButton from './LoginButton.jsx';
import { IconButton } from "@mui/material";
import MsgContainerFan from './MsgContainerFan';
import MsgContainerCelebrity from './MsgContainerCelebrity.jsx';
import WelcomePage from "./WelcomePage.jsx";
import { Outlet, useLocation, Link} from "react-router-dom";
import { useState } from "react";


function MainContent(){
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    // console.log(pathParts);

    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log(userData);

    const [message, setMessage] = useState('');
    const showVerificationMsg = (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage('');
        }, 1500);
    };
    return (
        <>
            <div className="main-content">
                <div className="nav-bar">
                    <div className="logo">
                        <a href="/" title="Logo">
                            <img src={logoSpark} alt="" />
                        </a>
                        <a href="/" title="Brand Name">
                            <h2>Spark</h2>
                        </a>

                        {userData && (userData.channelID?.length > 0) ? (
                            <Link to={`/channels/${userData.channelID}`} title="channels">
                                <button className="chat-now-btn"><i>Chat Now</i></button>
                            </Link>
                        ) : 
                            null
                        }
                    </div>
                    <div className="notification-profile-icons">
                        {userData ? (
                            userData.channelID?.length > 0 ? (
                                <IconButton onClick={() => { showVerificationMsg('Account is verified'); }}>
                                    {message && <p style={{ color: 'white', fontSize: "16px" }}>{message}</p>}
                                    <VerifiedUserIcon fontSize="medium" className="verification-icon" />
                                </IconButton>
                            ) 
                            : (
                                <Link to="/verification" title="verification">
                                    <IconButton>
                                        <GppMaybeIcon fontSize="medium" className="verification-icon" />
                                    </IconButton>
                                </Link>
                            )
                        ) 
                        : (
                            <Link to="/verification" title="verification">
                                    <IconButton>
                                        <GppMaybeIcon fontSize="medium" className="verification-icon" />
                                    </IconButton>
                            </Link>
                        )
                        }
                        {/* <IconButton onClick={()=>{showVerificationMsg("Verification is in Proccess")}}>
                            {message && <p style={{ color: 'white', fontSize: "16px" }}>{message}</p>}
                            <SafetyCheckIcon fontSize="medium" className="verification-icon"/>
                        </IconButton> */}


                        <IconButton title="Notification">
                            <NotificationsIcon fontSize="medium" className="notification-icon icon"/>
                        </IconButton>

                        {userData ? (
                            userData.profileImage?.length > 0 ? (
                                <IconButton title="Profile">
                                    <img src={userData.profileImage} alt="profile" className="nav-profile-pic"/>
                                </IconButton>
                            ) 
                            : (
                                <IconButton title="Profile">
                                    <AccountCircleIcon fontSize="large" className="profile-icon icon"/>
                                </IconButton>
                            )
                        ) 
                        : (
                            <Link to="/login" title="Login">
                                <LoginButton loginSignup="Login" />
                            </Link>
                        )
                        }
                    </div>
                </div>

                {(location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/verification') && <Outlet />}

                <div className="msg-container">
                    {(location.pathname === '/') && <WelcomePage/> }
                    {(pathParts.length>2 && pathParts[1] === 'channels') && <Outlet />}
                </div>
                <div className="msg-and-info-container">
                    {/* pass id of the celebrity for name and followers*/} 
                    {pathParts.length>2 && <MsgContainerFan channelUsername={pathParts[2]}/>}
                    {/* {pathParts.length>2 && <MsgContainerCelebrity/>} */}
                </div>
                
            </div>
        </>
    )
}

export default MainContent
