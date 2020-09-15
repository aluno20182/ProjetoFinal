import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import EnviarDados from './EnviarDados';
import ReceberDados from './ReceberDados';
import Bluetooth from './Bluetooth'



const Stack = createStackNavigator();


export default class Tab extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        title: 'Home',
          headerStyle: {
            backgroundColor: '#3E606F',
          },
          headerShown: true, 
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'sans-serif-thin',
          },
         
      }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="EnviarDados" component={EnviarDados} options={{
          title: 'Enviar Dados',
          headerStyle: {
            backgroundColor: '#3E606F',
          },
          headerShown: true, 
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'sans-serif-thin',
          },
        }} />
        <Stack.Screen name="ReceberDados" component={ReceberDados} options={{
          title: 'Receber Dados',
          headerStyle: {
            backgroundColor: '#3E606F',
          },
          headerShown: true, 
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'sans-serif-thin',
          },
        }} />
        <Stack.Screen name="Bluetooth" component={Bluetooth} />
      </Stack.Navigator>
    );
  }

}

const navigationOptions = {
  title: 'Receber Dados',
  headerStyle: {
    backgroundColor: '#08a092',
  },
  headerVisible: true,
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};