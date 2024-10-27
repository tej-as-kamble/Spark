import { IconButton } from '@mui/material';
import profileImage from '../assets/Profile Image.png';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

function MsgContainerCelebrity(){
    return(
        <div className="msg-container-user">
            <div className='channel-info'>
                <img src={profileImage} alt="profile" className='profile-pic'/>
            </div>
            <div className='msg-typing-box'>
                <IconButton>
                    <EmojiEmotionsOutlinedIcon className='icon opacity-half'/>
                </IconButton>

                <input placeholder='Massage'/>

                <IconButton>
                    <AttachFileOutlinedIcon className='icon opacity-half' />
                </IconButton>
                <IconButton>
                    <ImageOutlinedIcon className='icon opacity-half' />
                </IconButton>
                <IconButton>
                    <SendOutlinedIcon fontSize="large" className='send-icon '/>
                </IconButton>
            </div>
        </div>
    )
}

export default MsgContainerCelebrity