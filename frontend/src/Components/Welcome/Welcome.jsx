import React from 'react';
import './Welcome.css';
import { Link } from 'react-router-dom';

const Welcome = ({ myProfile }) => {
  return (
    <div className='welcome'>
      <Link to={`/profile/${myProfile._id}`}>
      <img src={myProfile.avatar} alt="" className='welcomeImg'/>
      </Link>
      <h1 className='welcomeHeading'>Welcome <span className='designHeading'>{`${myProfile.firstName} ${myProfile.lastName}`}</span>!</h1>
      <Link to='/create' className='btn'>Create Something!</Link>
    </div>
  )
}

export default Welcome
