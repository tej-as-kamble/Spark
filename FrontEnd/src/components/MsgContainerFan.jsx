import React, { useEffect, useState } from "react";
import { IconButton } from '@mui/material';
import profileImage from '../assets/Profile Image.png';
import GroupAddIcon from '@mui/icons-material/GroupAdd';// before added to grp
import GroupRemoveIcon from '@mui/icons-material/GroupRemove'; //after added to grp

function MsgContainerFan({channelUsername}){
    const [ChannelData, setChannelData] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);

    const channel = async () => {
        try {
            const response = await fetch(`https://spark-zgmc.onrender.com/fetch-all-channels?channel=${channelUsername}`, {
                method: 'GET',
            });
            const data = await response.json();
            // console.log(data);
            if(data) setChannelData(data);
        } catch (error) {
            console.error("Error fetching all channels data:", error);
        }
    };


    const isFollowingChannel = async () => {
        try {
            const response = await fetch(`https://spark-zgmc.onrender.com/user/fetch-following?channel=${channelUsername}`, {
                method: 'GET',
                credentials: "include",
            });
            if(response.ok){
                const data = await response.json();
                // console.log(data);
                if(data) setIsFollowing(true);
                else setIsFollowing(false);
            }
        } catch (error) {
            console.error("Error checking following status:", error);
        }
    };
    

    const handleFollowUnfollow = async () => {
        if(!document.cookie.includes("token")){
            return alert("Login to follow your favorite celebrity");
        }
        try {
            const reqFor = isFollowing ? "unfollow" : "follow";
            const response = await fetch('https://spark-zgmc.onrender.com/user/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    channelUsername: channelUsername,
                    reqFor: reqFor,
                }),
                credentials: 'include',
            });

            if (response.ok) {
                // const data = await response.json();
                // console.log(data);
                setIsFollowing(!isFollowing);
            }
            else{
                console.error("Error following/unfollowing channel:", error);
            }
        } catch (error) {
            console.error("Error following/unfollowing channel:", error);
        }
    };


    useEffect(() => {
        channel();
        if(document.cookie.includes("token")) isFollowingChannel();
    }, [channelUsername]);
    
    return(
        <div className="msg-container-user">
            <div className='channel-info'>
                <img 
                    src={ChannelData.profileImage ? `data:image/png;base64,${ChannelData.profileImage}` : profileImage} alt="profile" className='profile-pic' 
                />
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