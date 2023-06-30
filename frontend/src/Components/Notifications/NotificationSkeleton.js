import React from 'react';
import Skeleton from 'react-loading-skeleton';


const NotificationSkeleton = () => {
  return (
    <div className="notis">
    <div className='friendA noti'>
        {/* <Skeleton containerClassName="flex-1" height={50} count={4}/> */}
        <Skeleton width={50} height={50} count={1} circle={true}/>
        <div className='msgAndTime' style={{width:'100%'}}>
            <Skeleton containerClassName="flex-1" height={10} count={1}/>
            <Skeleton containerClassName="flex-1" height={10} count={1}/>
        </div>
    </div>
    <div className='friendA noti'>
        {/* <Skeleton containerClassName="flex-1" height={50} count={4}/> */}
        <Skeleton width={50} height={50} count={1} circle={true}/>
        <div className='msgAndTime' style={{width:'100%'}}>
            <Skeleton containerClassName="flex-1" height={10} count={1}/>
            <Skeleton containerClassName="flex-1" height={10} count={1}/>
        </div>
    </div>
    <div className='friendA noti'>
        {/* <Skeleton containerClassName="flex-1" height={50} count={4}/> */}
        <Skeleton width={50} height={50} count={1} circle={true}/>
        <div className='msgAndTime' style={{width:'100%'}}>
            <Skeleton containerClassName="flex-1" height={10} count={1}/>
            <Skeleton containerClassName="flex-1" height={10} count={1}/>
        </div>
    </div>
    </div>
  )
}

export default NotificationSkeleton
