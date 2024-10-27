function OwnMsg(){
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
        <div className="own-msg">
            {arr.map((massage, index) => (
                <div key={index} className="each-own-msg">
                    <div key={index} className="msg">
                        <p>{massage.msg}</p>
                    </div>
                    <div className="msg-time">
                        <p>{massage.time}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OwnMsg