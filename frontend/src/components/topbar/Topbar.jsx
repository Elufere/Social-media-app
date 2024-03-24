import React from 'react'
import './topbar.css'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link, useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../context/authContext'

const Topbar = () => {

  const {user, dispatch} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch({type: "LOGOUT"})
  }
  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">Lamasocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <SearchIcon className='searchIcon'/>
          <input placeholder='Search for friends, post or video' className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
          <span className="topbarLink" onClick={handleLogout}>LOGOUT</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatIcon />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">3</span>
          </div>
        </div>
      </div>
      <Link to={`/profile/${user.username}`} onClick={() => { navigate.push(`/profile/${user.username}`); 
              window.location.reload(); }}>
      <img
       src={
        user.profilePicture 
          ? PF + user.profilePicture 
          : PF+"person/noAvatar.png"
        } 
        alt="" 
        className="topbarImg" />
      </Link>
    </div>
  )
}

export default Topbar