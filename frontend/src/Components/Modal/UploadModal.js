import React from 'react';
import { AiFillPicture, AiOutlineLoading3Quarters } from 'react-icons/ai'
import './Modal.css';

const UploadModal = ({uploadType, myFunction, btnText1, btnText2, loading, img, imageChange, isUpload}) => {
  return (
    <div className="modalContainer">
      <div className="modalBox">
        <img className='modalImg' alt={img} src={img} />
        <div className="btns">
          {
          isUpload ? <button className='btn' onClick={()=>{myFunction('upload')}}>Upload</button> :
          <>
          <label className="btn" htmlFor='imageInput' >
            <AiFillPicture/>
            {loading && <AiOutlineLoading3Quarters className='loading'/>}
            {btnText1}
          </label>
          <input type="file" accept="image/*" id='imageInput' className='fileInput'  onChange={(e)=>imageChange(e.target.files[0], uploadType === 'avatar' ? 'avatar' : 'cover')}/>
          </>
          }
          <button className="btn" onClick={()=>myFunction('cancel')}>{btnText2}</button>
        </div>
      </div>
    </div>
  )
}

export default UploadModal
