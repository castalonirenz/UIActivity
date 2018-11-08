import {createStore, combineReducers, applyMiddleware, compose} from 'redux'

import signUpReducer from './reducer/signUpReducer'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    signup: signUpReducer,

});
let composeEnhancers = compose;

if(__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () =>{
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}

export default configureStore