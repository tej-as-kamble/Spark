import { IconButton } from '@mui/material';
import profileImage from '../assets/Profile Image.png';
import GroupAddIcon from '@mui/icons-material/GroupAdd';// before added to grp
import GroupRemoveIcon from '@mui/icons-material/GroupRemove'; //after added to grp

function MsgContainerFan(ind){
    const arr = [
        {   
            name: "MS Dhoni",
            username: "mahi07",
            msg: "Kaise ho aap?",
            time: "07:07 AM"
        },
        {   
            name: "Virat Kohli",
            username: "viratkohli18",
            msg: "Aur kya haal?",
            time: "18:49 PM"
        },
        { 
            name: "Ronaldo", 
            username: "cr07",
            msg: "Hey WhatsUp bro",
            time: "07:18 AM"
        },
        { 
            name: "Salman Khan", 
            username: "salmankhan",
            msg: "Aa jau kya apni par?🤬",
            time: "02:15 PM"
        },
        {   
            name: "MS Dhoni",
            username: "mahi07",
            msg: "Kaise ho aap?",
            time: "07:07 AM"
        },
        {   
            name: "Virat Kohli",
            username: "viratkohli18",
            msg: "Aur kya haal?",
            time: "18:49 PM" 
        },
        { 
            name: "Ronaldo", 
            username: "cr07", 
            msg: "Hey WhatsUp bro",
            time: "07:18 AM"
        },
        { 
            name: "Salman Khan", 
            username: "salmankhan",
            msg: "Aa jau kya apni par?🤬",
            time: "02:15 PM"
        },
        {   
            name: "MS Dhoni",
            username: "mahi07",
            msg: "Kaise ho aap?",
            time: "07:07 AM" 
        },
        {   
            name: "Virat Kohli",
            username: "viratkohli18",
            msg: "Aur kya haal?",
            time: "18:49 PM" 
        },
        { 
            name: "Ronaldo", 
            username: "cr07", 
            msg: "Hey WhatsUp bro",
            time: "07:18 AM"
        },
        { 
            name: "Salman Khan", 
            username: "salmankhan",
            msg: "Aa jau kya apni par?🤬",
            time: "02:15 PM"
        },
        {   
            name: "MS Dhoni",
            username: "mahi07",
            msg: "Kaise ho aap?",
            time: "07:07 AM" 
        },
        {   
            name: "Virat Kohli",
            username: "viratkohli18",
            msg: "Aur kya haal?",
            time: "18:49 PM"
        },
        { 
            name: "Ronaldo", 
            username: "cr07", 
            msg: "Hey WhatsUp bro",
            time: "07:18 AM"
        },
        { 
            name: "Salman Khan", 
            username: "salmankhan",
            msg: "Aa jau kya apni par?🤬",
            time: "02:15 PM"
        },
        {   
            name: "MS Dhoni",
            username: "mahi07",
            msg: "Kaise ho aap?",
            time: "07:07 AM" 
        },
        {   
            name: "Virat Kohli",
            username: "viratkohli18",
            msg: "Aur kya haal?",
            time: "18:49 PM"
        },
        { 
            name: "Ronaldo", 
            username: "cr07", 
            msg: "Hey WhatsUp bro",
            time: "07:18 AM"
        },
        { 
            name: "Salman Khan", 
            username: "salmankhan",
            msg: "Aa jau kya apni par?🤬",
            time: "02:15 PM"
        },
        {   
            name: "MS Dhoni",
            username: "mahi07",
            msg: "Kaise ho aap?",
            time: "07:07 AM" 
        },
        {   
            name: "Virat Kohli",
            username: "viratkohli18",
            msg: "Aur kya haal?",
            time: "18:49 PM" 
        },
        { 
            name: "Ronaldo", 
            username: "cr07", 
            msg: "Hey WhatsUp bro",
            time: "07:18 AM"
        },
        { 
            name: "Salman Khan", 
            username: "salmankhan",
            msg: "Aa jau kya apni par?🤬",
            time: "02:15 PM"
        }
    ];
    return(
        <div className="msg-container-user">
            <div className='channel-info'>
                <img src={profileImage} alt="profile" className='profile-pic'/>
                <div>
                    <h3>{arr[ind.ind].name}</h3>
                    <p className='username'>@{arr[ind.ind].username}</p>
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