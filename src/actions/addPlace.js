import {ADD_PLACE, SET_PLACES, REMOVE_PLACE} from './actionTypes'
import {uiStartLoading,uiStopLoading} from './index'


export const addPlace = (latLocation,longLocation,image,message) =>{
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-ordinal-tractor-221702.cloudfunctions.net/storeImage",{
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err=> {
            console.log(err);
            alert("Something went wrong, please try again");
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes =>{
           
            const placeData ={
                type: ADD_PLACE,
                lattitude: latLocation,
                longtitude:longLocation,
                image: parsedRes.imageUrl,
                message: message
            };
            return fetch("https://ordinal-tractor-221702.firebaseio.com/place.json",{
                method: "POST",
                body: JSON.stringify(placeData),
               
            },
           )
         

        })
        .catch(err =>{
            console.log("Something went wrong, please try again");
            dispatch(uiStopLoading());

        })
       .then(res => res.json())
       .then(parsedRes =>{
           console.log(parsedRes);
           dispatch(uiStopLoading())
           alert("Place added!")
       })
     
    }
}
export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    };
};

export const getPlaces = () => {
    console.log("pumasok sa get places")
    return dispatch => {
        fetch("https://ordinal-tractor-221702.firebaseio.com/place.json")
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        })
        .then(res => res.json())
        
        .then(parsedRes => {
            // console.log(parsedRes)
            const places = [];
            for (let key in parsedRes) {
                places.push({
                    ...parsedRes[key],
                    // image: {
                    //     uri: parsedRes[key].image
                    // },
                    key: key
                });
            }
            dispatch(setPlaces(places));
        });
    };
};

export const deletePlace = itemKey => {
    return dispatch => {
        dispatch(uiStartLoading());
        dispatch(removePlace(itemKey));
       
        fetch("https://ordinal-tractor-221702.firebaseio.com/place/" + itemKey + ".json", {
            method: "DELETE"
        })
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log("Done!");
            dispatch(uiStopLoading);
        });
    };
};

export const removePlace = (itemKey) => {
    return {
        type: REMOVE_PLACE,
        key: itemKey
        
    };
};

