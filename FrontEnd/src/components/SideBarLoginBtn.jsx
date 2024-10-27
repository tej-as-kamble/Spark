import { Link } from 'react-router-dom';
import LoginButton from './LoginButton.jsx';

function SideBarLoginBtn() {
    return (
        <div className='sidebar-login-btn'>
            <Link to="/login">
                <LoginButton loginSignup="Login" />
            </Link>
            <p>or</p>
            <Link to="/signup">
                <LoginButton loginSignup="SignUp" />
            </Link>
        </div>
    );
}

export default SideBarLoginBtn;
