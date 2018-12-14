import { SIGN_IN, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN} from "./actionTypes";
import {
  uiStartLoading,
  uiStopLoading,
  signInFailed,
  signInSuccess
} from "./index";
import { AsyncStorage } from "react-native";

const apiKey = "AIzaSyDjP2zU0rSdvb921RnOIjiXMf9TZW0EByE";

export const loginAction = (email, password) => {
  return dispatch => {
    dispatch(uiStartLoading());

    console.log("logging in...");
    fetch(
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
        apiKey,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .catch(err => {
        console.log(err);
        alert("Something is wrong");
        dispatch(uiStopLoading());
        dispatch(signInFailed());
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        dispatch(signInFailed());
        if (parsedRes.error) {
          console.log(parsedRes.error);
          alert("Please check your email and password");
        }
        if (!parsedRes.idToken) {
          alert("Token Error!");
        } else {
          dispatch(signInSuccess());
          dispatch(
            authStoreToken(
              parsedRes.idToken,
              parsedRes.expiresIn,
              parsedRes.refreshToken
            )
          );
        }
      });
  };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    
    const now = new Date();
    const expiryDate = now.getTime() + 5 * 1000;
    dispatch(authSetToken(token, expiryDate));
    console.log("SET TOKEN HAS BEEN DISPATCHED!!")
    AsyncStorage.setItem("ap:auth:token", token);
    AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);
  };
};

export const authSetToken = (token, expiryDate) => {
  return {
    type: AUTH_SET_TOKEN,
    token: token,
    expiryDate: expiryDate
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      const expiryDate = getState().auth.expiryDate;
      if (!token || new Date(expiryDate) <= new Date()) {
        let fetchToken;
        AsyncStorage.getItem("ap:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            fetchToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem("ap:auth:expiryDate");
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchToken));
              resolve(fetchToken);
            } else {
              reject();
            }
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    });
    return promise
      .catch(err => {
        return AsyncStorage.getItem("ap:auth:refreshToken")
          .then(refreshToken => {
            return fetch(
              "https://securetoken.googleapis.com/v1/token?key=" + apiKey,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "grant_type=refresh_token&refresh_token=" + refreshToken
              }
            );
          })
          .then(res => res.json())
          .then(parsedRes => {
            if (parsedRes.id_token) {
              console.log("TOKEN SUCCESS!!");
              dispatch(
                authStoreToken(
                  parsedRes.id_token,
                  parsedRes.expires_in,
                  parsedRes.refresh_token
                )
              );
              return parsedRes.id_token;
            } else {
              console.log("This storage were cleared")
              dispatch(authClearStorage());
            }
          });
      })
      .then(token => {
        if (!token) {
          throw new Error();
        } else {
          return token;
        }
      });
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        console.log("token checker");
       // console.log(token);
        dispatch(authSetToken(token));
      })
      .catch(err => {
        console.log(err);
        console.log("Failed to fetch token");
      });
  };
};

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("ap:auth:token");
    AsyncStorage.removeItem("ap:auth:expiryDate");
    return AsyncStorage.removeItem("ap:auth:refreshToken");
  };
};

export const logout = () =>{
  return dispatch =>{
    console.log("trying to log out")
    dispatch(authClearStorage())
    dispatch(authRemoveToken())
  }
}


export const authRemoveToken = () =>{
  return{
    type: AUTH_REMOVE_TOKEN
  }
}