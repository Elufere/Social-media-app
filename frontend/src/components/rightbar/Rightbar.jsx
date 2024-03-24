import React, { useContext, useEffect, useState } from 'react';
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { newRequest } from '../../utils/newRequest';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './rightbar.css'

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  // Use a unique key for localStorage to avoid conflicts with other components
  const localStorageKey = `followStatus_${user ? user._id : 'home'}`;
  const [followed, setFollowed] = useState(() => {
    const storedFollowStatus = JSON.parse(window.localStorage.getItem(localStorageKey));
    return storedFollowStatus === true;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user && user._id) {
          const friendList = await newRequest.get(`/users/friends/${user._id}`);
          setFriends(friendList.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await newRequest.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: 'UNFOLLOW', payload: user._id });
      } else {
        await newRequest.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: 'FOLLOW', payload: user._id });
      }
      setFollowed(!followed);
      // Update localStorage after the state is changed
      window.localStorage.setItem(localStorageKey, JSON.stringify(!followed));
    } catch (err) {
      console.error(err);
    }
  };

   const HomeRightbar = ()=> {
    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img src="assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u=>(
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>

        {user.username !== currentUser.username && (
          <button className="rightbarFollowingsButton" onClick={handleClick}>
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey"> From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? 'Single'
                : user.relationship === 2
                ? 'Married'
                : '-'}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={`/profile/${friend.username}`}
              onClick={() => {
                navigate.push(`/profile/${friend.username}`);
                window.location.reload();
              }}
              style={{ textDecoration: 'none' }}
              key={friend._id}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + 'person/noAvatar.png'
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rigthbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}









// import React, { useContext, useEffect, useState } from 'react';
// import { Users } from "../../dummyData";
// import Online from "../online/Online";
// import { newRequest } from '../../utils/newRequest';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/authContext';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import './rightbar.css'


// export default function Rightbar({user}) {

//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   const [friends, setFriends] = useState([]);
//   const {user:currentUser, dispatch} = useContext(AuthContext);
//   const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));

//   const navigate = useNavigate();

//   useEffect(() => {
//     const getFriends = async () => {
//       try {
//         if (user && user._id) {
//           const friendList = await newRequest.get("/users/friends/" + user._id);
//           setFriends(friendList.data);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };
  
//     getFriends();
//   }, [user]);

//   const handleClick = async () => {
//     try {
//       if (followed) {
//         await newRequest.put(`/users/${user._id}/unfollow`, {
//           userId: currentUser._id,
//         });
//         dispatch({ type: "UNFOLLOW", payload: user._id });
//       } else {
//         await newRequest.put(`/users/${user._id}/follow`, {
//           userId: currentUser._id,
//         });
//         dispatch({ type: "FOLLOW", payload: user._id });
//       }
//       setFollowed(!followed);
//     } catch (err) {
//     }
//   };

//   const HomeRightbar = ()=> {
//     return (
//       <>
//         <div className="birthdayContainer">
//           <img src="assets/gift.png" alt="" className="birthdayImg" />
//           <span className="birthdayText">
//             <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
//           </span>
//         </div>
//         <img src="assets/ad.png" alt="" className="rightbarAd" />
//         <h4 className="rightbarTitle">Online friends</h4>
//         <ul className="rightbarFriendList">
//           {Users.map(u=>(
//             <Online key={u.id} user={u} />
//           ))}
//         </ul>
//       </>
//     );
//   };

//   const ProfileRightbar = () =>{
//     return (
//       <>
//          {user.username !== currentUser.username && (
//         <button className="rightbarFollowingsButton" onClick={handleClick}>
//           {followed ? "unfollow" : "Follow"}
//           {followed ?  <RemoveIcon /> : <AddIcon  />}
//         </button>
//           )}
//         <h4 className='rightbarTitle'>User information</h4>
//         <div className="rightbarInfo">
//           <div className="rightbarInfoItem">
//             <span className="rightbarInfoKey">City:</span>
//             <span className="rightbarInfoValue">{user.city}</span>
//           </div>
//           <div className="rightbarInfoItem">
//             <span className="rightbarInfoKey"> From:</span>
//             <span className="rightbarInfoValue">{user.from}</span>
//           </div>
//           <div className="rightbarInfoItem">
//             <span className="rightbarInfoKey">Relationship:</span>
//             <span className="rightbarInfoValue">
//               {user.relationship === 1
//               ? "Single" : user.relationship === 2 
//               ? "Married" 
//               : "-"}</span>
//           </div>
//         </div>
//         <h4 className="rightbarTitle">User Friends</h4>
//         <div className="rightbarFollowings"> 
//           {friends.map((friend) => (
//             <Link 
//               to={`/profile/${friend.username}`} 
//               onClick={() => { navigate.push(`/profile/${friend.username}`); 
//               window.location.reload(); }}
//               style={{textDecoration:"none"}}
//               >
//             <div className="rightbarFollowing">
//               <img
//                 src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"}
//                 alt=""
//                 className="rightbarFollowingImg"
//               />
//               <span className="rigthbarFollowingName">{friend.username}</span>
//             </div>
//           </Link>
//           ))}
//       </div>     
//       </>
//     )
//   }

//   return (
//     <div className='rightbar'>
//       <div className="rightbarWrapper">
//         {user ? <ProfileRightbar/> : <HomeRightbar/>}
//       </div>
//     </div>
//   );
// }