import React, { useEffect, useState } from 'react';
import ProfileImages from './../Components/ProfileImages/ProfileImages'
import ProfileImagesSkeleton from './../Components/ProfileImages/ProfileImagesSkeleton.jsx'
import InfoBox from './../Components/InfoBox/InfoBox'
import { AppState } from './../context/Provider';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { callAlert } from '../Functions/Functions';


const Profile = () => {

  const {token, userId, setAlert, setShowAlert, baseUrl, loadPP } = AppState();
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const fetchUser = async() =>{
    setLoading(true);
    try {
      const config = {
        headers:{
          'Content-Type': 'application/json',
          'token': token
        }
      }
      const { data } = await axios.get(`${baseUrl}api/v1/get/profile/${params.id}`, config)
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if(error){
        navigate(`/profile/${userId}`);
        callAlert(setAlert, setShowAlert, 'error', error.response.data.message)
      }
    }
  }

  useEffect(()=>{

    fetchUser();

  }, [params.id, loadPP]);

  return (
    <div className='container page'>
      {!loading ? <ProfileImages user={user} setUser={setUser} paramId={params.id}/> : <ProfileImagesSkeleton/>}
      <InfoBox user={user} id={params.id}/>
    </div>
  )
}

export default Profile
