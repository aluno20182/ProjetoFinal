import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomePage from './HomePage';
import Procura from './Procura';

const MainNavigator = createStackNavigator({
  HomePage: {screen: HomePage},
  Procura: {screen: Procura},
});

const App = createAppContainer(MainNavigator);

export default App;