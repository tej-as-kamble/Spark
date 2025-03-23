import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const socket = io("https://spark-zgmc.onrender.com");

function MsgOptions({ msgId, msg, setActiveMsgId }) {
    const [showEditBtn, setShowEditBtn] = useState(true);
    const [editedMsg, setEditedMsg] = useState(msg);
    const inputRef = useRef(null); 
    const optionsRef = useRef(null);
    

    const toggleEditBtn = () => {
        setShowEditBtn(prev => !prev);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    
    const deleteMsg = async () => {
        try {
            const response = await fetch("https://spark-zgmc.onrender.com/channel/delete-message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: msgId }),
                credentials: "include",
            });
    
            if (response.ok) {
                socket.emit("messageDeleted", msgId);
                setActiveMsgId(false);
            } else {
                alert("Failed to delete message!");
            }
        } catch (error) {
            alert("Error deleting message!");
            console.error("Error:", error);
        }
    };

    
    const handleEditMessage = async () => {
        try {
            const response = await fetch("https://spark-zgmc.onrender.com/channel/edit-message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: msgId, editedMsg }),
                credentials: "include",
            });
    
            if (response.ok) {
                socket.emit("messageEdited", { _id: msgId, newContent: editedMsg });
                setActiveMsgId(false);
            } else {
                alert("Failed to edit message!");
            }
        } catch (error) {
            alert("Error editing message!");
            console.error("Error:", error);
        }
    };
    

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setActiveMsgId(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setActiveMsgId]);

    return (
        <div className="msg-options-container" ref={optionsRef}>
            <button onClick={deleteMsg} className="msg-btn-delete">
                <DeleteIcon color="error" /> Delete
            </button>
            <div>
                {showEditBtn ? (
                    <button onClick={toggleEditBtn} className="msg-btn-edit">
                        <EditIcon style={{ color: "blue" }} /> Edit
                    </button>
                ) : (
                    <div className="msg-input-container">
                        <button className='emoji-icon'>
                            <EmojiEmotionsOutlinedIcon fontSize="small"/>
                        </button>
                        <input
                            ref={inputRef}
                            className="msg-input"
                            placeholder="Edit Message"
                            value={editedMsg}
                            onChange={(e) => setEditedMsg(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleEditMessage()}
                        />
                        <button onClick={handleEditMessage} className="send-btn">
                            <SendOutlinedIcon fontSize="small" className="send-icon" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MsgOptions;
