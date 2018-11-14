import {SIGN_IN} from './actionTypes'
import {uiStartLoading,uiStopLoading,signInFailed,signInSuccess} from './index'


export const loginAction = (email,password) =>{
    return dispatch =>{
        let apiKey = "AIzaSyDjP2zU0rSdvb921RnOIjiXMf9TZW0EByE"
         dispatch(uiStartLoading());
        
         console.log("logging in...")
         fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +apiKey,{
             method: "POST",
             body: JSON.stringify({
                 email: email,
                 password: password,
                 returnSecureToken: true
                 
             }),
             headers:{
               "Content-Type": "application/json"
             }
         })
         .catch(err=>{
             console.log(err)
             alert("Something is wrong")
             dispatch(uiStopLoading())
             dispatch(signInFailed())
         })
         .then(res => res.json())
         .then(parsedRes =>{
            dispatch(uiStopLoading());
            dispatch(signInFailed())
            if(parsedRes.error){
                console.log(parsedRes.error)
            alert("Please check your email and password");

            }
            else{
                dispatch(signInSuccess())
            }
         })
         
    }
}