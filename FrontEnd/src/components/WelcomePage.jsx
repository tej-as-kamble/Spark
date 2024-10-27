import logoSpark from '../assets/logo.png'

function WelcomePage(){
    return(
        <div className="welcome-page">
            <img src={logoSpark} alt="" />
            <p>Welcome, to</p>
            <span>India's BIGGEST social media app!</span>
        </div>
    )
}

export default WelcomePage