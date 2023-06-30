import React from 'react';


const Info = ({icon, name, desc, start, end}) => {
  return (
    <div className='info'>
      <div className="infoIconBox">
        {icon}
      </div>
      <div className="infoText">
        <span className="infoName">{name && name}</span>
        {desc && <span className="infoDesc">{desc}</span>}
        <div className="infoDiv">    
        {start && <span className={`infoDate ${end === ' to Present' ? 'greenDate':'redDate'}`}>From {start}</span>}
        {end && <span className={`infoDate ${end === ' to Present' ? 'greenDate':'redDate'}`}>{end}</span>}
        </div>
      </div>
    </div>
  )
}

export default Info
