import profileImage from '../assets/Profile Image.png';

function OthersMsg(){
    const arr = [
        {   
            msg: "Kaise ho aap?", 
            time: "07:07 AM"
        },
        {
            msg: "Kaise ho aap?",
            time: "07:07 AM"
        },
        {
            msg: "Kaise ho aap?",
            time: "07:07 AM"
        },
        {
            msg: "Kaise ho aap?",
            time: "07:07 AM"
        },
        {
            msg: "Kaise ho aap?",
            time: "07:07 AM"
        },
        {
            msg: "Kaise ho aap?",
            time: "07:07 AM"
        },
        {
            msg: "Kaise ho aap? shfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf " ,
            time: "07:07 AM"
        },
        {
            msg: "Kaise ho aap?",
            time: "07:07 AM"
        },
        {
            msg: "Kaise ho aap?",
            time: "07:07 AM"
        },
        {
            msg: "Kaise ho aap?",
            time: "07:07 AM"
        },
        {
            msg: "Kaise ho aap?",
            time: "07:07 AM"
        },
        {
            msg: "Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf Kaise ho aap? ashfadfnadfkjadf af faf ",
            time: "07:07 AM"
        },
        {
            msg: "Kaise ho aap?",
            time: "07:07 AM"
        },
        {
            msg: "Kaise ho aap?",
            time: "07:07 AM"
        },
        {
            msg: "Kaise ho aap?",
            time: "07:07 AM"
        }
    ]
    return(
        <div className="other-msg">
            {arr.map((massage, index) => (
                <div key={index} className='profile-img-and-msg'>
                    <div className='msg-profile-img'>
                        <img src={profileImage} alt="img" />
                    </div>
                    <div className="each-others-msg">
                        <div key={index} className="msg">
                            <p>{massage.msg}</p>
                        </div>
                        <div className="msg-time">
                            <p>{massage.time}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OthersMsg