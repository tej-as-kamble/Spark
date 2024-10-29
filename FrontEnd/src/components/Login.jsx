import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    return (
        <div className="all-form">
            <div className="form-close">
                <button onClick={() => { navigate(-1); }}>
                    <CloseIcon />
                </button>
            </div>
            <div className="login-form">
                <form>
                    <div className="form-content">
                        <div className="form-username">
                            <label htmlFor="username">Username: </label>
                            <input type="text" name="username" placeholder="Username"/>
                        </div>
                        <div className="form-password">
                            <label htmlFor="password">Password: </label>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                        <div className="form-page-btn">
                            <button type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="toggle-signin">
                <p>Don't have an account?</p>
                <Link to="/signup" title="signup">
                    <button>SignUp here</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;
