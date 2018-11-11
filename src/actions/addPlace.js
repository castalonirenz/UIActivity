import {ADD_PLACE} from './actionTypes'
import {uiStartLoading, uiStopLoading} from './activityIndicator'


export const addPlace = (lat,image,long,message) =>{
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
                latLocation: lat,
                image: parsedRes.imageUrl,
                longLocation: long,
                message: message
            };
            return fetch("https://ordinal-tractor-221702.firebaseio.com/place.json",{
                method: "POST",
                body: JSON.stringify(placeData),
               
            },
            alert("Place added!"))
         

        })
        .catch(err =>{
            console.log("Something went wrong, please try again");
            dispatch(uiStopLoading());

        })
       .then(res => res.json())
       .then(parsedRes =>{
           console.log(parsedRes);
           dispatch(uiStopLoading())
       })

    }
}