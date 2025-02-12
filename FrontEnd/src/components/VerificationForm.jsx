import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate } from 'react-router-dom';

function SignUp() {
    const userData = JSON.parse(localStorage.getItem("userData"));

    const [formData, setFormData] = useState({ 
        name: userData.name , 
        username: userData.username, 
        email: '', 
        instagramLink: '' 
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if(formData.name.length<1 || formData.username.length<1 || formData.email.length<1 || formData.instagramLink/length<1){
            setLoading(false);
            setErrorMessage("All necesaary inputs field have not been fiiied.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/user/verify-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });
            
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setSuccessMessage('Verification request has been sent successfully.');
                // setLoading(false);
                setTimeout(() => {
                    setLoading(true);
                }, 1000);
                setTimeout(() => {
                    setLoading(false);
                    navigate(-1);  // Redirect after a short delay
                }, 1500);
            } else {
                setLoading(false);
                // console.log(data.message);
                setErrorMessage(data.message || 'Verification request failed. Please try again.');
            }
        } catch (error) {
            setLoading(false);
            setErrorMessage('An error occurred. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
    <div className="login-signup-page">
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={loading}
            >
            <CircularProgress color="inherit" />
        </Backdrop>
        <div className="all-form">
            <div className='form-close'>
                <button onClick={() => { navigate(-1); }}>
                    <CloseIcon />
                </button>
            </div>
            <div className="form">
                <h2>Verification Form:</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-content">
                        <div className="form-image">
                            {/* Take input of profile picture */}
                        </div>
                        <div className="form-name">
                            <label htmlFor="name">Name: </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                readOnly
                            />
                        </div>
                        <div className="form-username">
                            <label htmlFor="username">Username: </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                readOnly
                            />
                        </div>
                        <div className="form-email">
                            <label htmlFor="email">Email Id: </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-insta">
                            <label htmlFor="instagramLink">Instagram Link: </label>
                            <input
                                type="url"
                                name="instagramLink"
                                placeholder="Instagram Profile Link"
                                value={formData.instagramLink}
                                onChange={handleChange}
                            />
                        </div>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div className="form-page-btn">
                            <button type="submit">Verify Request</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export default SignUp;
