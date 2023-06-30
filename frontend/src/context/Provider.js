import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

const StateProvider = ( { children }) =>{

    const baseUrl = window.location.href;
    const tokenAndId = JSON.parse(localStorage.getItem('loggedin'));
    const [loggedInData, setLoggedInData] = useState({});
    const [auth, setAuth] = useState(true);
    const [loginProfile, setLoginProfile] = useState({});
    //For Load Again Login Profile
    const [loadLP,setLoadLP] = useState(false);
    //For Load Again Params Profile
    const [loadPP,setLoadPP] = useState(false);
    //For Load Again User info
    const [loadIF,setLoadIF] = useState(false);
    //For Load Again Post
    const [loadPost,setLoadPost] = useState(false);
    const token = tokenAndId && tokenAndId.token;
    const userId = tokenAndId && tokenAndId.id;
    const [showAlert, setShowAlert] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        message: ''
    });
    const [info, setInfo] = useState({});
    
    
    const fetchLoginProfile = async() =>{
      setProfileLoading(true);
        try {
          const config = {
            headers:{
              'Content-Type': 'application/json',
              'token': token
            }
          }
          const { data } = await axios.get(`${baseUrl}/api/v1/get/profile/${userId}`, config)
          setLoginProfile(data.user);
          setProfileLoading(false);
        } catch (error) {
          setProfileLoading(false);
        }
      }

    useEffect(()=>{
        
        setLoggedInData(tokenAndId && tokenAndId)

        if(!tokenAndId){
            setAuth(false);
        }

        fetchLoginProfile();
        
    },[loadLP]); 

    return <AppContext.Provider value={{auth, setAuth, showAlert, setShowAlert, alert, setAlert, loggedInData, setLoggedInData, token, userId, baseUrl, loginProfile, setLoginProfile, info, setInfo, loadLP, setLoadLP, loadPP,setLoadPP, loadIF,setLoadIF, loadPost,setLoadPost, profileLoading}}>{children}</AppContext.Provider> 
}

export const AppState = () =>{
    return useContext(AppContext);
}
export default StateProvider; 