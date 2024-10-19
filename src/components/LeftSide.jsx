import './LeftSide.css';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import Channels from './Channels.jsx';

function LeftSide() {
  return (
    <div className='left-side'>
      <div className='nav-bar'>
        <IconButton>
          <HomeIcon fontSize="large" className='home-icon icon'/>
        </IconButton>
        <IconButton>
          <SearchIcon fontSize="medium" className='search-icon icon'/>
        </IconButton>
      </div>

      <div className='options-for-list'>
        <button className='following-btn'>Following</button>
        <button className='online-btn'>Online</button>
      </div>

      {/* <div className='search'>
        <input type="text" placeholder='search'/>
      </div> */}

      <Channels/>

    </div>
  )
}

export default LeftSide