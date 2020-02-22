import {NavigationActions, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';

import Home from './Navigation/Home';
import Cliente from './Navigation/Cliente';

import Auth from './Navigation/Auth/Auth';

import Amplify, { Auth as AmplifyAuth  } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const SwitchNav = createStackNavigator({

  Auth: {
    screen: Auth,
    navigationOptions: {
      header: null,
    },
  },
/*   Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  }, */
  Cliente: {
    screen: Cliente,
    navigationOptions: {
      header: null,
    },
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
    //const {navigate} =this.props.navigation;
    return (
      <Nav
        ref={nav => this.navigator = nav}
        onNavigationStateChange={this.checkAuth}
      />
    )
  }
}

export default App;

