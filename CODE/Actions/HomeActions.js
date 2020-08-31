import url from '../../Url';

export const signOut = () => {
    const {email} = this.props.email;
    console.log(email);

    fetch(url + '/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(res => res.json())
      .then(res => {

        console.log(res);

        //this.props.navigation.navigate('SignIn');
      })
      .catch(err => console.log(err));
};

export const getPoints = () => {
    //const {email} = this.props.navigation.state.params.data;
    console.log(email);

    fetch(url + '/getpoints', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log('esteee', res);
      })
      .catch(err => console.log(err));
  };

