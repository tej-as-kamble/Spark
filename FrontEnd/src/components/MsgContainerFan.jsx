import React, { useEffect, useState } from "react";
import { IconButton } from '@mui/material';
import profileImage from '../assets/Profile Image.png';
import GroupAddIcon from '@mui/icons-material/GroupAdd';// before added to grp
import GroupRemoveIcon from '@mui/icons-material/GroupRemove'; //after added to grp

function MsgContainerFan({channelUsername}){
    const [ChannelData, setChannelData] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const userData = JSON.parse(localStorage.getItem("userData"));

    const channel = async () => {
        try {
            const response = await fetch(`http://localhost:5000/user/all-channels?username=${channelUsername}`, {
                method: 'GET',
            });
            const data = await response.json();
            // console.log(data);
            setChannelData(data);
        } catch (error) {
            console.error("Error fetching all channels data:", error);
        }
    };


    const isFollowingChannel = async () => {
        try {
            const response = await fetch('http://localhost:5000/user/following-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userData.username,
                    password: userData.password,
                    channelUsername,
                }),
            });
            const data = await response.json();
            setIsFollowing(data.isFollowing);
        } catch (error) {
            console.error("Error checking following status:", error);
        }
    };
    

    const handleFollowUnfollow = async () => {
        try {
            const reqFor = isFollowing ? "unfollow" : "follow";
            const response = await fetch('http://localhost:5000/user/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userData.username,
                    password: userData.password,
                    channelUsername,
                    reqFor,
                }),
            });
            if (response.ok) {
                setIsFollowing(!isFollowing);
            }
        } catch (error) {
            console.error("Error following/unfollowing channel:", error);
        }
    };


    useEffect(() => {
        channel();
        isFollowingChannel();
    }, [channelUsername]);
    
    return(
        <div className="msg-container-user">
            <div className='channel-info'>
                <img src={profileImage} alt="profile" className='profile-pic'/>
                <div>
                    <h3>{ChannelData.name ? ChannelData.name : "User Not Found"}</h3>
                    <p className='username'>@{ChannelData.username ? ChannelData.username : "sparkuser"}</p>
                </div>
            </div>
            <div className="follow-bnt">
                <IconButton title={isFollowing ? "Unfollow" : "Follow"} onClick={handleFollowUnfollow}>
                    {isFollowing ? (
                        <GroupRemoveIcon fontSize="large" className="unfollow-icon" />
                    ) : (
                        <GroupAddIcon fontSize="large" className="follow-icon" />
                    )}
                </IconButton>
            </div>
        </div>
    )
}

export default MsgContainerFan