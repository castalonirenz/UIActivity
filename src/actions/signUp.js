import {SIGN_UP_ONE,SIGN_UP_TWO,SIGN_UP_LAST} from './actionTypes'
import {uiStartLoading,uiStopLoading} from './index'



export const signUpOneAction = (firstNameText, lastNameText) =>{

    return{    
            type: SIGN_UP_ONE,
            firstNameText: firstNameText,
            lastNameText: lastNameText
    }
       
    }


export const signUpTwoAction = (emailText) =>{
    return  {
    
            type: SIGN_UP_TWO,
            emailText: emailText
    }
        
    }


export const signUpLastAction = (Firstname,Lastname,Email,Birthday) =>{
    return dispatch => {
        dispatch(uiStartLoading());
        const SaveToFireBase = {
            type: SIGN_UP_LAST,
            Firstname: Firstname,
            Lastname: Lastname,
            Email: Email,
            Birthday: Birthday
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
        })

       
    }
}