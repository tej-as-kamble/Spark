import './LeftSide.css';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from './SearchBar.jsx';
import { IconButton } from '@mui/material';
import SideBarLoginBtn from './SideBarLoginBtn.jsx';
import Channels from './Channels.jsx';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

function LeftSide() {
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [focusSearch, setFocusSearch] = useState(false);
  const [showPopularChannels, setShowPopularChannels] = useState(true); //for popular button
  const [showFollowingChannels, setShowFollowingChannels] = useState(false); //for following button

  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log(userData);

  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
    setFocusSearch(!focusSearch);
  };

  const handlePopularClick = () =>{
    setShowPopularChannels(true);
    setShowFollowingChannels(false);
  }

  const handleFollowingClick = () =>{
    setShowFollowingChannels(true);
    setShowPopularChannels(false);
  }


  return (
    <div className='left-side'>
      <div className='nav-bar'>
        <IconButton onClick={() => { navigate('/') }} title="Home">
          <HomeIcon fontSize="large" className='home-icon icon'/>
        </IconButton>
        <IconButton onClick={handleSearchClick} title="Search">
          {showSearchBar ? <CloseIcon fontSize="medium" className='search-icon icon'/> : <SearchIcon fontSize="medium" className='search-icon icon'/>}
        </IconButton>
      </div>

      <div className='options-for-list' style={{ display: showSearchBar ? 'none' : 'flex' }}>
        <button className={`following-btn ${showFollowingChannels ? 'active-btn' : ''}`}  onClick={handleFollowingClick}>Following</button>
        <button className={`popular-btn ${showPopularChannels ? 'active-btn' : ''}`} onClick={handlePopularClick}>Popular</button> {/* Handle click for Popular */}
      </div>

      <div style={{ display: showSearchBar ? 'block' : 'none' }}>
        <SearchBar focus={focusSearch} />
      </div>

      {showFollowingChannels && (!userData && <SideBarLoginBtn/>)} {/* if logged then dont show SideBarLoginBtn, show following channels */}
      {showPopularChannels && <Channels />}


      {/* <SideBarLoginBtn/> */}
    </div>
  );
}

export default LeftSide;
