/**
 * @format
 */
import 'react-native-gesture-handler';

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
import Bluetooth from './CODE/Components/Bluetooth';
import RNBluetoothClassic, {
  BTEvents,
  BTCharsets,
} from 'react-native-bluetooth-classic';
import { PermissionsAndroid } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContext,
  NavigationContainer,
  NavigationHelpersContext,
} from '@react-navigation/native';

export const LoginApi = createContext(null);

function Auth() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="SignUp" component={SignUp}
        options={{
          title: 'SignUp',
          headerStyle: {
            backgroundColor: '#3E606F',
            borderBottomColor: 'transparent',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'sans-serif-thin',
          },
          headerTitleAlign: 'center',
        }} />
      <Stack.Screen
        name="ReceberDados"
        component={ReceberDados}
        options={{
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
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="Bluetooth" component={Bluetooth} />
    </Stack.Navigator>
  );
}

function ProjetoFinal() {
  async function permissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

        {
          title: 'Wifi networks',
          message: 'We need your permission in order to find wifi networks',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Thank you for your permission! ACCESS_FINE_LOCATION :)');
      } else {
        console.log(
          'You will not able to retrieve wifi available networks list',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async function permissions2() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,

        {
          title: 'Wifi networks',
          message: 'We need your permission in order to find wifi networks',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Thank you for your permission ACCESS_COARSE_LOCATION! :)');
      } else {
        console.log(
          'You will not able to retrieve wifi available networks list',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    async function askForPermission() {
      await permissions();
      await permissions2();
    }

    askForPermission();
  }, []);




  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLoginPress = () => {
    setIsLoggedIn(true);
  };





  function notification() {

    const data = 'host';
    BleManager.startNotification(
      'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
    )
      .then(() => {
        // Success code
        console.log('Notification started');
        BleManager.write(
          'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
          'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
          'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
          data,
        )
          .then(() => {
            // Success code
            console.log('Write: ' + data);
          })
          .catch((error) => {
            // Failure code
            console.log(error);
          });
      })
      .catch((error) => {
        // Failure code
        console.log(error);
      });
  }

  const onLogoutPress = async () => {
    await AsyncStorage.removeItem('token');
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
    );
  }
}

AppRegistry.registerComponent(appName, () => ProjetoFinal);
