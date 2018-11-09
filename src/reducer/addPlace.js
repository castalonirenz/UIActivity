import {ADD_PLACE} from '../actions/actionTypes'

const initialState = {

    location: null,
    image: null,
    text: null

}

const addPlaceReducer = (state = initialState, action) =>{
    switch(action.type){
        case ADD_PLACE:
        return{
            ...state,
            location: locationText,
            image: imageText,
            text: text
        }
        default:
        return state;
    }
}

export default addPlaceReducer