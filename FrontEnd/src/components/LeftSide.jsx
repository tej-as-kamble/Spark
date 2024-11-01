import React, { useEffect, useState } from "react";
import './LeftSide.css';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from './SearchBar.jsx';
import { IconButton } from '@mui/material';
import SideBarLoginBtn from './SideBarLoginBtn.jsx';
import Channels from './Channels.jsx';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function LeftSide() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log(userData);

  const [loading, setLoading] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [focusSearch, setFocusSearch] = useState(false);
  const [showPopularChannels, setShowPopularChannels] = useState(true); //for popular button
  const [showFollowingChannels, setShowFollowingChannels] = useState(false); //for following button
  const [AllChannelData, setAllChannelData] = useState([]);
  const [AllFollowingList, setAllFollowingList] = useState([]);

  const allChannels = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/user/all-channels', {
        method: 'GET',
      });
      const data = await response.json();
      console.log(data);
      setAllChannelData(data);
    } catch (error) {
      console.error("Error fetching all channels data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    allChannels();
  }, []);


  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
    setFocusSearch(!focusSearch);
  };

  const handlePopularClick = () => {
    setShowPopularChannels(true);
    setShowFollowingChannels(false);
  }

  const handleFollowingClick = () => {
    setShowFollowingChannels(true);
    setShowPopularChannels(false);

    const followingChannels = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/user/following-list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: userData.username,
            password: userData.password,
          }),
        });
        if (response.ok) {
          setLoading(false);
          const data = await response.json();
          const followingList = data.followingList;
          const channelDetailsPromises = followingList.map(channelUsername =>
            fetch(`http://localhost:5000/user/all-channels?username=${channelUsername}`, {
              method: 'GET',
            }).then(res => res.json())
          );
          const allFollowingData = await Promise.all(channelDetailsPromises);
          setAllFollowingList(allFollowingData);
        }
      } catch (error) {
        console.error("Error checking following status:", error);
      }
    };
    followingChannels();
  }


  return (
    <div className='left-side'>
      <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
          className="left-side-loading"
          >
          <CircularProgress color="inherit" />
      </Backdrop>
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

      {showFollowingChannels &&
        (!userData ?
          <SideBarLoginBtn />
          : AllFollowingList.length>0 ? 
            <Channels channelData={AllFollowingList}/> 
            : <p className="zero-following">You are not following any celebrity, WHY?</p>
        )
      }
      {showPopularChannels && <Channels channelData={AllChannelData} />}


      {/* <SideBarLoginBtn/> */}
    </div>
  );
}

export default LeftSide;
