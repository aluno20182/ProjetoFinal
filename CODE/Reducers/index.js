import UserReducer  from './UserReducer';
import { combineReducers } from 'redux';


export const Reducers = combineReducers({
    UserReducer : UserReducer, 
});