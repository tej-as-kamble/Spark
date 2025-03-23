import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({profileImage: null, name: '', username: '', dateOfBirth: '', password: ''});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setFormData({
                ...formData,
                profileImage: file
            });
        } else {
          alert('Please select a valid image file.');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');
    
        const formDataToSend = new FormData();
        formDataToSend.append('profileImage', formData.profileImage);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('username', formData.username);
        formDataToSend.append('dateOfBirth', formData.dateOfBirth);
        formDataToSend.append('password', formData.password);
    
        try {
            const response = await fetch('https://spark-zgmc.onrender.com/user/signup', {
                method: 'POST',
                body: formDataToSend,
            });
    
            const userData = await response.json();
            if (response.ok) {
                // console.log(userData);
                localStorage.setItem('userData', JSON.stringify(userData));
                setSuccessMessage('Congratulations! Sign-up successful.');
                setLoading(false);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                setErrorMessage(userData.message || 'Signup failed. Please try again.');
                setLoading(false);
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            setLoading(false);
        }
    };
    

    // useEffect(() => {
    //     console.log(formData);
    // }, [formData]);

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
                        <div className="form-profile-image">
                            <input
                                type="file"
                                id="form-profile-image-input"
                                name="profileImage"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                                className="hidden-input"
                            />
                            <label htmlFor="form-profile-image-input" className="custom-file-label">
                                {image ? <img src={image} alt="Profile Preview" className="preview-image" /> : "Profile Image"}
                            </label>
                        </div>
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
                        <div className="form-dob">
                            <label htmlFor="dateOfBirth">Date Of Birth: </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                placeholder="Date Of Birth"
                                value={formData.dateOfBirth}
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
