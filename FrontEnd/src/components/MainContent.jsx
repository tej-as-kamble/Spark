import { useState, useEffect, useRef } from "react";
import "./MainContent.css";
import logoSpark from '../assets/logo.png'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; //if account is verified
import GppMaybeIcon from '@mui/icons-material/GppMaybe'; //if account is not verified
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck'; //if account vefication is under process
import NotificationsIcon from '@mui/icons-material/Notifications';
import LoginButton from './LoginButton.jsx';
import { IconButton } from "@mui/material";
import MsgContainerFan from './MsgContainerFan';
import MsgContainerCelebrity from './MsgContainerCelebrity.jsx';
import WelcomePage from "./WelcomePage.jsx";
import { Outlet, useLocation, Link} from "react-router-dom";
import ProfileClick from "./ProfileClick.jsx";
import Admin from "./Admin.jsx";


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

                        {userData && userData.channel==1 ? (
                            <Link to={`/channels/${userData.username}`} title="channels">
                                <button className="chat-now-btn"><i>Chat Now</i></button>
                            </Link>
                        ) : 
                        userData && userData.username == "admin" ? (
                                <Link to={`/${userData.username}`} title="channels">
                                <button className="chat-now-btn"><i>Admin</i></button>
                            </Link>
                            ) :
                                null
                        }
                    </div>
                    <div className="notification-profile-icons">
                        {userData ? (
                            userData.channel ? (
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

                        {<ProfileClick/>}
                    </div>
                </div>

                {(pathParts[1] === 'admin') && <Admin/> }

                {(location.pathname === '/') && <WelcomePage/> }

                {(pathParts.length>2 && pathParts[1] === 'channels') && 
                    <div className="msg-container">
                        <Outlet />
                    </div>
                }

                {(userData?.channel==1 && userData?.username===pathParts[2]) ? 
                    (pathParts.length>2 &&
                        <div className="msg-and-info-container">
                            <MsgContainerCelebrity/>
                        </div> 
                     ) :
                    (pathParts.length>2 && 
                        <div className="msg-and-info-container">
                            <MsgContainerFan channelUsername={pathParts[2]}/>
                        </div>
                    )
                }
                
            </div>
        </>
    )
}

export default MainContent
