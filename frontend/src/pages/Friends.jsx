import React, { useEffect, useState } from 'react';
import FriendCard from '../Components/FriendCard/FriendCard.jsx';
import FriendCardSkeleton from '../Components/FriendCard/FriendCardSkeleton.jsx';
import { AppState } from '../context/Provider.js';
import axios from 'axios';

const Friends = () => {

  const { token, baseUrl } = AppState();
  const [users, setUsers] = useState([]);
  const [loadAgain, setLoadAgain] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async() =>{
    setLoading(true);
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      }
       
      const { data } = await axios.get(`${baseUrl}api/v1/users`, config);
      setUsers(data.users);
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
    }
  }
  

  useEffect(()=>{
    fetchUsers();
  },[loadAgain]);

  return (
    <div className='container page'>
      <div className="flexDirectionColum users">
      <h2 className="heading">Suggested Profiles</h2>
      {
        loading ? <FriendCardSkeleton/>
        :
        <>
        {users && users.map((user)=><FriendCard loadAgain={loadAgain} setLoadAgain={setLoadAgain} key={user._id} user={user} />)}
        {users.length === 0 && <div className='notFoundText'>Users are not found!</div>}
        </>
      }
      </div>
    </div>
  )
}

export default Friends
