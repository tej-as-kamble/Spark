import { IconButton } from '@mui/material';
import profileImage from '../assets/Profile Image.png';
import GroupAddIcon from '@mui/icons-material/GroupAdd';// before added to grp
import GroupRemoveIcon from '@mui/icons-material/GroupRemove'; //after added to grp

function MsgContainerFan(ind){
    const arr = [
        {   
           name: "MS Dhoni",
            msg: "Kaise ho aap?",
            time: "07:07 AM",
            followers: "7.7M"
        },
        {   
            name: "Virat Kohli",
            msg: "Aur kya haal?",
            time: "18:49 PM",
            followers: "230.5M"
        },
        { 
            name: "Ronaldo", 
            msg: "Hey WhatsUp bro",
            time: "07:18 AM",
            followers: "651.5M"
        },
        { 
            name: "Salman Khan", 
            msg: "Aa jau kya apni par?🤬",
            time: "02:15 PM",
            followers: "18M"
        },
        {   
           name: "MS Dhoni",
            msg: "Kaise ho aap?",
            time: "07:07 AM",
            followers: "7.7M"
        },
        {   
            name: "Virat Kohli",
            msg: "Aur kya haal?",
            time: "18:49 PM",
            followers: "230.5M" 
        },
        { 
            name: "Ronaldo", 
            msg: "Hey WhatsUp bro",
            time: "07:18 AM",
            followers: "651.5M"

        },
        { 
            name: "Salman Khan", 
            msg: "Aa jau kya apni par?🤬",
            time: "02:15 PM",
            followers: "18M"
        },
        {   
           name: "MS Dhoni",
            msg: "Kaise ho aap?",
            time: "07:07 AM",
            followers: "7.7M" 
        },
        {   
            name: "Virat Kohli",
            msg: "Aur kya haal?",
            time: "18:49 PM",
            followers: "230.5M" 
        },
        { 
            name: "Ronaldo", 
            msg: "Hey WhatsUp bro",
            time: "07:18 AM",
            followers: "651.5M"
        },
        { 
            name: "Salman Khan", 
            msg: "Aa jau kya apni par?🤬",
            time: "02:15 PM",
            followers: "18M"
        },
        {   
           name: "MS Dhoni",
            msg: "Kaise ho aap?",
            time: "07:07 AM",
            followers: "7.7M" 
        },
        {   
            name: "Virat Kohli",
            msg: "Aur kya haal?",
            time: "18:49 PM",
            followers: "230.5M"
        },
        { 
            name: "Ronaldo", 
            msg: "Hey WhatsUp bro",
            time: "07:18 AM",
            followers: "651.5M"
        },
        { 
            name: "Salman Khan", 
            msg: "Aa jau kya apni par?🤬",
            time: "02:15 PM",
            followers: "18M"
        },
        {   
           name: "MS Dhoni",
            msg: "Kaise ho aap?",
            time: "07:07 AM",
            followers: "7.7M" 
        },
        {   
            name: "Virat Kohli",
            msg: "Aur kya haal?",
            time: "18:49 PM",
            followers: "230.5M"
        },
        { 
            name: "Ronaldo", 
            msg: "Hey WhatsUp bro",
            time: "07:18 AM",
            followers: "651.5M"
        },
        { 
            name: "Salman Khan", 
            msg: "Aa jau kya apni par?🤬",
            time: "02:15 PM",
            followers: "18M"
        },
        {   
           name: "MS Dhoni",
            msg: "Kaise ho aap?",
            time: "07:07 AM",
            followers: "7.7M" 
        },
        {   
            name: "Virat Kohli",
            msg: "Aur kya haal?",
            time: "18:49 PM",
            followers: "230.5M" 
        },
        { 
            name: "Ronaldo", 
            msg: "Hey WhatsUp bro",
            time: "07:18 AM",
            followers: "651.5M"
        },
        { 
            name: "Salman Khan", 
            msg: "Aa jau kya apni par?🤬",
            time: "02:15 PM",
            followers: "18M"
        }
    ];
    return(
        <div className="msg-container-user">
            <div className='channel-info'>
                <img src={profileImage} alt="profile" className='profile-pic'/>
                <div>
                    <h3>{arr[ind.ind].name}</h3>
                    <p className='followers'>{arr[ind.ind].followers}</p>
                </div>
            </div>
            <div className='follow-bnt'>
                <IconButton title="Add">
                    <GroupAddIcon className='icon'/>
                </IconButton>
                {/* <IconButton title="Leave">
                    <GroupRemoveIcon className='follow-icon icon'/>
                </IconButton> */}
            </div>
        </div>
    )
}

export default MsgContainerFan