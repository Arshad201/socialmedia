import React, { useEffect, useState } from 'react';
import './ProfileImages.css';
import { AiFillCamera, AiFillDelete, AiFillSetting} from 'react-icons/ai';
import { ImBlocked } from 'react-icons/im';
import UploadModal from '../Modal/UploadModal';
import QuestionModal from '../Modal/QuestionModal.js';
import {AppState} from '../../context/Provider';
import axios from 'axios';
import SingleInputModal from '../Modal/SingleInputModal';
import { callAlert } from '../../Functions/Functions';
import { useNavigate } from 'react-router-dom';
import SettingModal from '../Modal/SettingModal';
import InfoModal from '../Modal/InfoModal';
import UserListModal from '../Modal/UserListModal.js';

const ProfileImages = ({user, paramId}) => {

  const navigate = useNavigate();

  const baseUrl = 'http://localhost:4000';

  const { userId, token, setAuth, setShowAlert, setAlert, info, setLoadLP,loadLP, setLoadPP,loadPP, loadIF,setLoadIF} = AppState();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [blockListModal, setBlockListModal] = useState(false);
  const [friendListModal, setFriendListModal] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [deleteProfileModal, setDeleteProfileModal] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [avatar, setAvatar] = useState();
  const [coverPic, setCoverPic] = useState();

  const [createInfoModal, setCreateInfoModal] = useState(false);
  const [workFormValue, setWorkFormValue] = useState([]);
  const [schoolFormValue, setSchoolFormValue] = useState([]);
  const [collegeFormValue, setCollegeFormValue] = useState([]);
  const [personalFormValue, setPersonalFormValue] = useState({ currentCity:'', homeTown:'', relationship:''});
  const [socialFormValue, setSocialFormValue] = useState([]);

  const useStateVariables = {workFormValue, setWorkFormValue, schoolFormValue, setSchoolFormValue, collegeFormValue, setCollegeFormValue, personalFormValue, setPersonalFormValue, socialFormValue, setSocialFormValue};

  const handleUploadProfileImage = async(action) =>{

    if(action === 'cancel'){
      setShowProfileModal(false);
      setAvatar(user.avatar);
      setIsUpload(false);
    }
    
    if(action === 'upload'){

      try {

        const config = {
          headers : {
            'Content-Type' : 'application/json',
            'token' : token
          }
        }

        const body = {
          avatar : avatar 
        }

        await axios.put(`${baseUrl}api/v1/update/profile/`, body, config);

        setLoadPP(!loadPP);
        setLoadLP(!loadLP)
        setIsUpload(false);
        setShowProfileModal(false);
        callAlert(setAlert, setShowAlert, 'success', 'Avatar is changed!')

      } catch (error) {
        callAlert(setAlert, setShowAlert, 'error', error.response.data.message)
      }

    }

  }

  const imageChange = (pic, type) =>{

    if(pic.type==='image/jpeg' || pic.type === 'image/png'){

      setLoading(true);

      const data = new FormData();
      data.append('file', pic);
      data.append('upload_preset', 'socialmedia-app');
      data.append('cloud_name', 'arshadmern');

      fetch("https://api.cloudinary.com/v1_1/arshadmern/image/upload", { method : 'POST', body: data,}).then((res)=>res.json()).then(data=>{

      if(type === 'avatar'){
        setAvatar(data.url.toString());
      }else{
        setCoverPic(data.url.toString());
      }
          setLoading(false);
          setIsUpload(true);
      }).catch((error)=>{
        callAlert(setAlert, setShowAlert, 'error', error.response.data.message)
        setLoading(false);
      });
      
    }else{
      callAlert(setAlert, setShowAlert, 'error', 'Only Jpg or png accepted!');
    }

  }

  const handleUploadCoverImage = async(action) =>{

    if(action === 'upload'){

      try {

        const config = {
          headers : {
            'Content-Type' : 'application/json',
            'token' : token
          }
        }

        const body = {
          coverPic : coverPic 
        }

        await axios.put(`${baseUrl}api/v1/update/profile/`, body, config);

        setLoadPP(!loadPP);
        setIsUpload(false);
        setShowCoverModal(false);
        callAlert(setAlert, setShowAlert, 'success', 'Cover Pic is changed!')


      } catch (error) {
        callAlert(setAlert, setShowAlert, 'error', error.response.data.message)

      }

    }
    if(action === 'cancel'){
      setShowCoverModal(false);
      setCoverPic(user.coverPic);
      setIsUpload(false);
    }

  }

  const handleShowModal = (type) =>{
    if(type === 'profile'){
      setShowProfileModal(!showProfileModal);
    }else if (type === 'cover'){
      setShowCoverModal(!showCoverModal);
    }else if(type === 'block'){
      setShowBlockModal(!showBlockModal);
    }else if (type === 'setting'){
      setShowSettingModal(!showSettingModal);
    }
  }

  const handleDeleteConfirm = async(type) =>{

    if(type === 'yes'){
      if(password.length<4){
        
        callAlert(setAlert, setShowAlert, 'error', 'Password is Empty or invalid length!');
        
      }else{
        
        try {
          setLoading(true);

          const config = {
            headers : {
              'Content-Type' : 'application/json',
              'token' : token
            }
          }
          
          const { data } = await axios.delete(`${baseUrl}api/v1/delete/profile/${password}`, config);

          callAlert(setAlert, setShowAlert, 'error', data.message);
          setLoading(false);
          localStorage.removeItem('loggedin');
          setAuth(false);
          setDeleteProfileModal(false);
          navigate('/login');
          callAlert(setAlert, setShowAlert, 'success', 'Account deleted successfully!');

          
        } catch (error) {
          callAlert(setAlert, setShowAlert, 'error', error.response.data.message);
          setLoading(false);
        }

      }

    }else{
      setDeleteProfileModal(false);
    }
  }

  const handleBlock = async(type) =>{
   
    if(type === 'cancel'){
      setShowBlockModal(false)
    }
    if(type === 'yes'){
      //Block Profile
      try {
        
        const config = {
          headers : {
            'Content-Type' : 'application/json',
            'token' : token
          }
        }
        
        await axios.put(`${baseUrl}api/v1/block/${paramId}`, {}, config);
        setLoadLP(!loadLP);
        setShowBlockModal(false)
        navigate(`/profile/${userId}`)
        callAlert(setAlert, setShowAlert, 'success', 'User is blocked!');

      } catch (error) {
        setShowBlockModal(false)
        callAlert(setAlert, setShowAlert, 'error', error.response.data.message);
      }
    }
  }

  const handleSettings = (type) =>{

    if(type === 'close'){
      setShowSettingModal(false);
    }
    if(type === 'blockList'){
      setBlockListModal(true);
    }
    if(type === 'friendList'){
      setFriendListModal(true);
    }
    if(type === 'addInfo'){

      setCreateInfoModal(true);
      info && setWorkFormValue(info.works)
      info && setSchoolFormValue(info.school)
      info && setCollegeFormValue(info.college)
      info && setPersonalFormValue(info.personalInfo)
      info && setSocialFormValue(info.socialLinks)
    }

    if(type === 'deleteAcc'){
      setDeleteProfileModal(true);
    }
    
  }

  const HandleCreateInfo = async(action) =>{

    if(action ==='open' || 'cancel'){
      setCreateInfoModal(!createInfoModal);
    }
    
    if(action==='submit'){

      const finalData = {
        works: workFormValue,
        school: schoolFormValue,
        college: collegeFormValue,
        personalInfo: personalFormValue,
        socialLinks: socialFormValue
      }

      try {

        setLoading(true);

        const config = {
          headers : {
            'Content-Type' : 'application/json',
            'token' : token
          }
        }

        await axios.post(`${baseUrl}api/v1/create/info`, finalData, config);
        setLoading(false);
        setCreateInfoModal(false);
        setShowSettingModal(false);
        setLoadIF(!loadIF)
        callAlert(setAlert, setShowAlert, 'success', 'Info updated!');

      } catch (error) {
        callAlert(setAlert, setShowAlert, 'error', error.response.data.message);
        setLoading(false);
      }

    }
  }

  useEffect(()=>{
    setAvatar(user && user.avatar);
    setCoverPic(user && user.coverPic)

  },[user]);
  return (
    <>
    <div className='profileImages'>
      <div className="bgImage" style={{backgroundImage: `url(${coverPic})`}}>
        {
        userId===user._id ?
        <>
        <AiFillCamera className='profileIcon' onClick={()=>handleShowModal('cover')}/>
        <AiFillSetting className='profileIcon' onClick={()=>handleShowModal('setting')}/>
        </>:
        <ImBlocked className='profileIcon blockIcon' onClick={()=>handleShowModal('block')}/>
        }
      </div>
      <div className="BigProfileImg">
        <img src={avatar} alt="" />
        {userId===user._id && <AiFillCamera className='profileIcon profileImgicon' onClick={()=>handleShowModal('profile')}/>}
      </div>
    </div>
    {
      showProfileModal && <UploadModal uploadType='avatar' myFunction={handleUploadProfileImage} question='' btnText1='Choose the Image' btnText2='Cancel' loading={loading} img={avatar} imageChange={imageChange} isUpload = {isUpload}/>
    }

    {
      showCoverModal && <UploadModal uploadType='cover' myFunction={handleUploadCoverImage} question='' btnText1='Upload cover Image' btnText2='Cancel' loading={loading} img={coverPic} imageChange={imageChange} isUpload={isUpload}/>
    }

    {
      showBlockModal && <QuestionModal question='Are you sure to block this profile?' btnText1='Yes' btnText2='No' myFunction={handleBlock}/>
    }

    {
      showSettingModal && <SettingModal myFunction={handleSettings} btnText='Close'/>
    }

    {
      deleteProfileModal && <SingleInputModal type='deleteAcc' myFunction={handleDeleteConfirm} myState={password} setMyState={setPassword} loading={loading}/>
    }

    { 
    createInfoModal && <InfoModal myFunction={HandleCreateInfo} loading={loading} useStateVariables={useStateVariables} />
    }

    {
      blockListModal && <UserListModal setModal={setBlockListModal} btnText='Close' listType='Block List'/>
    }
    {
      friendListModal && <UserListModal setModal={setFriendListModal} btnText='Close' listType='Friend List'/>
    }

    </>
  )
}

export default ProfileImages
