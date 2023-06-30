import React, { useState } from 'react';
import './Auth.css';
import { MdOutlineMailLock, MdLockOutline } from 'react-icons/md'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppState } from '../../context/Provider';
import { callAlert, doLogin } from '../../Functions/Functions';

const Login = () => {

  const { setAuth, setLoggedInData, setShowAlert, setAlert, loadLP, setLoadLP } = AppState();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const baseUrl = 'http://localhost:4000';
  const handleGuestCredentials = (e) =>{
    e.preventDefault();
    setEmail('guest@sheikh.com');
    setPassword('1234');
  }
  const loginSubmitHandler = async(e) =>{
    
    e.preventDefault();
    setLoading(true);

    if(!email){
      setEmailError('Enter your Email');

      setTimeout(()=>{
        setEmailError("");
      }, 3000);

      return;

    }

    if(!password){
      setPasswordError('Enter your Password');

      setTimeout(()=>{
        setPasswordError("");
      }, 3000);

      return;

    }

    try {
      
      const formData = {email, password};

      const config = {
        header: {
          'Content-Type' : 'application/json'
        }
      }

      const { data } = await axios.post(`${baseUrl}/api/v1/login`, formData, config);

      doLogin(setLoading, data, setAuth, setLoggedInData, loadLP, setLoadLP);
      callAlert(setAlert, setShowAlert, 'success', 'You are successfully logged in!');


    } catch (error) {
      
      callAlert(setAlert, setShowAlert, 'error', error.response.data.message);
      setLoading(false);

    }
  }
  return (
    <div className='authContainer'>
      <div className="authBox">
      <h1 className="formHeading">Login</h1>
      <form className='form'>
        <div className="formControl">
          <input type="email" placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <MdOutlineMailLock className='formIcon'/>
        </div>
        <span className="formErrorMsg">{emailError}</span>
        <div className="formControl">
          <input type="password" placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <MdLockOutline className='formIcon'/>
        </div>
        <span className="formErrorMsg">{passwordError}</span>
        <button className="formBtn" onClick={(e)=>handleGuestCredentials(e)} style={{background:'red'}}>Get guest credentials</button>
        <button className="formBtn" onClick={(e)=>loginSubmitHandler(e)}>
          {loading && <AiOutlineLoading3Quarters className='loading'/>}
        Login</button>
        <Link to='/signup' className='formLink'>Go to Signup?</Link>
      </form>
      </div>
    </div>
  )
}

export default Login
