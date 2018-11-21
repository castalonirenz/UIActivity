import {
  ADD_PLACE,
  SET_PLACES,
  REMOVE_PLACE,
  AUTH_SET_TOKEN
} from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";
import {  authSetToken, authStoreToken } from '../actions/login';
export const addPlace = (
  latLocation,
  longLocation,
  image,
  message,
  heartCount
) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(
      getAddedPlaces(latLocation, longLocation, image, message, heartCount)
    );
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        authToken = token
        return fetch(
          "https://us-central1-ordinal-tractor-221702.cloudfunctions.net/storeImage",
          {
            method: "POST",
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              Authorization: "Bearer " + authToken
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
        alert("Dito?");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          lattitude: latLocation,
          longtitude: longLocation,
          image: parsedRes.imageUrl,
          message: message,
          rating: heartCount
        };
       return fetch(
          "https://ordinal-tractor-221702.firebaseio.com/place.json?auth=" + authToken,
          {
            method: "POST",
            body: JSON.stringify(placeData)
          }
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        
        dispatch(uiStopLoading());
      
        alert("Place added!");
       
        dispatch(getPlaces());
      
        
      })
      .catch(err => {
        console.log("Something went wrong, please try again");
        console.log(err)
        dispatch(uiStopLoading());
      })
      
  };
};

export const getAddedPlaces = (
  latLocation,
  longLocation,
  image,
  message,
  heartCount
) => {
  return {
    type: ADD_PLACE,
    lattitude: latLocation,
    longtitude: longLocation,
    image: image,
    message: message,
    rating: heartCount
  };
};
export const setPlaces = places => {
  return {
 
      
      type: SET_PLACES,
      places: places
    
    
  };
};

export const getPlaces = () => {
  console.log("pumasok sa get places");
  return dispatch => {
    dispatch(uiStartLoading())
    dispatch(authGetToken())
      .then(token => {
       
        return fetch(
          "https://ordinal-tractor-221702.firebaseio.com/place.json?auth=" +
            token
        );
      })
      .catch(() => {
        alert("No valid token found!");
      })
      .then(res => res.json())

      .then(parsedRes => {
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            key: key
          });
        }
    
        dispatch(setPlaces(places));
       
        dispatch(uiStopLoading())
      })
      .catch(err => {
        alert("Something went wrong, sorry :/");
        console.log(err);
        
      });
  };
};

export const updatePlace = itemDetails => {
  return dispatch => {
    console.log("update okay dito");
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found");
      })

      .then(token => {
        return fetch(
          "https://ordinal-tractor-221702.firebaseio.com/place/" +
            itemDetails.itemKey +
            ".json?auth=" +
            token,
          {
            method: "PATCH",
            body: JSON.stringify({
              message: itemDetails.textEdit
            })
          }
        )
          .then(res => res.json())
          .then(parsedRes => {
            console.log(parsedRes);
            console.log("Done!");
            dispatch(getPlaces());
            dispatch(uiStopLoading());
          })
          .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log("error dito sa catch");
          });
      });
  };
};

export const deletePlace = itemKey => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found");
      })
      .then(token => {
        dispatch(removePlace(itemKey));
        return fetch(
          "https://ordinal-tractor-221702.firebaseio.com/place/" +
            itemKey +
            ".json?auth=" +
            token,
          {
            method: "DELETE"
          }
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log("Done!");
      })
      .catch(err => {
        alert("Something went wrong, sorry :/");
        console.log(err);
      });
  };
};

export const removePlace = itemKey => {
  return {
    type: REMOVE_PLACE,
    key: itemKey
  };
};
