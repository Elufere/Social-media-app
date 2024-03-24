import React from 'react'
import { format } from 'timeago.js'
import './message.css'

export default function Message({message, own}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src="https://images.pexels.com/photos/20259610/pexels-photo-20259610/free-photo-of-woman-posing-in-traditional-striped-shirt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="messageImg" />
        <p className="messageText">   
        {message.text}
        </p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
