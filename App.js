import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ReceberDados from './ReceberDados';
import EnviarDados from './EnviarDados';
import Cliente from './Cliente';
import CreateHotspot from './CreateHotspot';
import Peers from './Peers';



const MainNavigator = createStackNavigator({
  Cliente: {screen: Cliente},
  ReceberDados: {screen: ReceberDados},
  EnviarDados: {screen: EnviarDados},
  CreateHotspot: {screen: CreateHotspot},
  Peers: {screen: Peers},
});

const App = createAppContainer(MainNavigator);

export default App;