import React, { useEffect, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function AdminPage() {
    const [verifications, setVerifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchVerifications = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/user/verification-data', {
                method: 'GET',
            });
            const data = await response.json();
            setVerifications(data);
        } catch (error) {
            console.error("Error fetching verification data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVerifications();
    }, []);

    const submitDetails = async (name, username) => {
        setLoading(true);
        const userData = JSON.parse(localStorage.getItem('userData'));
        const adminId = userData?._id;

        try {
            const response = await fetch('http://localhost:5000/user/channels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, username, adminId }),
            });
            if (response.ok) {
                console.log(`Verification for ${name} submitted successfully.`);
                fetchVerifications();
            } else {
                console.error("Failed to submit verification details.");
            }
        } catch (error) {
            console.error("Error submitting verification details:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="verification-page">
                <h1 className="verification-title">Admin Verification Page</h1>
                <table className="verification-table">
                    <thead>
                        <tr>
                            <th className="table-header">Profile Image</th>
                            <th className="table-header">Name</th>
                            <th className="table-header">Username</th>
                            <th className="table-header">Email</th>
                            <th className="table-header">Instagram</th>
                            <th className="table-header">Channel ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {verifications.map((verification) => (
                            <tr key={verification._id} className="table-row">
                                <td className="table-data">
                                    {verification.profileImage ? (
                                        <img
                                            src={`data:image/png;base64,${verification.profileImage}`}
                                            alt="Profile"
                                            className="profile-image"
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td className="table-data">{verification.name}</td>
                                <td className="table-data">{verification.username}</td>
                                <td className="table-data">{verification.email}</td>
                                <td className="table-data">
                                    <a
                                        href={verification.instagramLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="instagram-link"
                                    >
                                        Instagram
                                    </a>
                                </td>
                                <td className="table-data">
                                    {verification.channelID || (
                                        <button onClick={() => submitDetails(verification.name, verification.username)}>
                                            Verify & Give Channel ID
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AdminPage;
