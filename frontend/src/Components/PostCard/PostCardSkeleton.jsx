import React from 'react';
import Skeleton from 'react-loading-skeleton';


const PostCardSkeleton = () => {
  return (
    <>
    <div className='postCard'>
      <div className="postHead">
      <Skeleton circle={true} height={70} width={70}/>
      <Skeleton height={15} width={145} />
        <div className="time"></div>
      </div>
      <Skeleton count={3} height={10} width='100%' />
      <Skeleton height={200} width='100%'/>
    </div>
    <div className='postCard'>
      <div className="postHead">
      <Skeleton circle={true} height={70} width={70}/>
      <Skeleton height={15} width={145} />
        <div className="time"></div>
      </div>
      <Skeleton count={3} height={10} width='100%' />
      <Skeleton height={200} width='100%'/>
    </div>
    <div className='postCard'>
      <div className="postHead">
      <Skeleton circle={true} height={70} width={70}/>
      <Skeleton height={15} width={145} />
        <div className="time"></div>
      </div>
      <Skeleton count={3} height={10} width='100%' />
      <Skeleton height={200} width='100%'/>
    </div>
    </>
  )
}

export default PostCardSkeleton
