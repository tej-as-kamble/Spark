import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import profileImage from '../assets/Profile Image.png';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MsgOptions from './MsgOption';
import { motion, AnimatePresence } from "framer-motion";

const socket = io("http://localhost:5000");
const l = 7; // limit

function OthersMsg(channelData) {
    // console.log(channelData);
    const { username } = channelData;

    const location = useLocation();
    const pathParts = location.pathname.split('/');
    // console.log(pathParts);

    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log(userData);

    const [AllMsg, setAllMsg] = useState([]);
    const [ChannelData, setChannelData] = useState([]);
    const [start, setStart] = useState(null);
    const [hideLoadMore, setHideLoadMore] = useState(false);
    const [activeMsgId, setActiveMsgId] = useState(null);
    const observerRef = useRef(null);
    const scrollableDivRef = useRef(null);


    const channel = async () => {
        try {
            const response = await fetch(`http://localhost:5000/fetch-all-channels?channel=${username}`, {
                method: 'GET',
            });
            const data = await response.json();
            // console.log(data);
            if(data) setChannelData(data);
        } catch (error) {
            console.error("Error fetching all channels data:", error);
        }
    };


    useEffect(() => {
        // console.log("first time");
        const count = async () => {
            try {
                const response = await fetch(`http://localhost:5000/channel/coutnMsg?username=${username}`, {
                    method: 'GET'
                });

                if (response.ok) {
                    const data = await response.json();
                    // console.log(data.CountMsg - l);
                    setAllMsg([]);
                    setStart(data.CountMsg - l);
                    setHideLoadMore(false);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        count();
        channel();
    }, [username]);



    const getMsg = async () => {
        // console.log("getMsg Start: ", start);
        try {
            const response = await fetch(`http://localhost:5000/channel/get-messages?username=${username}&start=${Math.max(start, 0)}&limit=${start > 0 ? l : Math.max(start + l, 1)}`, {
                method: 'GET'
            });

            if (response) {
                const data = await response.json();
                // console.log(data);

                if(data.length<l){
                    setHideLoadMore(true); 
                }

                if (data.length>0) {
                    setAllMsg([...AllMsg, ...(data.reverse())]);
                    setStart((prevStart) => prevStart-l);
                }
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // useEffect(() => {
    //     console.log("start: ", start);
    // }, [start]);

    // useEffect(() => {
    //     console.log(AllMsg);
    // }, [AllMsg]);

    const loadMore = () => {
        // console.log("loading more msg");
        if (!hideLoadMore && start!=null) getMsg();
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
                loadMore();
            }
          },
          {rootMargin: "100px",}
        );
    
        if (observerRef.current) {
          observer.observe(observerRef.current);
        }
    
        return () => {
          if (observerRef.current) {
            observer.unobserve(observerRef.current);
          }
        };
    });


    useEffect(() => {
        socket.on("receiveMessage", (newMessage) => {
            // console.log(newMessage);
            if (newMessage.username === username) {
                setAllMsg((prev) => [newMessage, ...prev]);  // Append new message at the bottom
            }
        });
    
        return () => socket.off("receiveMessage");
    }, []);
    

    useEffect(() => {
        socket.on("messageDeleted", (msgId) => {
            setAllMsg((prevMsgs) => prevMsgs.filter((msg) => msg._id !== msgId));
        });

        socket.on("messageEdited", ({ _id, newContent }) => {
            setAllMsg((prevMsgs) =>
                prevMsgs.map((msg) =>
                    msg._id === _id ? { ...msg, content: newContent, isEdited: true } : msg
                )
            );
        });

        return () => {
            socket.off("messageDeleted");
            socket.off("messageEdited");
        };
    }, []);
    
    


    const handleOption = (msgId) => {
        setActiveMsgId(activeMsgId === msgId ? null : msgId); // Toggle options for the clicked message
    };

    return (
        <div ref={scrollableDivRef} className="other-msg">
            <AnimatePresence>
                {AllMsg.map((msg) => (
                    <motion.div 
                        key={msg._id} 
                        layout
                        className={`profile-img-and-msg ${msg.isEdited ? 'edited' : ''} ${msg.removed ? 'removed' : ''}`} 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.8 }} 
                        transition={{ duration: 0.3 }}
                    >
                        <div className='msg-profile-img'>
                            <img src={ChannelData.profileImage ? `data:image/png;base64,${ChannelData.profileImage}` : profileImage} alt="img" />
                        </div>
                        <div className="each-others-msg">
                            <div className="msg-and-options">
                                <p className="msg">{msg.content}</p>
                                <MoreVertIcon className="hidden-option-icon" fontSize="small" onClick={() => handleOption(msg._id)}/>
                            </div>
                            <div className="msg-time">
                                <p>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                        {activeMsgId === msg._id && userData?.channel === 1 && userData?.username === pathParts[2] &&
                            <MsgOptions msgId={msg._id} msg={msg.content} setActiveMsgId={setActiveMsgId}/>
                        }
                    </motion.div>
                ))}
            </AnimatePresence>
            <div ref={observerRef} style={{ height: "1px", color: "transparent" }}>loading</div>
        </div>
    );    
}

export default OthersMsg;
