import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';

function SignUp(){
    const navigate = useNavigate();
    return(
        <div className="all-form">
            <div className='form-close'>
                <button onClick={()=>{navigate(-1);}}>
                    <CloseIcon/>
                </button>
            </div>
            <div className="form">
                <form action="#">
                    <div className="form-content">
                        <div className="form-name">
                            <label htmlFor="name">Name: </label>
                            <input type="text" name="name" placeholder="Name"/>
                        </div>
                        <div className="form-username">
                            <label htmlFor="username">Username: </label>
                            <input type="text" name="username" placeholder="Username"/>
                        </div>
                        <div className="form-password">
                            <label htmlFor="password">Password: </label>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                        <div className="form-page-btn">
                            <button>SignUp</button>
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
    )
}

export default SignUp