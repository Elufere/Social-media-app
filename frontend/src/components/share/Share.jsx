import React, { useContext, useRef, useState, useEffect } from 'react'
import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia'
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { AuthContext } from '../../context/authContext';
import { newRequest } from '../../utils/newRequest';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';


export default function Share() {

  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [imgUrl, setImageUrl] = useState('');

  // Function to handle image upload
  const processUploadedImage = async () => {
    const formData = new FormData();
    formData.append('myimage', file);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/posts/addsingleimage',
        formData
      );
      const link = response?.data;
      setImageUrl(link);
      console.log(link); 
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    if (imgUrl) {
      console.log('Updated imgUrl:', imgUrl);

      const submitForm = async () => {
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
          img: imgUrl
        };

        try {
          const res = await newRequest.post("/posts", newPost);
          window.location.reload();
        } catch(err) {
          console.log(err)
        }
      };

      submitForm();
    }
  }, [imgUrl, user._id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await processUploadedImage();
  };

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className="shareTop">
          <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" className="shareProfileImg" />
          <input placeholder={"What's in your mind "+user.username+'?' } className="shareInput" ref={desc}/>
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)}/>
            <CancelIcon className="shareCancelImg" onClick={()=>setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor='file' className='shareOption'>
              <PermMediaIcon htmlColor='tomato' className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input style={{display: "none"}} type='file' id='file' accept=".png,.jpeg,.jpg" onChange={(e)=>{setFile(e.target.files[0])}}/>
            </label>
            <div className='shareOption'>
              <LabelIcon htmlColor='blue' className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className='shareOption'>
              <RoomIcon htmlColor='green' className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className='shareOption'>
              <EmojiEmotionsIcon htmlColor='goldenrod' className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type='submit'>Share</button>
        </form>
      </div>
    </div>
  )
}
