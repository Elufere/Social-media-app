import React, { useEffect, useState } from 'react'
import './conversation.css'
import { newRequest } from '../../utils/newRequest';

export default function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await newRequest(`/users?userId=${friendId}`);
        setUser(res.data)
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, conversation]);

  return (
    <div className='conversation'>
      <img 
        src={
          user?.profilePicture
            ? PF + user?.profilePicture
            : PF + "person/noAvatar.png"}
        className="conversationImg" 
        alt=''
        />
      <span className="conversationName">{user?.username}</span>
    </div>
  )
}
