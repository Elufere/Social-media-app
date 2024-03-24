import React, { useState, useEffect } from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { newRequest } from '../../utils/newRequest';
import { useParams } from 'react-router';
import "./profile.css";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { username } = useParams();
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await newRequest.get(`users?username=${username}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className='profile'>
        <Sidebar />
        <div className="profileRight">
          {user && Object.keys(user).length > 0 ? (
            <>
              <div className="profileRightTop">
                <div className="profileCover">
                  <img
                    src={
                      user.coverPicture
                        ? PF + user.coverPicture
                        : PF + "person/noCover.png"
                    }
                    className='profileCoverImg'
                    alt=""
                  />
                  <img
                    src={
                      user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    className='profileUserImg'
                    alt=""
                  />
                </div>
                <div className="profileInfo">
                  <h4 className='profileInforName'>{user.username}</h4>
                  <span className='profileDesc'>{user.desc}</span>
                </div>
              </div>
              <div className="profileRightBottom">
                <Feed username={username}/>
                <Rightbar user={user}/>
              </div>
            </>
          ) : (
            <div>Loading user data...</div>
          )}
        </div>
      </div>
    </>
  );
}
