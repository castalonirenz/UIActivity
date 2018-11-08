import {SIGN_UP_ONE,SIGN_UP_TWO,SIGN_UP_LAST} from './actionTypes'



export const signUpOneAction = (firstNameText, lastNameText) =>{

    return dispatch =>{

        const signUpData ={
            type: SIGN_UP_ONE,
            firstNameText: firstNameText,
            lastNameText: lastNameText
        };
        fetch("https://ordinal-tractor-221702.firebaseio.com/signup.json",{
            method: "POST",
            body: JSON.stringify(signUpData)
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes)
        })
       
        
        }
       
    }


export const signUpTwoAction = (emailText) =>{
    return dispatch => {
        const signUpData ={
            type: SIGN_UP_TWO,
             emailText: emailText

        };
        fetch("https://ordinal-tractor-221702.firebaseio.com/signup.json",{
            method: "POST",
            body: JSON.stringify(signUpData)
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes)
        })

    }
        
    }


export const signUpLastAction = (birthText) =>{
    return{
        type: SIGN_UP_LAST,
        birthText: birthText
    }
}