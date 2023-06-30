import React, { useEffect, useState } from 'react'
import { AppState } from '../../context/Provider';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { TbSquareRoundedLetterS } from 'react-icons/tb';
import { AiOutlineHome, AiOutlinePlusSquare } from 'react-icons/ai';
import { BsBell } from 'react-icons/bs';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { HiOutlineUsers } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi'; 
import './Navbar.css';
import QuestionModal from '../Modal/QuestionModal';
import Notification from '../Notifications/Notifications.js'
import { callAlert } from '../../Functions/Functions';
import Skeleton from 'react-loading-skeleton';

const Navbar = () => {

  const { setAuth, userId, setAlert, setShowAlert, loginProfile, profileLoading } = AppState();
  
  const [notiOpen, setNotiOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const location = useLocation();

  const handleNotiShow = () =>{
    setNotiOpen(!notiOpen);
  }
  const handleOpenLogoutBox = () =>{
    setLogoutOpen(!logoutOpen);
  }
  const handleLogoutAction = (action) =>{
    
    if(action === 'yes'){
      localStorage.removeItem('loggedin');
      setAuth(false);
      callAlert(setAlert, setShowAlert, 'success', 'Logout successfully!');
    }else{
      setLogoutOpen(false);
    }
  }

 
  return (
    <div className='width100'>
    <header className='header'>
      <a href='/' className='logo'>
        <TbSquareRoundedLetterS className='logoIcon'/>
        <span className='logoText'>ocialBook</span>
      </a>
      <nav className='navlinks'>
          <Link to='/' className={`navlink ${location.pathname === '/' ? 'activelink' : ''}`}>
            <AiOutlineHome className='linkIcon'/>
            <span className="linkText">Home</span>
          </Link>
          <Link to='/friends' className={`navlink ${location.pathname === '/friends' ? 'activelink' : ''}`}>
            <HiOutlineUsers className='linkIcon'/>
            <span className="linkText">Friends</span>
          </Link>
          <Link to='/create' className={`navlink ${location.pathname === '/create' ? 'activelink' : ''}`}>
            <AiOutlinePlusSquare className='linkIcon'/>
            <span className="linkText">Create</span>
          </Link>
          <Link  className={`navMegaMenu ${notiOpen && 'activelink'}`} onClick={handleNotiShow}>
            <BsBell className='linkIcon'/>
            {/* <span className='notiCount'>2</span> */}
            {notiOpen && <div className="notiBox">
              <div className="notification"><Notification/></div>
            </div>}
          </Link>
          <Link to={`/profile/${userId}`} className={`navlink headerProfileLink ${location.pathname.includes('profile') ? 'activelink' : ''}`}>
            {profileLoading ? <Skeleton circle={true} width={50} height={50}/>
            :
            <img src={loginProfile && loginProfile.avatar} alt='' className='headerProfileImg' />
            }
            <span className="linkText headerProfileText">Profile</span>
          </Link>
          <Link className='navlink' onClick={handleOpenLogoutBox}>
            <RiLogoutBoxRLine className='linkIcon'/>
            <span className="linkText">Logout</span>
          </Link>
      </nav>
    </header>
    {
      logoutOpen && <QuestionModal myFunction={handleLogoutAction} question='Are you sure to Logout?' btnText1='Yes' btnText2='Cancel'/>
    }
    </div>
  )
}

export default Navbar
