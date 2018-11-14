import { SIGN_UP_SUCCESS, SIGN_UP_FAILED, SIGN_IN_SUCCESS, SIGN_IN_FAILED,AUTH_SET_TOKEN } from "../actions/actionTypes";

const initialState = {
  isSuccess: false,
  isSuccessSign: false,
  token: null
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
        token: action.token
      };
    default:
      return state;
  }
};

export default reducer;