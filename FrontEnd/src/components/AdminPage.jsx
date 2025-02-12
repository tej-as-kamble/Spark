import React, { useEffect, useRef, useState } from "react";
import profileImage from '../assets/Profile Image.png';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { red, pink, yellow } from '@mui/material/colors';

let s = 0; //start
const l = 1; //limit

function AdminPage() {
    const [verifications, setVerifications] = useState([]);
    const [pendingData, setPendingData] = useState([]);
    const [verifiedData, setVerifiedData] = useState([]);
    const [pendingStart, setPendingStart] = useState(s);
    const [verifiedStart, setVerifiedStart] = useState(s);
    const [pendingBtn, setPendingBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [hidePendingLoadMore, setHidePendingLoadMore] = useState(false);
    const [hideVerifiedLoadMore, setHideVerifiedLoadMore] = useState(false);
    const [cntUser, setCntUser] = useState(0);
    const [cntCH, setCntCH] = useState(0);
    const [cntVeri, setCntVeri] = useState(0);
    const observerRef = useRef(null);

    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log(userData);

    const fetchCounts = async (reqFor)=>{
        try {
            const response = await fetch(`http://localhost:5000/admin/countUsers?reqFor=${reqFor}`, {
                method: 'GET',
                credentials: 'include'
            });
            if(response.ok){
                const data = await response.json();
                // console.log(data);

                if(reqFor === 'channels') setCntCH(data.count);
                else if(reqFor === 'verification') setCntVeri(data.count);
                else setCntUser(data.count-1);
            }
        } catch (error) {
            console.error("Error fetching verification data:", error);
        }
    }


    const fetchVerifications = async () => {
        setLoading(true);
        // console.log(pendingBtn);
        if(pendingBtn){
            if(hidePendingLoadMore){
                setVerifications(pendingData);
                return;
            }
        }
        else{
            if(hideVerifiedLoadMore){
                setVerifications(verifiedData);
                return;
            }
        }

        const start = pendingBtn ? pendingStart : verifiedStart;
        // console.log(start);
        try {
            const response = await fetch(`http://localhost:5000/admin/fetch-all-verification-data?start=${start}&limit=${l}&isVerified=${!pendingBtn}`, {
                method: 'GET',
                credentials: 'include'
            });
            // console.log(response);
            if(response.ok){
                const data = await response.json();
                // console.log(data);
                

                if(data.length<l){
                    pendingBtn ? setHidePendingLoadMore(true) : setHideVerifiedLoadMore(true);
                }

                if(pendingBtn){
                    setPendingData((prev) => {
                        const updatedPendingData = [...prev, ...data];
                        setVerifications(updatedPendingData);
                        // console.log(verifications);
                        return updatedPendingData;
                    });
                    setPendingStart((prevStart) => prevStart + l);
                }
                else{
                    setVerifiedData((prev) => {
                        const updatedVerifiedData = [...prev, ...data];
                        setVerifications(updatedVerifiedData); 
                        console.log(verifications);
                        return updatedVerifiedData;
                    });                    
                    setVerifiedStart((prevStart) => prevStart + l);
                }
            }
        } catch (error) {
            console.error("Error fetching verification data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCounts('channels');
        fetchCounts('verification');
        fetchCounts('user');
    }, []);

    useEffect(() => {
        fetchVerifications();
    }, [pendingBtn]);

    const loadMore = () => {
        if(!hidePendingLoadMore || !hideVerifiedLoadMore) fetchVerifications();
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



    const createChannel = async (username) => {
        try {
            const response = await fetch('http://localhost:5000/admin/create-channel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username}),
                credentials: 'include'
            });
            if (response.ok) {
                console.log('Channel created successfully.');
                alert(`Successfully created channel for @${username}.`);
                fetchVerifications();
            } else {
                console.error("Failed to submit verification details.");
            }
        } catch (error) {
            console.error("Error submitting verification details:", error);
        }
    };

    const deleteChannel = async (username)=>{
        // console.log(username);
        try {
            const response = await fetch('http://localhost:5000/admin/delete-channel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username}),
                credentials: 'include'
            });
            if (response.ok) {
                console.log(`Successfully deleted of ${username} channel.`);
                alert(`Successfully deleted of ${username} channel.`);
                fetchVerifications();
            } else {
                console.error("Failed to submit verification details.");
            }
        } catch (error) {
            console.error("Error submitting verification details:", error);
        }
    }


    const handlePending = () => {
        setPendingBtn(true);
    }

    const handleVerified = () => {
        setPendingBtn(false);
    }

    return (
        <>
            <div className="full-details">
                <div className="profile-pic-and-name">
                    <img 
                        src={userData.profileImage ? `data:image/png;base64,${userData.profileImage}` : profileImage} alt="profile" className='admin-profile-pic'
                    />
                    <p className="verification-title">{userData.name}</p>
                    <i>Admin</i>
                </div>
                <div className="spark-info">
                    <p className="our-mission"><b>Our mission</b>: To provide efficient way for people to receive updates from their favorite celebrity they care about</p>
                    <p className="total-users"><RadioButtonCheckedIcon sx={{ color: red[500] }}/>Total users: {cntUser}</p>
                    <p className="total-channel"><ConnectedTvIcon sx={{ color: pink[500] }}/>Total verified channels: {cntCH}</p>
                    <p className="total-pending"><PendingActionsIcon sx={{ color: yellow[500] }}/>Total pending verification: {cntVeri}</p>
                </div>
            </div>

            <div className='pending-btn-div'>
                <button className={`pending-btn ${pendingBtn ? 'active-pending-btn' : ''}`} onClick={handlePending}>Pending</button>
                <button className={`pending-btn ${pendingBtn ? '' : 'active-pending-btn'}`} onClick={handleVerified}>Verified</button>
            </div>
            
            <div className="verification-page">
                <table className="verification-table">
                    <thead>
                        <tr>
                            <th className="table-header">Profile Image</th>
                            <th className="table-header">Name</th>
                            <th className="table-header">Username</th>
                            <th className="table-header">Email</th>
                            <th className="table-header">Instagram</th>
                            <th className="table-header">Channel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {verifications.map((user, index) => (
                            <tr key={index} className="table-row">
                                <td className="table-data">
                                    {verifications[index].profileImage ? (
                                        <img
                                            src={`data:image/png;base64,${verifications[index].profileImage}`}
                                            alt="Profile"
                                            className="profile-image"
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td className="table-data">{verifications[index].name}</td>
                                <td className="table-data">{verifications[index].username}</td>
                                <td className="table-data">{verifications[index].email}</td>
                                <td className="table-data">
                                    <a
                                        href={verifications[index].instagramLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="instagram-link"
                                    >
                                        Instagram
                                    </a>
                                </td>
                                <td className="table-data">
                                    {verifications[index].channel==1 ? (
                                        <button onClick={() => deleteChannel(verifications[index].username)}>
                                            Delete
                                        </button>
                                    ) : (
                                        <button onClick={() => createChannel(verifications[index].username)}>
                                            Verify
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {<tr ref={observerRef} style={{height:"20px"}} />}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AdminPage;
