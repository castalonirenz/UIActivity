import { SIGN_UP_SUCCESS, SIGN_UP_FAILED, SIGN_IN_SUCCESS, SIGN_IN_FAILED,AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "../actions/actionTypes";

const initialState = {
  isSuccess: false,
  isSuccessSign: false,

  isToken: null,
  token: null,
  expiryDate: null
 
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSuccess: true
      };
    case SIGN_UP_FAILED:
      return {
        ...state,
        isSuccess: false
      };
      case SIGN_IN_SUCCESS:
      return{
        ...state,
        isSuccessSign: true
      }
      case SIGN_IN_FAILED:
      return{
        ...state,
        isSuccessSign: false
      }
      case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        expiryDate: action.expiryDate
      };
      case AUTH_REMOVE_TOKEN:
      return{
        ...state,
        expiryDate: null,
        token: null
      }
    
    default:
      return state;
  }
};

export default reducer;