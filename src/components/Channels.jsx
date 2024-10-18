import MoodIcon from '@mui/icons-material/Mood';
import VerifiedIcon from '@mui/icons-material/Verified';

function Channels() {
    const arr = [
        {   
            name: "MS Dhoni",
            msg: "Kaise ho aap?",
            time: "07:07"
        },
        {   
            name: "Virat Kohli",
            msg: "Aur kya haal?",
            time: "18:49"
        },
        { 
            name: "Ronaldo", 
            msg: "Hey WhatsUp bro",
            time: "07:18"
        },
        { 
            name: "Salman Khan", 
            msg: "Aa jau kya apni par?🤬",
            time: "02:15"
        },
        {   
            name: "MS Dhoni",
            msg: "Kaise ho aap?",
            time: "07:07"
        },
        {   
            name: "Virat Kohli",
            msg: "Aur kya haal?",
            time: "18:49" 
        },
        { 
            name: "Ronaldo", 
            msg: "Hey WhatsUp bro",
            time: "07:18"
        },
        { 
            name: "Salman Khan", 
            msg: "Aa jau kya apni par?🤬",
            time: "02:15"
        },
        {   
            name: "MS Dhoni",
            msg: "Kaise ho aap?",
            time: "07:07" 
        },
        {   
            name: "Virat Kohli",
            msg: "Aur kya haal?",
            time: "18:49" 
        },
        { 
            name: "Ronaldo", 
            msg: "Hey WhatsUp bro",
            time: "07:18"
        },
        { 
            name: "Salman Khan", 
            msg: "Aa jau kya apni par?🤬",
            time: "02:15"
        },
        {   
            name: "MS Dhoni",
            msg: "Kaise ho aap?",
            time: "07:07" 
        },
        {   
            name: "Virat Kohli",
            msg: "Aur kya haal?",
            time: "18:49"
        },
        { 
            name: "Ronaldo", 
            msg: "Hey WhatsUp bro",
            time: "07:18"
        },
        { 
            name: "Salman Khan", 
            msg: "Aa jau kya apni par?🤬",
            time: "02:15"
        },
        {   
            name: "MS Dhoni",
            msg: "Kaise ho aap?",
            time: "07:07" 
        },
        {   
            name: "Virat Kohli",
            msg: "Aur kya haal?",
            time: "18:49"
        },
        { 
            name: "Ronaldo", 
            msg: "Hey WhatsUp bro",
            time: "07:18"
        },
        { 
            name: "Salman Khan", 
            msg: "Aa jau kya apni par?🤬",
            time: "02:15"
        },
        {   
            name: "MS Dhoni",
            msg: "Kaise ho aap?",
            time: "07:07" 
        },
        {   
            name: "Virat Kohli",
            msg: "Aur kya haal?",
            time: "18:49" 
        },
        { 
            name: "Ronaldo", 
            msg: "Hey WhatsUp bro",
            time: "07:18"
        },
        { 
            name: "Salman Khan", 
            msg: "Aa jau kya apni par?🤬",
            time: "02:15"
        }
    ];

    return (
        <div className='celebrity-list'>
            {arr.map((user, index) => (
                <div key={index} className='each-celebrity'>
                    <div>
                        <MoodIcon fontSize="large"/>
                        {/* add profile image later */}
                    </div>
                    <div className='main-msg'>
                        <h3>{user.name }<VerifiedIcon fontSize="small" color="primary"/></h3>
                        <div className='last-msg'>
                            <p>{user.msg}</p>
                            <p>{user.time}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Channels;
