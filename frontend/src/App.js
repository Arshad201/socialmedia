import React from 'react'
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import CustomRoute from './CustomRoute';
import Create from './pages/Create';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer.jsx';
import PageNotFound from './pages/PageNotFound';
import { AppState } from './context/Provider';
import Alert from './Components/Modal/Alert';

const App = () => {

  const { auth, showAlert, alert } = AppState();

  return (
    <>
    {showAlert && <Alert type={alert.type} alertMessage={alert.message}/>}
      {auth && <Navbar/>}
      <Routes>
        <Route exact path='/' element={<CustomRoute children={<Home/>}/>} />
        <Route exact path='/friends' element={<CustomRoute children={<Friends/>}/>} />
        <Route exact path='/profile/:id' element={<CustomRoute children={<Profile/>}/>} />
        <Route exact path='/create' element={<CustomRoute children={<Create/>}/>} />
        <Route exact path='/login' element={<CustomRoute children={<Login/>}/>} />
        <Route exact path='/signup' element={<CustomRoute children={<Signup/>}/>} />
        <Route exact path='/*' element={<PageNotFound/>}/>
      </Routes>
      {auth && <Footer/>}
    </>
  )
}

export default App 
