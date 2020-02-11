import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ReceberDados from './Navigation/ReceberDados';
import EnviarDados from './Navigation/EnviarDados';
import Cliente from './Navigation/Cliente';
import CreateHotspot from './Navigation/CreateHotspot';
import Peers from './Navigation/Peers';
import SignIn from './Navigation/SignIn';

import Auth from './Navigation/Auth'
import { Auth as AmplifyAuth } from 'aws-amplify'

const SwitchNav = createSwitchNavigator({
  Auth: {
    screen: Auth
  },
  SignIn: {
    screen: SignIn
  }
})

const App = createAppContainer(SwitchNav);


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

export default App

