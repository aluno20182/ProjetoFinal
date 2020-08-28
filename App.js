console.disableYellowBox = true;
import {
  NavigationActions,
  createAppContainer,
  StackNavigator,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';

import Home from './CODE/Components/Home';
import EnviarDados from './CODE/Components/EnviarDados';
import ReceberDados from './CODE/Components/ReceberDados';
import Peers from './CODE/Components/Peers';

import SignIn from './CODE/Components/SignIn';
import SignUp from './CODE/Components/SignUp';


import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/Reducers';

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
  constructor(props) {
    super(props);
  }

  checkAuth = async () => {
    try {
      await AmplifyAuth.currentAuthenticatedUser();
    } catch (err) {
      this.navigator.dispatch(NavigationActions.navigate({routeName: 'Auth'}));
    }
  };
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Nav
          ref={nav => (this.navigator = nav)}
          onNavigationStateChange={this.checkAuth}
        />
      </Provider>
    );
  }
}

export default App;
