import React, { useEffect, useState, useRef } from "react";
import profileImage from '../assets/Profile Image.png';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom';

let s = 0; //start
const l = 1; //limit

function Channels({apiEndpoint }) {
    // console.log(apiEndpoint);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [AllChannelData, setAllChannelData] = useState([]);
    const [hideLoadMore, setHideLoadMore] = useState(false);
    const [start, setStart] = useState(s);
    const observerRef = useRef(null);

    const allChannels = async () => {
        // console.log(start);
        setLoading(true);
        try {
            const response = await fetch(`${apiEndpoint}?start=${start}&limit=${l}`, {
                method: 'GET',
                credentials: "include",
            });

            // console.log(response);

            if(response.ok){
                const data = await response.json();
                // console.log(data);

                if(data.length<l){
                    setHideLoadMore(true); 
                }

                if(data){
                    setAllChannelData([...AllChannelData, ...data]);
                    setStart((prevStart) => prevStart + l);
                }
            }
        } catch (error) {
            console.error("Error fetching all channels data:", error);
        }finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        if(!hideLoadMore) allChannels();
    }
    

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !loading) {
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


    const celebrityClick = (username, CountMsg) =>{
        // console.log("celebrity id =",username);
        navigate("/channels/"+username);
    }

    return (
        <div className='celebrity-list'>
            {AllChannelData.map((user, index) => (
                <div key={index} className='each-celebrity' onClick={()=>{celebrityClick(AllChannelData[index].username, AllChannelData[index].CountMsg)}}>
                    <div>
                        <img 
                            src={AllChannelData[index].profileImage ? `data:image/png;base64,${AllChannelData[index].profileImage}` : profileImage} alt="profile" className='profile-pic'
                        />
                    </div>
                    <div className='main-msg'>
                        <h3>{AllChannelData[index].name }<VerifiedIcon fontSize="" color="primary"/></h3>
                        <p className='username'>@{AllChannelData[index].username}</p>
                        {/* <div className='last-msg'>
                            <p>{user.msg}</p>
                            <p>{user.time}</p>
                        </div> */}
                    </div>
                </div>
            ))}
            {loading && (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            )}
            {<div ref={observerRef} style={{height:"20px"}} />}
        </div>
    );
}

export default Channels;
