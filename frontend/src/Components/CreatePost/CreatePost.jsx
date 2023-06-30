import React, { useState } from 'react';
import './CreatePost.css';
import { FaFileUpload } from 'react-icons/fa';
import { AiOutlineUsergroupAdd, AiOutlineLoading3Quarters } from 'react-icons/ai';
import UserListModal from '../Modal/UserListModal';
import { callAlert } from '../../Functions/Functions';
import { AppState } from '../../context/Provider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {

  const { token, setAlert, setShowAlert, baseUrl } = AppState();
  const navigate = useNavigate();

  const [tagList, setTagList] = useState([]);
  const [caption, setCaption] = useState("");
  const [postImage, setPostImage] = useState("");
  const [postVisibility, setPostVisibility] = useState("");
  const [friendListModal, setFriendListModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const showTagModal =(action)=>{
    action === 'open' && setFriendListModal(true)
  }

  const handleCreatePost = async()=>{

    const myFinalObj = {caption, taglist: tagList, postVisibility, postImage}

      setLoading(true);
  
      try {
  
        const config = {
          headers:{
            'Content-Type': 'application/json',
            'token': token
          }
        }
        const { data } = await axios.post(`${baseUrl}/api/v2/create/post`, {...myFinalObj}, config);
  
        callAlert(setAlert, setShowAlert, 'success', data.message);
        setLoading(false);
        navigate('/');
        
      } catch (error) {
        setLoading(false);
        callAlert(setAlert, setShowAlert, 'error', error.response.data.message);

      }
  
    
  } 

  const postImgChange=(pic)=>{

    setLoading(true);

    if(pic.type==='image/jpeg' || pic.type === 'image/png'){

            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'socialmedia-app');
            data.append('cloud_name', 'arshadmern');

            fetch("https://api.cloudinary.com/v1_1/arshadmern/image/upload", { method : 'POST', body: data,}).then((res)=>res.json()).then(data=>{
                setPostImage(data.url.toString());
                setLoading(false);
            }).catch((err)=>{
                console.log(err);
                setLoading(false);
            });
    }else{
      callAlert(setAlert, setShowAlert, 'error', 'Please Upload jpg/png file');
      setLoading(false);
    }

  }


  return (
    <>
    <div className='createPost'>
      <div className="createForm">
        <textarea className='captionInput' placeholder='Write something...' cols="30" rows="10" onChange={(e)=>setCaption(e.target.value)}></textarea>
        <div className="createFooter">
          <button className='tagUserBtn' onClick={()=>showTagModal('open')}>
            <AiOutlineUsergroupAdd className='adduserIcon'/>
            Tag Friend - {tagList.length}
          </button>
          <label htmlFor="avatar" className='labelForUpload'><FaFileUpload className='fileIcon'/> <span>Upload profile image</span></label>
          <img id='postImgP' src={`${postImage ? postImage : '/man.png'}`}  alt="" />
          <input type="file" id='avatar' accept="image/*" onChange={(e)=>postImgChange(e.target.files[0])}/>
          <select className='postVisible' onChange={(e)=>setPostVisibility(e.target.value)}>
            <option value="public">Public</option>
            <option value="friends">Friends</option>
          </select>
          <div className='btnWrapper'>
          <button className="btn" onClick={handleCreatePost}>
            { loading && <AiOutlineLoading3Quarters className='loading'/>}
            Post
          </button>
          </div>
        </div>
      </div>
    </div>
    {friendListModal && <UserListModal tagList={tagList} setTagList={setTagList} setModal={setFriendListModal} btnText='Close' listPurpose='tag' listType='Friend List'/>}
    </>
  )
}

export default CreatePost
