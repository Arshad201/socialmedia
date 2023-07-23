import React, { useEffect, useState } from 'react';
import './Modal.css';
import { AppState } from '../../context/Provider';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import UserListModalSkeleton from './Skeleton/UserListModalSkeleton.js';
import { callAlert } from '../../Functions/Functions';
import { AiOutlineCheck } from 'react-icons/ai';
import { GiClick } from 'react-icons/gi';

const UserListModal = ({tagList, setTagList , setModal, listPurpose, listType, btnText}) => {

  const { token, baseUrl, setAlert, setShowAlert } = AppState();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState({});

  const removeFriend = async(id) =>{
    setLoadingBtn({...loading, [id]:true});
    try {
      
      const config = {
        headers:{
          'Content-Type': 'application/json',
          'token': token
        }
      }

      const { data } = await axios.post(`${baseUrl}api/v1/remove/friend/${id}`, {}, config);

      setUserList(data.users);
      setLoadingBtn({...loading, [id]:false});
      callAlert(setAlert, setShowAlert, 'success', data.message);

      
    } catch (error) {
      setLoadingBtn({...loading, [id]:false});
      callAlert(setAlert, setShowAlert, 'error', error.response.data.message);

    }

  }

  const unblockUser = async(id) =>{
    setLoadingBtn({...loading, [id]:true});
    try {
      
      const config = {
        headers:{
          'Content-Type': 'application/json',
          'token': token
        }
      }

      const { data } = await axios.put(`${baseUrl}api/v1/unblock/${id}`, {}, config);

      setUserList(data.users);
      setLoadingBtn({...loading, [id]:false});

    } catch (error) {
      setLoadingBtn({...loading, [id]:false});
    }

  }

  const closeModal = () =>{
    setModal(false)
  }

  const fetchUsers = async() =>{

    var url;

    if(listType === 'Block List'){
      url = `${baseUrl}api/v1/blocklist`;
    }
    if(listType === 'Friend List'){
      url = `${baseUrl}api/v1/friendlist`;
    }

    setLoading(true);

    try {

      const config = {
        headers:{
          'Content-Type': 'application/json',
          'token': token
        }
      }
      const { data } = await axios.get(url, config);

      setUserList(data.users);
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
    }

  }

  const handleTagList = (uId) =>{

    if(tagList.includes(uId)){
      
      const filteredArr = tagList.filter((i)=>i !=uId)
      setTagList(filteredArr);
    }
    if(!tagList.includes(uId)){
      setTagList([...tagList, uId]);
    }
  }

  useEffect(()=>{
    fetchUsers();
  },[]);
    
  return (
    <div className="modalContainer">
    <div className="modalBox">
      <h2 className="heading">{listType}</h2>
    
      <div className="users usersList">
        {
          loading ? <UserListModalSkeleton/> :
          <>
            {
              userList && userList.map((i)=>
              <div key={i._id} className="user">
              <img src={i.avatar} className="userImg" />
              <div className="nameAndButton">
                <h3 className="name">{i.firstName}</h3>
                {
                  (listType === 'Block List' && listPurpose!=='tag') && <button className="btn listBtn" onClick={()=>unblockUser(i._id)}>
                  { loadingBtn[i._id] && <AiOutlineLoading3Quarters className='loading'/>}
                  Unblock
                  </button>
                } 
                {
                  (listType === 'Friend List' && listPurpose!=='tag') && <button className="btn listBtn" onClick={()=>removeFriend(i._id)}>
                  { loadingBtn[i._id] && <AiOutlineLoading3Quarters className='loading'/>}
                  Unfriend
                  </button>
                }
              </div>
              {listPurpose==='tag' && <div className='tickBox' onClick={()=>handleTagList(i._id)}>
                {tagList.includes(i._id) ? <AiOutlineCheck className='tickIcon' /> : <GiClick className='clickIcon'/>}
              </div>}
              </div>
              )
            }
            {
              userList.length===0 
              &&
              <>
              {
                listType === 'Block List' ?
                <span className='notFoundText'>Users are not Available to block!</span> :
                <span className='notFoundText'>Friends are not found!</span> 
              }
              </>
            }
          </>
        }
        
      </div>
      <div className="btns">
        <button className="btn" onClick={closeModal}>{btnText}</button>
      </div>
    </div>
  </div>
  )
}

export default UserListModal
