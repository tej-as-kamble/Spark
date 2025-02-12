import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function ProfileOptions({setProfileClick}){
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    };

    const closeIt = () => {
        setProfileClick(false);
    }

    return(
        <div className="profile-option">
            <button onClick={()=>closeIt()} id="close-icon"><CloseIcon/></button>
            <div>
                <AccountCircleIcon/>
                <button>View Profile</button>
            </div>
            <div>
                <SettingsIcon/>
                <button>Settings</button>
            </div>
            <div>
                <LogoutIcon/>
                <button onClick={() => handleNavigate("/logout")} >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default ProfileOptions;
