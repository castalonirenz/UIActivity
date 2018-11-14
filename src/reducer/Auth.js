import { SIGN_UP_SUCCESS, SIGN_UP_FAILED, SIGN_IN_SUCCESS, SIGN_IN_FAILED } from "../actions/actionTypes";

const initialState = {
  isSuccess: false,
  isSuccessSign: false
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
      case SIGN_UP_FAILED:
      return{
        ...state,
        isSuccessSign: false
      }
    default:
      return state;
  }
};

export default reducer;