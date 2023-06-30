import React, { useEffect, useState } from 'react';
import './InfoBox.css';
import { FaSchool, FaMapMarkerAlt, FaFacebookSquare, FaGithub, FaGraduationCap } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import { ImHome } from 'react-icons/im';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import {AppState} from '../../context/Provider';
import Info from '../Info/Info.js';
import axios from 'axios';
import moment from 'moment';
import SingleInputModal from '../Modal/SingleInputModal'
import { callAlert } from '../../Functions/Functions';

const InfoBox = ({user, id}) => {

  const { token, setAlert, setShowAlert, baseUrl, userId, info, setInfo, loadPP,setLoadPP, loadIF } = AppState();
  const [updateBioModal, setUpdateBioModal] = useState(false);
  const [bioText, setBioText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchInfo = async() =>{

    try {

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      }
       
      const { data } = await axios.get(`${baseUrl}/api/v1/get/info/${id}`, config);
      
      setInfo(data.userInfo);

    } catch (error) {
    }
  }

  const updateBio = async(action) =>{
    if(action==='open'){
      setUpdateBioModal(true);
      setBioText(user.bio)
    }
    if(action==='cancel'){
      setUpdateBioModal(false);
    }
    if(action==='yes'){
      console.log('update bio')
      //Call an api for update bio
        try {

          setLoading(true);
          const config = {
            headers : {
              'Content-Type' : 'application/json',
              'token' : token
            }
          }

          const body = {
            bio : bioText 
          }

          const { data } = await axios.put(`${baseUrl}/api/v1/update/profile/`, body, config);

          setBioText(data.updatedUser.bio);
          setLoadPP(!loadPP);
          setUpdateBioModal(false);
          callAlert(setAlert, setShowAlert, 'success', 'Bio changed successfully!');
          setLoading(false);

        } catch (error) {
          callAlert(setAlert, setShowAlert, 'error', error.response.data.message)
        }
    }
  }
  

  useEffect(()=>{
    fetchInfo();
  },[id, loadIF]);

  return (
    <>
    
    {
    user &&
    <div className='infoBox'>
      <div className="infoHeader">
        <span className="fullName">
          {user.firstName}
        </span>
        <div className="bioBox">
          <span className="bio">
          {user.bio}
          </span>
          {id === userId && <AiFillEdit className='profileIcon editBioIcon' onClick={()=>updateBio('open')}/>}
        </div>
      </div>
      {info  &&  <div className="infoBody">
        {(info.personalInfo && info.personalInfo.length !=0) && <div className="infoRowContainer">
          <span className="heading">Personal Info</span>
          <div className="infoRow">

            {info.personalInfo.relationship && <Info icon={<BsFillSuitHeartFill className='infoIcon'/>} name={info.personalInfo.relationship} desc='Relationsip Status'/>}

            {info.personalInfo.currentCity && <Info icon={<FaMapMarkerAlt className='infoIcon'/>} name={info.personalInfo.currentCity} desc={`lives in - ${info.personalInfo.currentCity}`}/>}

            {info.personalInfo.homeTown && <Info icon={<ImHome className='infoIcon'/>} name={info.personalInfo.homeTown} desc={`from - ${info.personalInfo.homeTown}`}/>}

          </div>
        </div>}
        {(info.works && info.works.length !=0) && <div className="infoRowContainer">
          <span className="heading">Works</span>
          <div className="infoRow">
            {
              info.works?.map((i)=>{
                return <Info key={i.name} icon={<MdWork className='infoIcon'/>} name={i.name} desc={i.desc} start={moment(i.startDate).format("Do MMM YYYY")} end={`${i.endDate ? ' To ' + moment(i.endDate).format("Do MMM YYYY") : ' to Present'}`}/>
              })
            }
          </div>
        </div>}
        {(info.school && info.school.length !=0) && <div className="infoRowContainer">
          <span className="heading">School</span>
          <div className="infoRow">
          {
              info.school && info.school.map((i)=>{
                return <Info key={i.name} icon={<FaSchool className='infoIcon'/>} name={i.name} desc={i.desc} start={moment(i.startDate).format("Do MMM YYYY")} end={`${i.endDate ? ' To '+moment(i.endDate).format("Do MMM YYYY") : ' to Present'}`}/>
              })
          }
          </div>
        </div>}
        {(info.college && info.college.length !=0) &&<div className="infoRowContainer">
          <span className="heading">College</span>
          <div className="infoRow">
          {
              info.college?.map((i)=>{
                return <Info key={i.name} icon={<FaGraduationCap className='infoIcon'/>} name={i.name} desc={i.desc} start={moment(i.startDate).format("Do MMM YYYY")} end={`${i.endDate ? ' To '+ moment(i.endDate).format("Do MMM YYYY") : ' to Present'}`}/>
              })
          }
          </div>
        </div>}
      </div>
      }
    </div>
    }
   
    {updateBioModal && <SingleInputModal type='updateBio' myState={bioText} loading={loading} setMyState={setBioText} myFunction={updateBio} />}
    </>
  )
}

export default InfoBox
