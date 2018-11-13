import { SIGN_UP_SUCCESS, SIGN_UP_FAILED } from './actionTypes';

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