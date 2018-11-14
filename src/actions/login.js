import {SIGN_IN, AUTH_SET_TOKEN} from './actionTypes'
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
            if(!parsedRes.idToken){
                alert("Token Error!");
            }
            else{
                dispatch(signInSuccess())
                dispatch(authSetToken(parsedRes.idToken))
                
            }
         })
         
    }
}

export const authSetToken = token =>{
    return{
        type: AUTH_SET_TOKEN,
        token: token
    }
}

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                reject();
            } else {
                resolve(token);
            }
        });  
        return promise;
    };
};