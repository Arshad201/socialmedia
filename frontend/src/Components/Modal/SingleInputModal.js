import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import './Modal.css';

const DeleteProfileModal = ({type, myFunction, myState, setMyState, loading}) => {
  return (
    <div className="modalContainer">
      <div className="modalBox">
        <div className="formControl">
          {type === 'deleteAcc' && <input type="text" placeholder='Confirm your Password' value={myState} onChange={(e)=>setMyState(e.target.value)}/>}
          {type === 'updateBio' && <input type="text" placeholder='Tell something about you!' value={myState} onChange={(e)=>setMyState(e.target.value)}/>}
        </div>
        <div className="btns">
          <button className="btn" onClick={()=>myFunction('yes')}> 
          {loading && <AiOutlineLoading3Quarters className='loading'/>}
          {type === 'deleteAcc' && 'Delete my Account'}
          {type === 'updateBio' && 'Update Bio'}
          </button>
          <button className="btn" onClick={()=>myFunction('cancel')}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteProfileModal
