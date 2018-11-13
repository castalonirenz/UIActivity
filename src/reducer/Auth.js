import { SIGN_UP_SUCCESS, SIGN_UP_FAILED } from "../actions/actionTypes";

const initialState = {
  isSuccess: false
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
    default:
      return state;
  }
};

export default reducer;