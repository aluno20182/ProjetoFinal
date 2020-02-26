import {
  NavigationActions,
  createAppContainer,
  StackNavigator,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';

import Home from './Navigation/Home';
import EnviarDados from './Navigation/EnviarDados';
import ReceberDados from './Navigation/ReceberDados';
import Peers from './Navigation/Peers';

import SignIn from './Navigation/Auth/SignIn';
import SignUp from './Navigation/Auth/SignUp';


const SwitchNav = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  EnviarDados: {
    screen: EnviarDados,
  },
  ReceberDados: {
    screen: ReceberDados,
  },
  Peers: {
    screen: Peers,
  },
});

const Nav = createAppContainer(SwitchNav);

class App extends React.Component {
  checkAuth = async () => {
    try {
      await AmplifyAuth.currentAuthenticatedUser();
    } catch (err) {
      this.navigator.dispatch(NavigationActions.navigate({routeName: 'Auth'}));
    }
  };
  render() {
    return (
      <Nav
        ref={nav => (this.navigator = nav)}
        onNavigationStateChange={this.checkAuth}
      />
    );
  }
}

export default App;
