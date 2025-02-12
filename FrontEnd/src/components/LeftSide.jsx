import React, {useEffect, useState } from "react";
import './LeftSide.css';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from './SearchBar.jsx';
import { IconButton } from '@mui/material';
import LoginButton from './LoginButton.jsx';
import Channels from './Channels.jsx';
import { useNavigate, Link } from 'react-router-dom';

function LeftSide() {
  const navigate = useNavigate();

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [focusSearch, setFocusSearch] = useState(false);
  const [showPopularChannels, setShowPopularChannels] = useState(true);
  const [showFollowingChannels, setShowFollowingChannels] = useState(false);
  const [showLoginBtn, setShowLoginBtn] = useState(false);


  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
    setFocusSearch(!focusSearch);
  };

  const handlePopularClick = () => {
    setShowFollowingChannels(false);
    setShowLoginBtn(false);
    setShowPopularChannels(true);
  }

  const handleFollowingClick = () => {
    if(document.cookie.includes("token")){
      setShowFollowingChannels(true);
    }
    else{
      setShowFollowingChannels(false);
      setShowLoginBtn(true);
    }
    setShowPopularChannels(false);
  }

  useEffect(()=>{
    // console.log(document.cookie.includes("token"));
    if(document.cookie.includes("token")){
      setShowLoginBtn(false);
      if(!showPopularChannels) handleFollowingClick();
    }
  }, [document.cookie.includes("token")]);


  return (
    <div className='left-side'>
      <div className='nav-bar'>
        <IconButton onClick={() => { navigate('/') }} title="Home">
          <HomeIcon fontSize="large" className='home-icon icon' />
        </IconButton>
        <IconButton onClick={handleSearchClick} title="Search">
          {showSearchBar ? <CloseIcon fontSize="medium" className='search-icon icon' /> : <SearchIcon fontSize="medium" className='search-icon icon' />}
        </IconButton>
      </div>

      <div className='options-for-list' style={{ display: showSearchBar ? 'none' : 'flex' }}>
        <button className={`following-btn ${showFollowingChannels ? 'active-btn' : ''}`} onClick={handleFollowingClick}>Following</button>
        <button className={`popular-btn ${showPopularChannels ? 'active-btn' : ''}`} onClick={handlePopularClick}>Popular</button> {/* Handle click for Popular */}
      </div>

      <div style={{ display: showSearchBar ? 'block' : 'none' }}>
        <SearchBar focus={focusSearch} />
      </div>

      {showFollowingChannels && <Channels apiEndpoint="http://localhost:5000/user/fetch-following" />}
      {showPopularChannels && <Channels apiEndpoint="http://localhost:5000/fetch-all-channels" />}


      {showLoginBtn && (
        <div className='sidebar-login-btn'>
          <Link to="/login">
              <LoginButton loginSignup="Login" />
          </Link>
          <p>or</p>
          <Link to="/signup">
              <LoginButton loginSignup="SignUp" />
          </Link>
      </div>
      )}
    </div>
  );
}

export default LeftSide;
