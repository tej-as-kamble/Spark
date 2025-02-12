import { useState } from 'react';
import { io } from "socket.io-client";
import { IconButton } from '@mui/material';
import profileImage from '../assets/Profile Image.png';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

const socket = io("http://localhost:5000");

function MsgContainerCelebrity() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [message, setMessage] = useState("");

    const handleSendMessage = async () => {
        if (!message.trim()) return;
    
        const newMessage = {
            username: userData?.username,
            content: message,
            createdAt: new Date().toISOString(),
        };
    
        // Emit message via Socket.IO
        socket.emit("sendMessage", newMessage);
    
        try {
            const response = await fetch("http://localhost:5000/channel/add-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ msg: message }),
            });
    
            if (!response.ok) {
                throw new Error("Failed to send message");
            }
    
            setMessage(""); // Clear input on success
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    return (
        <div className="msg-container-user">
            <div className='channel-info'>
                <img src={userData?.profileImage ? `data:image/png;base64,${userData.profileImage}` : profileImage} alt="profile" className='profile-pic'/>
            </div>
            <div className='msg-typing-box'>
                <IconButton>
                    <EmojiEmotionsOutlinedIcon className='icon opacity-half'/>
                </IconButton>

                <input 
                    placeholder='Message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />

                <IconButton>
                    <AttachFileOutlinedIcon className='icon opacity-half' />
                </IconButton>
                <IconButton>
                    <ImageOutlinedIcon className='icon opacity-half' />
                </IconButton>
                <IconButton onClick={handleSendMessage}>
                    <SendOutlinedIcon fontSize="large" className='send-icon '/>
                </IconButton>
            </div>
        </div>
    );
}

export default MsgContainerCelebrity;
