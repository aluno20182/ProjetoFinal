import { SET_USER } from '../Actions/types';

const initialState = {
  email: 'b@bb.com',
  password: 'teste123',
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        email: '',
        password: '',
      };
    default:
      return state;
  }
};