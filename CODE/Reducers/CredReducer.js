import { SET_CRED } from '../Actions/index';

const initialState = {
  user: {
      ssid: '',
      password: '',
  }
};

export const CredReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CRED:
      return {
        ...state,
        cred: action.cred
      };
    default:
      return state;
  }
};