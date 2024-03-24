import React, { useState, useEffect, useContext } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { newRequest } from '../../utils/newRequest';
import { format } from "timeago.js"
import "./post.css"
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/authContext';

export default function Post({post}) {

  const [like,setLike] = useState(post.likes.length);
  const [isliked,setIsLiked] = useState(false);
  const [user,setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentUser} = useContext(AuthContext)

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await newRequest.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
    
  }, [post.userId]);

  console.log(post)

  const likeHandler = () => {
    try {
      newRequest.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isliked ? like - 1 : like + 1);
    setIsLiked(!isliked);
  };
  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`} style={{textDecoration:"none"}}>  
            <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} 
              alt="" className="postProfileImg" />
            </Link>  
            <span className="postUsername">
              {user.username}
            </span>
            <div className="postDate">{format(post.createdAt)}</div>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText"d>{post?.desc}</span>
          <img src={post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src={`${PF}like.png`} alt="" onClick={likeHandler} className="likeIcon" />
            <img src={`${PF}heart.png`} alt="" onClick={likeHandler} className="likeIcon" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
