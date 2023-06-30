import React from 'react';
import Skeleton from 'react-loading-skeleton';

const UserListModalSkeleton = () => {
  return (
    <div>
      <div className="user">
        <Skeleton circle={true} height={80} width={80}/>
        <div className="nameAndButton">
        <Skeleton width='13rem' height={20} borderRadius={0}/>
        <Skeleton width='7rem' height={30} borderRadius={0}/>
        </div>
      </div>
    </div>
  )
}

export default UserListModalSkeleton
