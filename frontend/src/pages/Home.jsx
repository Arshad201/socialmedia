import React, { useEffect, useState } from 'react';
import Welcome from '../Components/Welcome/Welcome.jsx'
import WelcomeSkeleton from '../Components/Welcome/WelcomeSkeleton.jsx'
import PostCard from '../Components/PostCard/PostCard.jsx';
import axios from 'axios';
import { AppState } from '../context/Provider.js';
import { callAlert } from '../Functions/Functions.js';
import PostCardSkeleton from '../Components/PostCard/PostCardSkeleton.jsx';

const Home = () => {

  const { baseUrl, token, userId, setAlert, setShowAlert, loadPost, loginProfile, profileLoading} = AppState();
  const [posts, setPosts] = useState([])
  const [myProfile, setMyProfile] = useState({});
  const [postLoading, setPostLoading] = useState(false);

  const fetchPosts = async() =>{

    setPostLoading(true);
  
      try {
  
        const config = {
          headers:{
            'Content-Type': 'application/json',
            'token': token
          }
        }
        const { data } = await axios.get(`${baseUrl}/api/v2/get/posts`, config);
  
        setPosts(data.posts);
        setPostLoading(false);
        
      } catch (error) {
        setPostLoading(false);
      }

  }


  useEffect(()=>{
    fetchPosts();
  },[loadPost]);

  return (
    <div className='container page'>
      {profileLoading ? <WelcomeSkeleton/> :  <Welcome myProfile={loginProfile}/>}
      <div className="posts">
        {postLoading ? <PostCardSkeleton/>:
        <>
        {posts.length!=0 ? posts.map((post)=><PostCard key={post._id} post={post}/>)
        :
        <div className='notFoundText'>Post Not Found!</div>}
        </>
        }
      </div>
    </div>
  )
}

export default Home
