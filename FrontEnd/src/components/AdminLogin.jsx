import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

function AdminLogin({onLoginSuccess}) {
    const [formData, setFormData] = useState({ username: '', password: '' });
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
        setErrorMessage('');

        if(formData.username.length<1 || formData.password.length<1){
            setLoading(false);
            setErrorMessage("All necesaary inputs field have not been fiiied.");
            return;
        }

        if(formData.username === "tejasadmin"){
            try {
                const response = await fetch('http://localhost:5000/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                const userData = await response.json();
                console.log(userData);
                if (response.ok) {
                    localStorage.setItem('userData', JSON.stringify(userData));
                    onLoginSuccess();
                } else {
                    setLoading(false);
                    setErrorMessage("Admin Credentials are wrong.");
                }
            } catch (error) {
                setLoading(false);
                setErrorMessage('Unable to connect to server. Please try again later.');
                console.error('Error:', error);
            }
        }
        else{
            setLoading(false);
            setErrorMessage('Admin Credentials are wrong.');
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
            <div className="admin-form">
                <h1>Admin</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-content">
                        <div className="form-username">
                            <label htmlFor="username">Username: </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-password">
                            <label htmlFor="password">Password: </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div className="form-page-btn">
                            <button type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
};

export default AdminLogin