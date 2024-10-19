import { IconButton } from '@mui/material';
import profileImage from '../assets/Profile Image.png';
import GroupAddIcon from '@mui/icons-material/GroupAdd';// before added to grp
import GroupRemoveIcon from '@mui/icons-material/GroupRemove'; //after added to grp
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

function MsgContainerFan(){
    return(
        <div className="msg-container-user">
            <div className='channel-info'>
                <img src={profileImage} alt="profile" className='profile-pic'/>
                <div>
                    <h3>MS Dhoni</h3>
                    <p className='followers'>1.7M</p>
                </div>
            </div>
            <div className='follow-bnt'>
                <IconButton>
                    <GroupAddIcon className='icon'/>
                    {/* <GroupRemoveIcon className='follow-icon icon'/> */}
                </IconButton>
            </div>
        </div>
    )
}

export default MsgContainerFan