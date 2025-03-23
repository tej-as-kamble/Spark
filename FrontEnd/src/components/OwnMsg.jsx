import React, { useEffect, useState, useRef } from "react";
import profileImage from '../assets/Profile Image.png';

const l = 7; // limit

function OthersMsg(channelData) {
    // console.log(channelData);
    const { username } = channelData;

    const [AllMsg, setAllMsg] = useState([]);
    const [ChannelData, setChannelData] = useState([]);
    const [start, setStart] = useState(null);
    const [hideLoadMore, setHideLoadMore] = useState(false);
    const [loading, setLoading] = useState(0);
    const observerRef = useRef(null);
    const scrollableDivRef = useRef(null);


    const channel = async () => {
        try {
            const response = await fetch(`https://spark-zgmc.onrender.com/fetch-all-channels?channel=${username}`, {
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
                const response = await fetch(`https://spark-zgmc.onrender.com/channel/coutnMsg?username=${username}`, {
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
            }finally {
                setLoading(loading+1);  // Set loading to false after request completion
            }
        };
        count();
        channel();
    }, [username]);



    const getMsg = async () => {
        // console.log("getMsg Start: ", start);
        try {
            const response = await fetch(`https://spark-zgmc.onrender.com/channel/get-messages?username=${username}&start=${Math.max(start, 0)}&limit=${start > 0 ? l : Math.max(start + l, 1)}`, {
                method: 'GET'
            });

            if (response) {
                const data = await response.json();
                // console.log(data.length);

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
        } finally {
            setLoading(loading+1);
        }
    };

    // useEffect(() => {
    //     console.log("start: ", start);
    // }, [start]);

    const loadMore = () => {
        // console.log("loading more");
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
    }, [loading]);

    return (
        <div ref={scrollableDivRef} className="own-msg">
            {
                AllMsg.map((msg, index) => (
                        <div className="each-own-msg">
                            <div key={index} className="msg">
                                <p>{msg.content}</p>
                            </div>
                            <div className="msg-time">
                                <p>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                ))
            }
            <div ref={observerRef} style={{ height: "1px", color: "transparent" }}>loading</div>
        </div>
    );
}

export default OthersMsg;
