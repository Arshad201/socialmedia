import React from 'react';
import { ImBlocked } from 'react-icons/im';
import { FaUserFriends, FaAddressBook } from 'react-icons/fa';
import { AiTwotoneDelete } from 'react-icons/ai';
import './Modal.css';

const SettingModal = ({myFunction, btnText}) => {
  return (
    <div className="modalContainer">
      <div className="modalBox">
        <div className="settingContainer">
          <button className="setting"  onClick={()=>myFunction('blockList')} ><ImBlocked/> Block List</button>
          <button className="setting"  onClick={()=>myFunction('friendList')} ><FaUserFriends/> Friend List</button>
          <button className="setting"  onClick={()=>myFunction('addInfo')} ><FaAddressBook/> Add Info</button>
          <button className="setting"  onClick={()=>myFunction('deleteAcc')} ><AiTwotoneDelete/> Delete your Account</button>
        </div>
        <div className="btns">
          <button className="btn" onClick={()=>myFunction('close')}>{btnText}</button>
        </div>
      </div>
    </div>
  )
}

export default SettingModal
