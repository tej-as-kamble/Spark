import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({ name: '', username: '', password: '' });
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

        if(formData.name.length<1 || formData.username.length<1 || formData.password.length<1){
            setLoading(false);
            setErrorMessage("All necesaary inputs field have not been fiiied.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const userData = await response.json();
            // console.log(userData);
            if (response.ok) {
                localStorage.setItem('userData', JSON.stringify(userData));
                setSuccessMessage('Congratulations! Sign-up successful..');
                setLoading(false);
                setTimeout(() => {
                    navigate("/");  // Redirect after a short delay
                }, 1000);
            } else {
                setLoading(false);
                // console.log(userData.message);
                setErrorMessage(userData.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            setLoading(false);
            setErrorMessage('An error occurred. Please try again.');
            console.error('Error:', error);
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
        <div className="all-form">
            <div className='form-close'>
                <button onClick={() => { navigate(-1); }}>
                    <CloseIcon />
                </button>
            </div>
            <div className="form">
                <h2>Sign Up Now:</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-content">
                        <div className="form-name">
                            <label htmlFor="name">Name: </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
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
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div className="form-page-btn">
                            <button type="submit">SignUp</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="toggle-signin">
                <p>Already have an account?</p>
                <Link to="/login" title="login">
                    <button>Login here</button>
                </Link>
            </div>
        </div>
    </>
    );
}

export default SignUp;
