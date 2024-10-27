import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

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
                        <div className="form-email">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" placeholder="Email"/>
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
                <button>Login here</button>
            </div>
        </div>
    )
}

export default SignUp