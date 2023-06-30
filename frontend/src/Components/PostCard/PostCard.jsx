import React from 'react';
import './PostCard.css';
import moment from 'moment';
import { AiOutlineLike, AiFillLike, AiOutlineShareAlt, AiOutlineDelete} from 'react-icons/ai';
import { TfiComment } from 'react-icons/tfi';
import { AppState } from '../../context/Provider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { callAlert } from '../../Functions/Functions';

const PostCard = ({post}) => {

  const {userId, setAlert, setShowAlert, token, baseUrl, loadPost,setLoadPost} = AppState();

  const deletePost =async(id)=>{

    try {
      const config = {
        headers:{
          'Content-Type': 'application/json',
          'token': token
        }
      }

      const { data } = await axios.delete(`${baseUrl}/api/v2/delete/post/${id}`, config);
      setLoadPost(!loadPost)
      callAlert(setAlert, setShowAlert, 'success', data.message);

    } catch (error) {
      callAlert(setAlert, setShowAlert, 'error', error.response.data.message);
      console.log(error.response.data.message);
    }

  }

  return (
    <div className='postCard'>
      <div className="postHead">
        <Link to={`/profile/${post.postedBy._id}`} >
        <img src={post.postedBy.avatar} alt="" className="postedByImg" />
        </Link>
        <div className="postedbyName">
          Posted by 
          <Link to={`/profile/${post.postedBy._id}`} className='lighted'>
            {post.postedBy._id === userId ? ' You': ' '+post.postedBy.firstName}
          </Link>
        </div>
        <div className="time">{moment(post.postCreatedAt).from()}</div>
        {post.postedBy._id === userId && <>
        <AiOutlineDelete className='postIcon' onClick={()=>deletePost(post._id)}/>
        </>}
      </div>
      <div className="postCaption">{post.caption}</div>
      <img src={post.postImage} alt="" className="postImage" />
      {/* <div className="postFooter">
        <div className="like">
          <AiOutlineLike/>
          12
        </div>
        <div className="comment">
          <TfiComment/>
          45
        </div>
        <div className="share">
          <AiOutlineShareAlt/>
          2
        </div>
      </div> */}
    </div>
  )
}

export default PostCard
