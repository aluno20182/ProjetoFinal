import url from '../../Url';
import {NavigationActions} from 'react-navigation';

import {LOGIN_USER, LOGIN_UPDATE, LOGIN_SUCCESS} from './types';

export const loginUser = (email, password) => {
  //Enviar pedidos
  return dispatch => {
    dispatch({type: LOGIN_USER});
    fetch(url + '/loginaccount', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res, 'dataaaa');
        console.log('chegou');

        console.log('aqui esta o email', email);
        //NavigationActions.navigate({routeName: 'Home'})
        console.log('login Success', res)

      })
      .then(res =>{
        const user = res
        loginSuccess(dispatch, user);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: user,
        });
      }
        )
      /*             .then(() => this.props.nav(this.props.navigation, ('Home', {
                data: {
                    email: email,
                },
            }))) */
      .catch(err => console.log(err));
  };
};

const loginSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: user,
  });

};


export const loginUpdate = ({prop, value}) => {
  return {
    type: LOGIN_UPDATE,
    payload: {prop, value},
  };
};

export default loginUser;
