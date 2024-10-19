import "./MainContent.css";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; //if account is verified
import GppMaybeIcon from '@mui/icons-material/GppMaybe'; //if account is not verified
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck'; //if account vefication is under process
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from "@mui/material";
import MsgContainerFan from './MsgContainerFan';
import MsgContainerCelebrity from './MsgContainerCelebrity.jsx';
import OwnMsg from "./OwnMsg.jsx";
import OthersMsg from "./OthersMsg.jsx";


function MainContent(){
    return (
        <div className="main-content">
            <div className="nav-bar">
                <div >
                <IconButton>
                    logo + Spark
                </IconButton>
                </div>
                <div className="notification-profile-icons">
                    <IconButton>
                        <VerifiedUserIcon fontSize="medium" className="verification-icon"/>
                        {/* <GppMaybeIcon fontSize="medium" className="verification-icon"/> */}
                        {/* <SafetyCheckIcon fontSize="medium" className="verification-icon"/> */}
                    </IconButton>
                    <IconButton>
                    <NotificationsIcon fontSize="medium" className="notification-icon icon"/>
                    </IconButton>
                    <IconButton>
                    <AccountCircleIcon fontSize="large" className="profile-icon icon"/>
                    </IconButton>
                </div>
            </div>

            <div className="msg-container">
                <div className="all-msg">
                    {/* <OwnMsg /> */}
                    <OthersMsg/>
                </div>
            </div>
            <div className="msg-and-info-container">
                <MsgContainerFan/>
                {/* <MsgContainerCelebrity/> */}
            </div>
        </div>
    )
}

export default MainContent
