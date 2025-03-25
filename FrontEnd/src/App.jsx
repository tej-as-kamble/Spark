import './App.css'
import LeftSide from './components/LeftSide.jsx'
import LoginSignUpForm from './components/LoginSignUpForm.jsx'
import VerificationForm from './components/VerificationForm.jsx'
import MainContent from './components/MainContent.jsx'
import {Routes, Route, Navigate} from 'react-router-dom'
import ShowMsg from './components/ShowMsg.jsx'
import Admin from './components/Admin.jsx'
import BothSide from './BothSide.jsx'
import Logout from './components/Logout.jsx'


function App() {
  return (
      <div className='app'>

        <Routes>
          <Route path='/' element={<BothSide/>}>
            <Route path='login' element={<LoginSignUpForm formType='login'/>}/>
            <Route path='signup' element={<LoginSignUpForm formType='signup'/>}/>
            <Route path='verification' element={<VerificationForm/>}/>
            <Route path='/channels/:username' element={<ShowMsg/>}/>
            <Route path='/admin'  element={<Admin/>}/>
          </Route> 
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
  )
}

export default App
