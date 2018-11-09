import {ADD_PLACE} from './actionTypes'


export const addPlace = (location,image,text) =>{
    return{
        type: ADD_PLACE,
        locationText: location,
        imageText: image,
        text: text

    }
}