import profileImage from '../assets/Profile Image.png';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom';

function Channels() {
    const navigate = useNavigate();
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

    const celebrityClick = (id) =>{
        console.log("celebrity id =",id);
        navigate("/channels/"+id);
    }

    return (
        <div className='celebrity-list'>
            {arr.map((user, index) => (
                <div key={index} className='each-celebrity' onClick={()=>{celebrityClick(index)}}>
                    <div>
                        <img src={profileImage} alt="profile" className='profile-pic'/>
                    </div>
                    <div className='main-msg'>
                        <h3>{user.name }<VerifiedIcon fontSize="" color="primary"/></h3>
                        <p className='username'>@{user.username}</p>
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
