import React, { useState } from 'react';
import './Auth.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaFileUpload } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppState } from '../../context/Provider';
import { callAlert, doLogin } from '../../Functions/Functions';

const Signup = () => {

  const { baseUrl, setAuth, setLoggedInData, setAlert, setShowAlert, loadLP, setLoadLP } = AppState();
  const [ showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar ] = useState("https://res.cloudinary.com/arshadmern/image/upload/v1685954758/dqftgv18jkddaiv2esrr.png");
  const coverPic = "https://res.cloudinary.com/arshadmern/image/upload/v1686145887/sqazrgbmyrnkfyko1d6r.png";

  const [formData, setFormData] = useState({

    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirmPassword : ""

  })
  


  const handleShowPassword = () =>{
    setShowPassword(!showPassword);
  }

  const updateFormData = (e) =>{

      setFormData({ ...formData, [e.target.name]: e.target.value });

  }

  const changeAvatar = (pic) =>{

    setLoading(true);

    if(pic.type==='image/jpeg' || pic.type === 'image/png'){

            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'socialmedia-app');
            data.append('cloud_name', 'arshadmern');

            fetch("https://api.cloudinary.com/v1_1/arshadmern/image/upload", { method : 'POST', body: data,}).then((res)=>res.json()).then(data=>{
                setAvatar(data.url.toString());
                setLoading(false);
            }).catch((err)=>{
                console.log(err);
                setLoading(false);
            });
    }else{
      alert('Upload an image')
      setLoading(false);
    }
    // console.log(pic);

  }

  const submitSignup = async(e) =>{

    e.preventDefault();

    const finalData = {...formData, avatar, coverPic};
    const config = {
      header : {
        'Content-Type' : 'application/json'
      }
    }


    for (const v in finalData) {

      if(finalData[v].length===0){
        
        if(v === 'firstName'){
          alert('First Name is Empty');
          return ;
        }

        if(v === 'lastName'){
          alert('Last Name is Empty');
          return ;
        }

        if(v === 'email'){
          alert('Email is Empty');
          return ;
        }

        if(v === 'password'){
          alert('Password is Empty');
          return ;
        }

        if(v === 'confirmPassword'){
          alert('Confirm Password is Empty');
          return ;
        }
      }
    }

    if(finalData.password!==finalData.confirmPassword){
      alert('Passwords are not matched!');
    }

    try {

      const { data } = await axios.post(`${baseUrl}/api/v1/register`, finalData, config);

      doLogin(setLoading, data, setAuth, setLoggedInData, loadLP, setLoadLP);
      callAlert(setAlert, setShowAlert, 'success', 'You are successfully logged in!');

    } catch (error) {
      
      callAlert(setAlert, setShowAlert, 'error', error.response.data.message);

    }


  }
  return (
    <div className='authContainer'>
      <div className="authBox">
      <h1 className="formHeading">Signup</h1>
      <form className='form'>
        <div className="formControl">
          <input type="text"  placeholder='First name' name='firstName' value={formData.firstName} onChange={(e)=>updateFormData(e)}/>
        </div>
        <div className="formControl">
          <input type="text"  placeholder='Last name' name='lastName' value={formData.lastName} onChange={(e)=>updateFormData(e)}/>
        </div>
        <div className="formControl">
          <input type="email"  placeholder='Email' name='email' value={formData.email} onChange={(e)=>updateFormData(e)}/>
        </div>
        <div className="formControl">
          <input type={`${showPassword ? 'text' : 'password'}`}  placeholder='Password' name='password' value={formData.password} onChange={(e)=>updateFormData(e)}/>
          {showPassword ? <FiEye className='formIcon'  onClick={handleShowPassword}/> : <FiEyeOff className='formIcon' onClick={handleShowPassword}/>}
        </div>
        <div className="formControl">
          <input type={`${showPassword ? 'text' : 'password'}`}  placeholder='Confirm Password' name='confirmPassword' value={formData.confirmPassword} onChange={(e)=>updateFormData(e)}/>
          {showPassword ? <FiEye className='formIcon'  onClick={handleShowPassword}/> : <FiEyeOff className='formIcon' onClick={handleShowPassword}/>}
        </div>
        <div className="formControl fileInputBox">
          <label htmlFor="avatar" className='labelForFileUpload'><FaFileUpload className='fileIcon'/> <span>Upload profile image</span></label>
          <img id='imagePreview' src={avatar} alt="" />
          <input type="file" name='avatar' id='avatar' accept="image/*" onChange={(e)=>changeAvatar(e.target.files[0])}/>
        </div>
        <button className="formBtn" onClick={(e)=>submitSignup(e)}>
          {loading && <AiOutlineLoading3Quarters className='loading'/>}
        Signup</button>
        <Link to='/login' className='formLink'>Go to Login?</Link>
      </form>
      </div>
    </div>
  )
}

export default Signup
