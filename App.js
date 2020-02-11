import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
//import ReceberDados from './Navigation/ReceberDados';
//import EnviarDados from './Navigation/EnviarDados';
import Cliente from './Navigation/Cliente';
//import CreateHotspot from './Navigation/CreateHotspot';
//import Peers from './Navigation/Peers';
//import SignIn from './Navigation/SignIn';

import Initializing from './Navigation/Initializing';
import Auth from './Navigation/Auth';

import Amplify, { Auth as AmplifyAuth  } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const SwitchNav = createStackNavigator({
  Initializing: {
    screen: Initializing
  },
  Auth: {
    screen: Auth
  },
  Cliente: {
    screen: Cliente
  }
})

const Nav = createAppContainer(SwitchNav);


class App extends React.Component {
  checkAuth = async () => {
    try {
      await AmplifyAuth.currentAuthenticatedUser()
    } catch (err) {
      this.navigator.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      )
    }
  }
  render() {
    return (
      <Nav
        ref={nav => this.navigator = nav}
        onNavigationStateChange={this.checkAuth}
      />
    )
  }
}

export default App;

