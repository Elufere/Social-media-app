import React from 'react';
import './sidebar.css'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import { Users } from "../../dummyData";
import CloseFriends from '../closeFriends/CloseFriends';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <ul className='sidebarList'>
          <li className="sidebarListItem">
            <RssFeedIcon />
            <span className='sidebarListItemText'>Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon />
            <span className='sidebarListItemText'>Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleIcon />
            <span className='sidebarListItemText'>Videos</span>
          </li>
          <li className="sidebarListItem">
            <GroupIcon />
            <span className='sidebarListItemText'>Group</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkIcon />
            <span className='sidebarListItemText'>Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutlineIcon />
            <span className='sidebarListItemText'>Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutlineIcon />
            <span className='sidebarListItemText'>Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon />
            <span className='sidebarListItemText'>Events</span>
          </li>
          <li className="sidebarListItem">
            <SchoolIcon />
            <span className='sidebarListItemText'>Courses</span>
          </li>
        </ul>
        <button className='sidebarButton'>Show More</button>
        <hr className='sidebarHr'/>
        <ul className="sidebarFriendList">
            {
              Users.map((u)=> (<CloseFriends key={u.id} user={u}/>))
            }
        </ul>
      </div>
    </div>
  )
}
 