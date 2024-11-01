import React, { useState, useEffect } from 'react';
import "./Admin.css";
import AdminLogin from './AdminLogin.jsx';
import AdminPage from './AdminPage.jsx';

function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        setIsAuthenticated(userData?.username === "tejasadmin");
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };
    return (
        <div className='admin'>
            {isAuthenticated ? <AdminPage/> : <AdminLogin onLoginSuccess={handleLoginSuccess} />}
        </div>
    )
};

export default Admin