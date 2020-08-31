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

import Login from './CODE/Components/Login';
import SignUp from './CODE/Components/SignUp';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import Reducers from './CODE/Reducers';

const SwitchNav = createStackNavigator({
  Login: {
    screen: Login,
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
  componentDidMount() {
    navigatorRef = this.navigator;
  }

  constructor(props) {
    super(props);
  }


  render() {
    const store = createStore(Reducers, {}, applyMiddleware(thunk));

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
