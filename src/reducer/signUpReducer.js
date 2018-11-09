import {SIGN_UP_ONE,SIGN_UP_TWO,SIGN_UP_LAST} from '../actions/actionTypes';

const initialState = {
    firstNameText : null,
    lastNameText : null,
    emailText: null,
    birthText: null
};

const signUpReducer = (state = initialState, action) =>{
    switch(action.type){
        case SIGN_UP_ONE:
            return{
                ...state,
                firstNameText: action.firstNameText,
                lastNameText: action.lastNameText
            };

            case SIGN_UP_TWO:
            return{
                ...state,
                
                emailText: action.emailText
            }

            case SIGN_UP_LAST:
            return{
                ...state,
                birthText: action.birthText
            }
            default:
            return state;
    }
}

export default signUpReducer;