import './App.css'
import LeftSide from './components/LeftSide.jsx'
import LoginSignUpForm from './components/LoginSignUpForm.jsx'
import VerificationForm from './components/VerificationForm.jsx'
import MainContent from './components/MainContent.jsx'
import {Routes, Route} from 'react-router-dom'
import ShowMsg from './components/ShowMsg.jsx'
import Admin from './components/Admin.jsx'


function App() {
  return (
      <div className='app'>
        {/* <LeftSide/> */}
        {/* <MainContent/> */}
        {/* <LoginSignUpForm/> */}

        <Routes>
          <Route path='/' element={<><LeftSide/> <MainContent/></>}>
            <Route path='login' element={<LoginSignUpForm formType='login'/>}/>
            <Route path='signup' element={<LoginSignUpForm formType='signup'/>}/>
            <Route path='verification' element={<VerificationForm/>}/>
            <Route path='/channels/:id' element={<ShowMsg/>}/>
          </Route> 
          <Route path='/admin'  element={<Admin/>}/>
        </Routes>
      </div>
  )
}

export default App
