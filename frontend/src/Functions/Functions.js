
export const callAlert = (setAlert, setShowAlert, type, message)=>{
    
    setShowAlert(true);
        setAlert({
          type: type,
          message: message
        })

        setTimeout(()=>{
          setShowAlert(false);
        }, 3000);

}

export const doLogin = (setLoading, apiData, setAuth, setLoggedInData, loadLP, setLoadLP) =>{

      setLoading(false);
      localStorage.setItem('loggedin', JSON.stringify(apiData));
      setAuth(true);
      setLoadLP(!loadLP);
      const idandToken = JSON.parse(localStorage.getItem('loggedin'));  
      setLoggedInData(idandToken);

}