import { Outlet, useLocation } from 'react-router-dom';
import LeftSide from './components/LeftSide.jsx';
import MainContent from './components/MainContent.jsx';

function BothSide (){
    const location = useLocation();
    return(
        <>
            <LeftSide/> 
            <MainContent/>
            {(location.pathname === '/login') && (document.cookie.includes("token") ? (alert("Already logged in"), window.location.href = "/")  : <Outlet/>)}
            {(location.pathname === '/signup' || location.pathname === '/verification') && <Outlet/>}
        </>
    )
}

export default BothSide;