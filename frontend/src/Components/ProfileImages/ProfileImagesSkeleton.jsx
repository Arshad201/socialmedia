import React from 'react'
import Skeleton from 'react-loading-skeleton'

const ProfileImagesSkeleton = () => {
  return (
    <div style={{display:'flex', flexDirection:"column", alignItems:"center"}}>
        <div style={{width:'100%'}}>
          <Skeleton width='100%' height='30vh'/>
        </div>
      <div>
        <div style={{marginTop:"-20%"}}>
            <Skeleton circle={true} width={300} height={300}/>
        </div>
      </div>
    </div>
  )
}

export default ProfileImagesSkeleton
