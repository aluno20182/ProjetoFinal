import {LOGIN_UPDATE, LOGIN_USER, LOGIN_SUCCESS} from '../Actions/types';

const INITIAL_STATE = {
  email: 'b@bb.com',
  password: 'teste123',
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_UPDATE:
      return {...state, [action.payload.prop]: action.payload.value};

    case LOGIN_USER:
      return {...state, error: ''};

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: '',
        email: '',
        password: '',
      };

    default:
      return state;
  }
};
