import {SIGN_UP_ONE,SIGN_UP_TWO,SIGN_UP_LAST, AUTH_SET_TOKEN} from './actionTypes'
import {uiStartLoading,uiStopLoading,signUpSuccess,signUpFailed} from './index'
import {authSetToken,authStoreToken} from './index'



export const signUpOneAction = (firstNameText, lastNameText) =>{

    return{    
            type: SIGN_UP_ONE,
            firstNameText: firstNameText,
            lastNameText: lastNameText
    }
       
    }


export const signUpTwoAction = (emailText,passText) =>{
    return  {
    
            type: SIGN_UP_TWO,
            emailText: emailText,
            passText: passText
    }
        
    }


export const signUpLastAction = (Firstname,Lastname,Email,Pass,Birthday) =>{
    return dispatch => {
        dispatch(uiStartLoading());
        
        console.log("starting to save")
        let apiKey ="AIzaSyDjP2zU0rSdvb921RnOIjiXMf9TZW0EByE"
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key="+apiKey, {
            method: "POST",
            body: JSON.stringify({
                email: Email,
                password: Pass,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(err => {
            console.log(err);
           
            alert("Authentication failed, please try again!");
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes.error)
            if(parsedRes.error){
                dispatch(signUpFailed())
                dispatch(uiStopLoading());
                alert("Please use other email")
               
            }
            else if(!parsedRes.idToken){
                console(parsedRes.idToken)
                alert("Token error")
            }
            else{

                dispatch(signUpSuccess())
                dispatch(authSetToken(parsedRes.idToken));
                const SaveToFireBase = {
                    type: SIGN_UP_LAST,
                    Firstname: Firstname,
                    Lastname: Lastname,
                    Email: Email,
                    Pass: Pass,
                    Birthday: Birthday,
                    
                }
                fetch("https://ordinal-tractor-221702.firebaseio.com/signup.json",{
                    method: "POST",
                    body: JSON.stringify(SaveToFireBase)
                })
                .catch(err => console.log(err))
                .then(res => res.json())
                .then(parsedRes => {

                    
              
                    dispatch(uiStopLoading());
                    
                    console.log(parsedRes)
                    console.log("success")
                    
                    
                })
            }
            console.log(parsedRes);
        });
        
     

       
    }
}