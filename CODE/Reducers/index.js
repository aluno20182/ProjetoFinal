import { UserReducer } from './UserReducer';
import { CredReducer } from './CredReducer';
import { combineReducers } from 'redux';


export const Reducers = combineReducers({
    UserReducer : UserReducer, 
    CredReducer : CredReducer
});