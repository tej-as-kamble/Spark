import React, { useState, useEffect } from 'react';
import "./Admin.css";
import AdminPage from './AdminPage.jsx';

function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAdmin = async () => {
        const response = await fetch('http://localhost:5000/admin/is-admin', {
            method: 'GET',
            credentials: 'include'
        });

        if(response.ok) setIsAuthenticated(true);
        else{
            setIsAuthenticated(false);
            alert("Only Admin can use this URL");
        };
    }

    useEffect(() => {
        checkAdmin();
    }, []);

    return (
        <div className='admin'>
            {isAuthenticated && <AdminPage/>}
        </div>
    )
};

export default Admin;