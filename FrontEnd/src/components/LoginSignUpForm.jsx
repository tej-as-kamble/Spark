import './form.css';
import Login from './login.jsx';
import SignUp from './SignUp.jsx';

function LoginForm(formType){
    console.log(formType.formType);
    return(
        <div className="login-signup-page">
            {formType.formType === "login" ? <Login /> : <SignUp />}
        </div>
    )
}

export default LoginForm