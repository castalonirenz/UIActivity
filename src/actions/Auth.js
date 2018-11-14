import { SIGN_UP_SUCCESS, SIGN_UP_FAILED, SIGN_IN_FAILED, SIGN_IN_SUCCESS } from './actionTypes';

export const signUpSuccess = () => {
    return {
        type: SIGN_UP_SUCCESS
    };
};

export const signUpFailed = () => {
    return {
        type: SIGN_UP_FAILED
    };
};

export const signInSuccess = () =>{
    return{
        type: SIGN_IN_SUCCESS
    }
}

export const signInFailed = () =>{
    return{
        type: SIGN_IN_FAILED
    }
}