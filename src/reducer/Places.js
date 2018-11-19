import {ADD_PLACE,SET_PLACES, REMOVE_PLACE} from '../actions/actionTypes'


const initialState = {

    
    image: null,
    text: null,
    latLocation: null,
    longLocation: null,
    heart: null,
    places: []


}

const addPlaceReducer = (state = initialState, action) =>{
    switch(action.type){
        case ADD_PLACE:
        return{
            ...state,
            latLocation: action.lattitude,
            longLocation:  action.longtitude,
            image: action.image,
            text:  action.message,
            heart:  action.rating
            
        };
        case SET_PLACES:
        return{
            ...state,
            places: action.places
        }
        case REMOVE_PLACE:
        return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.key;
        })
      };
      
        default:
        return state;
    }
}



export default addPlaceReducer