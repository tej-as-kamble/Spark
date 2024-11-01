import React, { useEffect, useState } from "react";
import profileImage from '../assets/Profile Image.png';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom';

function Channels({channelData}) {
    const navigate = useNavigate();

    const celebrityClick = (username) =>{
        // console.log("celebrity id =",username);
        navigate("/channels/"+username);
    }

    return (
        <div className='celebrity-list'>
            {channelData.map((user, index) => (
                <div key={index} className='each-celebrity' onClick={()=>{celebrityClick(channelData[index].username)}}>
                    <div>
                        <img src={profileImage} alt="profile" className='profile-pic'/>
                    </div>
                    <div className='main-msg'>
                        <h3>{channelData[index].name }<VerifiedIcon fontSize="" color="primary"/></h3>
                        <p className='username'>@{channelData[index].username}</p>
                        {/* <div className='last-msg'>
                            <p>{user.msg}</p>
                            <p>{user.time}</p>
                        </div> */}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Channels;
