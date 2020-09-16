import { SET_USER } from '../Actions/index';

const initialState = {
  user: null
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};