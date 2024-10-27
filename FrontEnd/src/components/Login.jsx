import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

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
                        <div className="form-email">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" placeholder="Email" />
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
                <button>SignUp here</button>
            </div>
        </div>
    );
}

export default Login;
