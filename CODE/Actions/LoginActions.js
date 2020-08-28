import url from '../../Url';

import {
    LOGIN_USER,
} from './types';


export const loginUser = (email, password) => {
    //Enviar pedidos
    return dispatch => {
        dispatch({ type: LOGIN_USER });
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
                console.log(res);
                console.log('chegou');

                console.log('aqui esta o email', email)

            })
            .then( () => {dispatch(NavigationActions.navigate({
                routeName: 'Home',
              }));
            })
/*             .then(() => this.props.nav(this.props.navigation, ('Home', {
                data: {
                    email: email,
                },
            }))) */
            .catch(err => console.log(err));
    }
}

export default loginUser;
