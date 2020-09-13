import { SET_USER } from '../Actions/index';

const initialState = {
  user: {
      username: 'ricardo',
      email: 'r@rr.com',
      points: '100',
  }
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};