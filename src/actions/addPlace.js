import {
  ADD_PLACE,
  SET_PLACES,
  REMOVE_PLACE,
  AUTH_SET_TOKEN
} from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";

export const addPlace = (latLocation, longLocation, image, message) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch(
      "https://us-central1-ordinal-tractor-221702.cloudfunctions.net/storeImage",
      {
        method: "POST",
        body: JSON.stringify({
          image: image.base64
        })
      }
    )
      .catch(err => {
        console.log(err);
        alert("Something went wrong, please try again");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          type: ADD_PLACE,
          lattitude: latLocation,
          longtitude: longLocation,
          image: parsedRes.imageUrl,
          message: message
        };
        return fetch(
          "https://ordinal-tractor-221702.firebaseio.com/place.json",
          {
            method: "POST",
            body: JSON.stringify(placeData)
          }
        );
      })
      .catch(err => {
        console.log("Something went wrong, please try again");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
        alert("Place added!");
      });
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
  return dispatch =>{
  dispatch(authGetToken())
    .then(token => {
      return fetch(
        "https://ordinal-tractor-221702.firebaseio.com/place.json?auth=" + token
      );
    })
    .catch(() => {
      alert("No valid token found!");
    })
    .then(res => res.json())

    .then(parsedRes => {
      // console.log(parsedRes)
      const places = [];
      for (let key in parsedRes) {
        places.push({
          ...parsedRes[key],
          key: key
        });
      }
      dispatch(setPlaces(places));
    })
    .catch(err => {
      alert("Something went wrong, sorry :/");
      console.log(err);
    });
};
}

export const deletePlace = itemKey => {
  return dispatch => {
      dispatch(authGetToken())
      .catch(()=>{
          alert("No valid token found")
      })
      .then(token =>{
        dispatch(removePlace(itemKey));
        return fetch(
            "https://ordinal-tractor-221702.firebaseio.com/place/" +
              itemKey +
              ".json?auth=" + token,
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
      })
      
  };
};

export const removePlace = itemKey => {
  return {
    type: REMOVE_PLACE,
    key: itemKey
  };
};
