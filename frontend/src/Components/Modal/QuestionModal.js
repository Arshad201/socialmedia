import React from 'react';
import './Modal.css';

const QuestionModal = ({myFunction, question, btnText1, btnText2}) => {
  return (
    <div className="modalContainer">
      <div className="modalBox">
        <span className="question">{question}</span>
        <div className="btns">
          <button className="btn" onClick={()=>myFunction('yes')}>{btnText1}</button>
          <button className="btn" onClick={()=>myFunction('cancel')}>{btnText2}</button>
        </div>
      </div>
    </div>
  )
}

export default QuestionModal
