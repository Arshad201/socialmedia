import React, { useState } from 'react';
import './FriendCard.css';
import { FaHeart } from 'react-icons/fa'
import { BiCurrentLocation } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { AppState } from '../../context/Provider';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import axios from 'axios';
import {callAlert} from '../../Functions/Functions';


const FriendCard = ({user, loadAgain, setLoadAgain}) => {
    
    const {userId, baseUrl, token, setAlert, setShowAlert } = AppState();
    const [loadingBtn1, setLoadingBtn1] = useState({});
    const [loadingBtn2, setLoadingBtn2] = useState({});

    const sendRequest = async(id) =>{

         setLoadingBtn1({...loadingBtn1, [id]:true});
         
         try {

            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    'token': token
                }
            }

            const { data } = await axios.post(`${baseUrl}api/v1/send/friendrequest/${id}`, {}, config);
            setLoadingBtn1({...loadingBtn1, [id]:false});
            callAlert(setAlert, setShowAlert, 'success', data.message);
            setLoadAgain(!loadAgain);
            
        } catch (error) {
            setLoadingBtn1({...loadingBtn1, [id]:false});
            callAlert(setAlert, setShowAlert, 'error', error.response.data.message);
        }
    }

    const undoRequest = async(id) =>{

        setLoadingBtn1({...loadingBtn1, [id]:true});
        
        try {

           const config = {
               headers:{
                   'Content-Type': 'application/json',
                   'token': token
               }
           }

           const { data } = await axios.post(`${baseUrl}api/v1/undo/friendrequest/${id}`, {}, config);
           setLoadingBtn1({...loadingBtn1, [id]:false});
           callAlert(setAlert, setShowAlert, 'success', data.message);
           setLoadAgain(!loadAgain);
           
       } catch (error) {
           setLoadingBtn1({...loadingBtn1, [id]:false});
           console.log(error.response.data.message);
       }
    }

    const acceptRequest = async(id) =>{

        setLoadingBtn1({...loadingBtn1, [id]:true});
        
        try {

           const config = {
               headers:{
                   'Content-Type': 'application/json',
                   'token': token
               }
           }

           const { data } = await axios.post(`${baseUrl}api/v1/accept/friendr/${id}`, {}, config);
           setLoadingBtn1({...loadingBtn1, [id]:false});
           callAlert(setAlert, setShowAlert, 'success', data.message);
           setLoadAgain(!loadAgain);
           
       } catch (error) {
           setLoadingBtn1({...loadingBtn1, [id]:false});
           callAlert(setAlert, setShowAlert, 'error', error.response.data.message);

       }
    }

    const rejectRequest = async(id) =>{

        setLoadingBtn2({...loadingBtn2, [id]:true});
        
        try {

           const config = {
               headers:{
                   'Content-Type': 'application/json',
                   'token': token
               }
           }

           const { data } = await axios.post(`${baseUrl}api/v1/reject/friendr/${id}`, {}, config);
           setLoadingBtn2({...loadingBtn2, [id]:false});
           callAlert(setAlert, setShowAlert, 'success', data.message);
           setLoadAgain(!loadAgain);
           
        } catch (error) {
           setLoadingBtn2({...loadingBtn2, [id]:false});
           callAlert(setAlert, setShowAlert, 'error', error.response.data.message);

       }
    }

    const removeFriend = async(id) =>{

        setLoadingBtn1({...loadingBtn1, [id]:true});
        
        try {

           const config = {
               headers:{
                   'Content-Type': 'application/json',
                   'token': token
               }
           }

           const { data } = await axios.post(`${baseUrl}api/v1/remove/friend/${id}`, {}, config);
           setLoadingBtn1({...loadingBtn1, [id]:false});
           callAlert(setAlert, setShowAlert, 'success', data.message);
           setLoadAgain(!loadAgain);
           
       } catch (error) {
           setLoadingBtn1({...loadingBtn1, [id]:false});
           callAlert(setAlert, setShowAlert, 'error', error.response.data.message);

       }
    }
    
  return (
    <div className='friendCard'>
        <Link className="imgBox" to={`/profile/${user._id}`}>
            <img src="/man.png" alt="" className="profileImginCard" />
        </Link>
        <div className="rightBox">
            <Link to={`/profile/${user._id}`}  className="name">{user.firstName}</Link>
            
            <div className="moreInfo">
                <BiCurrentLocation className='moreInfoIcon'/>
                <span className="infoText">
                    From Kanpur
                </span>
            </div>
            <div className="moreInfo">
                <FaHeart className='moreInfoIcon'/>
                <span className="infoText">
                    Single
                </span>
            </div>

            <div className="btns">

                {
                    user.friendList.includes(userId) && 
                    <button className='btn' onClick={()=>removeFriend(user._id)}>Unfriend</button>
                }

                {(!user.sendRequest.includes(userId) && !user.receiveRequest.includes(userId) && !user.friendList.includes(userId)) && 
                <button className="btn" onClick={()=>sendRequest(user._id)}>
                { loadingBtn1[user._id] && <AiOutlineLoading3Quarters className='loading'/>}
                Add Friend
                </button>}

                {user.sendRequest.includes(userId) && 
                <button className="btn" onClick={()=>acceptRequest(user._id)}>
                { loadingBtn1[user._id] && <AiOutlineLoading3Quarters className='loading'/>}
                Accept
                </button>}

                {user.sendRequest.includes(userId) && 
                <button className="btn" onClick={()=>rejectRequest(user._id)}>
                { loadingBtn2[user._id] && <AiOutlineLoading3Quarters className='loading'/>}
                    Reject
                </button>}
                
                {user.receiveRequest.includes(userId) && 
                <button className="btn" onClick={()=>undoRequest(user._id)}>
                { loadingBtn1[user._id] && <AiOutlineLoading3Quarters className='loading'/>}
                    Cancel
                </button>}

                {!user.sendRequest.includes(userId) && <Link to={`/profile/${user._id}`} className="btn">View Profile</Link>}
            </div>
        </div>
    </div>
    
  )
}

export default FriendCard
