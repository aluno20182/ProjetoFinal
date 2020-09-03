/**
 * @format
 */
import React, {Component, useEffect} from 'react';
import {AppRegistry, AsyncStorage} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { Store } from './CODE/store/index';
import {useState, createContext, useContext} from 'react';
import Login from './CODE/Components/Login';
import SignUp from './CODE/Components/SignUp';
import ReceberDados from './CODE/Components/ReceberDados';

import {
  ScrollView,
  Text,
  TextInput,
  View,
  Button
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContext, NavigationContainer, NavigationHelpersContext } from '@react-navigation/native';


export const LoginApi = createContext(null);


function Auth() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login"
    screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ReceberDados" component={ReceberDados} />
    </Stack.Navigator>
      );
}


function ProjetoFinal() {

      const [isLoggedIn, setIsLoggedIn] = useState(false);

      const onLoginPress = () => {
        setIsLoggedIn(true);
      };

      const api = { onLoginPress };


      function ifExists(){
        let token = AsyncStorage.getItem(token);
        if (token != null) {
          return true;
        }else {
          return false;
        }
      }


      useEffect(()=> {
        //check if token exists
        //if token exists
        // let log = ifExists();
        // if(log){
        //   onLoginPress();
        // }
        //onLoginPress();
      },[]);

      if(isLoggedIn){
      return (
      <Provider store={Store}>
        <App />
      </Provider>
      );
      }else {
        return (
        <Provider store = {Store}>
          <NavigationContainer>
            <LoginApi.Provider value={api}>
              <Auth />
            </LoginApi.Provider>
          </NavigationContainer>
        </Provider>  
      )}
      
  }


AppRegistry.registerComponent(appName, () => ProjetoFinal);
