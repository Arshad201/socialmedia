import React from 'react';
import './Modal.css';
import { FiAlertTriangle } from 'react-icons/fi';
import { BsCheckCircle } from 'react-icons/bs';

const Alert = ({type, alertMessage}) => {
  return (
    <div className='alert' style={{backgroundColor: `${type === 'error' ? 'rgb(255, 69, 69)' : 'green'}` }}>
      <span>
        {
          type === 'error' ?
          <FiAlertTriangle className='alertIcon'/>
          :
          <BsCheckCircle className='alertIcon'/>
        }
      </span>
      <span>
            {alertMessage}
      </span>
    </div>
  )
}

export default Alert
