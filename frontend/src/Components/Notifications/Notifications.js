import React, { useEffect, useState } from 'react'
import { AppState } from '../../context/Provider';
import axios from 'axios';
import moment from 'moment';
import './Notifications.css';
import {callAlert} from '../../Functions/Functions';
import { useNavigate } from 'react-router-dom';
import NotificationSkeleton from './NotificationSkeleton.js';

const Notifications = () => {

  const navigate = useNavigate();

    const {token, baseUrl, setAlert, setShowAlert} = AppState();

    const [notiArr, setNotiArr] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNotis = async() =>{

        setLoading(true);
        try {
          const config = {
            headers:{
              'Content-Type': 'application/json',
              'token': token
            }
          }
          const { data } = await axios.get(`${baseUrl}/api/v1/getnotis/`, config);
    
          setNotiArr(data.notis);
          setLoading(false);

        } catch (error) {
          setLoading(false);
          console.log(error);
        }
    }
    
    const handleNotiBtn =async(action, e, userId, notiId)=>{

      e.stopPropagation();
      e.preventDefault();
      
      if(action === 'accept-fr'){

          try {
            const config = {
              headers:{
                'Content-Type': 'application/json',
                'token': token
              }
            }
            await axios.put(`${baseUrl}/api/v1/accept/friendr/${userId}`, {notiId}, config);

            callAlert(setAlert, setShowAlert, 'success', 'Accepted!');

          } catch (error) {
            console.log(error);
          }

      }
    }

    const openProfile =(e, userId)=>{
      e.stopPropagation();
      e.preventDefault();
      navigate(`/profile/${userId}`)
    }
    
    useEffect(()=>{
    fetchNotis();
    },[]);

  return (
    <>
    {loading ? <NotificationSkeleton/> :
    <>
      {
        notiArr.length === 0 ? <div className='notFoundText'>Notifications not found!</div> : 
        <div className='notis'>{notiArr.map((n)=>{

            return <div key={n._id}>

                {
                    (n.notiType === 'fr' && n.notiState === 'Pending') && 
                    <div className='friendR noti'>
                        <div className='requestData'>
                            <img src="/man.png" alt="" className='imgInNoti' onClick={(e)=>openProfile(e, n.notiBy[0])}/>
                            <div className='msgAndTime center'>
                                <span className="notiMsg">{n.notiMsg}</span>
                                <span className='notiTime'>{moment(n.notiTime).from()}</span>
                            </div>
                        </div>
                        <div className="btns">
                        <button className="btn" onClick={(e)=>handleNotiBtn('accept-fr', e, n.notiBy[0].user, n._id)}>
                            Accept
                        </button>
                        <button className="btn" onClick={(e)=>handleNotiBtn('reject-fr', e)}>
                            Reject
                        </button>
                        </div>
                    </div>
                }

                {
                  (n.notiType === 'fr' && n.notiState === 'fullfilled') && 
                  <div className='friendA noti'>
                            <img src="/man.png" alt="" className='imgInNoti' onClick={(e)=>openProfile(e, n.notiBy[0])}/>
                            <div className='msgAndTime'>
                                <span className="notiMsg">{n.notiMsg}</span>
                                <span className='notiTime'>{moment(n.notiTime).from()}</span>
                            </div>
                  </div>
                }

            </div>
        })}</div>
      }
    </>}
    </>
  )
}

export default Notifications
