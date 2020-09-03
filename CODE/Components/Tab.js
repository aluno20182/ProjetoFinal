import React, {Component} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import EnviarDados from './EnviarDados';
import ReceberDados from './ReceberDados';
import Peers from './Peers';



const Stack = createStackNavigator();


export default class Tab extends React.Component {
  render(){
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="EnviarDados" component={EnviarDados} />
        <Stack.Screen name="ReceberDados" component={ReceberDados} />
        <Stack.Screen name="Peers" component={Peers} />
      </Stack.Navigator>
    );
  }

}