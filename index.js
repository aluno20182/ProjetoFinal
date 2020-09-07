/**
 * @format
 */
import 'react-native-gesture-handler';
import MaskedView from '@react-native-community/masked-view';

import React, { Component, useEffect } from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { Store } from './CODE/store/index';
import { useState, createContext, useContext } from 'react';
import Login from './CODE/Components/Login';
import SignUp from './CODE/Components/SignUp';
import ReceberDados from './CODE/Components/ReceberDados';
import { PermissionsAndroid } from 'react-native';


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContext, NavigationContainer, NavigationHelpersContext } from '@react-navigation/native';


export const LoginApi = createContext(null);



function Auth() {
  const Stack = createStackNavigator();




  return (
    <Stack.Navigator initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ReceberDados" component={ReceberDados} options={{
        title: 'Receber Dados',
        headerStyle: {
          backgroundColor: '#3E606F',
          borderBottomColor: 'transparent',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'sans-serif-thin',
        },
        headerLeft: null,
        headerTitleAlign: "center",
      }} />
    </Stack.Navigator>
  );
}


function ProjetoFinal() {

  async function permissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

        {
          'title': 'Wifi networks',
          'message': 'We need your permission in order to find wifi networks'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Thank you for your permission! ACCESS_FINE_LOCATION :)");
      } else {
        console.log("You will not able to retrieve wifi available networks list");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async function permissions2() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,

        {
          'title': 'Wifi networks',
          'message': 'We need your permission in order to find wifi networks'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Thank you for your permission ACCESS_COARSE_LOCATION! :)");
      } else {
        console.log("You will not able to retrieve wifi available networks list");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    async function askForPermission() {
      await permissions();
      await permissions2();
    }

    askForPermission()
  }, [])

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLoginPress = () => {
    setIsLoggedIn(true);
  };


  const onLogoutPress = () => {
    setIsLoggedIn(false);
  };

  const api = { onLoginPress, onLogoutPress };


  function ifExists() {
    let token = AsyncStorage.getItem(token);
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }

  if (isLoggedIn) {
    return (
      <Provider store={Store}>
        <LoginApi.Provider value={api}>
          <App />
        </LoginApi.Provider>
      </Provider>
    );
  } else {
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <LoginApi.Provider value={api}>
            <Auth />
          </LoginApi.Provider>
        </NavigationContainer>
      </Provider>
    )
  }

}


AppRegistry.registerComponent(appName, () => ProjetoFinal);
