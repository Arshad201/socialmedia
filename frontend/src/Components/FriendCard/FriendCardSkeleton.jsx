import React from 'react';
import Skeleton from 'react-loading-skeleton';


const FriendCardSkeleton = () => {
  return (
    <>
    <div className='friendCard'>
        <div className="imgBox">
            <Skeleton circle={true} height={70} width={70} />
        </div>
        <div className="rightBox" style={{padding:'2rem 1rem'}}>
           <Skeleton count={1} width={200} height={18} borderRadius={0}/>
           <Skeleton count={1} width={120} height={18} borderRadius={0}/>
           <Skeleton count={1} width={120} height={18} borderRadius={0}/>

            <div className='btns'>
                <Skeleton width='10rem' borderRadius={0} count={1} height={35}/>
                <Skeleton width='10rem' borderRadius={0} count={1} height={35}/>
            </div>
        </div>
    </div>
    <div className='friendCard'>
    <div className="imgBox">
        <Skeleton circle={true} height={70} width={70} />
    </div>
    <div className="rightBox" style={{padding:'2rem 1rem'}}>
       <Skeleton count={1} width={200} height={18} borderRadius={0}/>
       <Skeleton count={1} width={120} height={18} borderRadius={0}/>
       <Skeleton count={1} width={120} height={18} borderRadius={0}/>

        <div className='btns'>
            <Skeleton width='10rem' borderRadius={0} count={1} height={35}/>
            <Skeleton width='10rem' borderRadius={0} count={1} height={35}/>
        </div>
    </div>
    </div>
    </>
  )
}

export default FriendCardSkeleton
