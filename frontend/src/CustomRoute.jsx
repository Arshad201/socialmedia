import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppState } from './context/Provider';

const CustomRoute = ({children}) => {

    const { auth } = AppState();

    const location = useLocation();
    const navigate = useNavigate();
    const address = location.pathname;

    useEffect(()=>{

      //Change Page Title
        if(address==='/'){
            document.title = 'Home';
        }else{
  
            const removeSlash = address.replace('/','');
            const capitalizeFirst = removeSlash.charAt(0).toUpperCase();
            const getRestChar = removeSlash.slice(1);
            const finalChar = capitalizeFirst + getRestChar;
            document.title = finalChar;
        }

       //Protected routes
        if(auth && (address==='/login' || address==='/signup')){
          navigate('/');
        }

        if(!auth){
          if(address === '/login' || address === '/signup'){

            address === '/login' ? navigate('/login') : navigate('/signup');

          }else{
            navigate('/login');
          }

        }

    },[address, navigate, auth]);

  return (
    <>
      {children}
    </>
  )
}

export default CustomRoute;
