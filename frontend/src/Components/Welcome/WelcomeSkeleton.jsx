import React from 'react';
import Skeleton from 'react-loading-skeleton';

const WelcomeSkeleton = () => {
  return (
    <div className='welcome'>
      <Skeleton circle={true} height={180} width={180}/>
      <div style={{flexGrow:"2"}}>
      <Skeleton height={30} width='100%'/>
      </div>
      <div style={{flexGrow:"2"}}>
      <Skeleton height={50} width={150}/>
      </div>
      
    </div>
  )
}

export default WelcomeSkeleton
