import React, {useEffect, useContext, useState} from 'react';
import {useSelector} from 'react-redux';
import {LoginApi} from '../../index.js';
import RNBluetoothClassic, {
  BTEvents,
  BTCharsets,
} from 'react-native-bluetooth-classic';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PropTypes} from 'prop-types';
import {Card} from 'react-native-elements';
import PushNotification from 'react-native-push-notification';

import url from '../../Url';

const propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const navigationOptions = {
  title: 'Home',
  headerLeft: null,
  headerStyle: {
    backgroundColor: '#3E606F',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default function Home({navigation}) {
  const teste = useSelector((state) => state.UserReducer.user);
  const api = useContext(LoginApi);

    //
    const onConnection = RNBluetoothClassic.addListener(
      BTEvents.CONNECTION_SUCCESS,
      sendData,
      this
    );

    async function pollForData(){
      var available = 0;
      do {
        //console.log('Checking for available data');
        available = await RNBluetoothClassic.available();
        //console.log(`There are ${available} bytes of data available`);
  
        if (available > 0) {
          console.log('Attempting to read the next message from the device');
          const data = await RNBluetoothClassic.readFromDevice();
  
          console.log(data);
          handleRead({data});
        }
      } while (available > 0);
    };


    function handleRead(data){
      console.log(data)
      if(data.data=='dados'){
        //Notificação
        PushNotification.localNotification({
          message: "Foi feito um pedido para ligação.", // (required)
        });
        //Passar para o ecra Enviar Dados
        navigation.navigate('EnviarDados');
        console.log('aqui vou eu')
      }
      console.log('data: ', data)
    };
  

    async function sendData(){
      let message = 'host'; // For commands
      await RNBluetoothClassic.write(message);
      console.log('enviei')
    };


  //[] = corre só 1 vez
  useEffect(() => {
    console.log('useasdsgfdsfdasr', teste);
    acceptConnections();
    return function cleanup() {
      onConnection.remove();
    };
  },[]);


  //permite ao utilizador terminar sessão
  function logout() {
    api.onLogoutPress();
    console.log('See you later , aligator');
  }


  async function acceptConnections() {
    console.log("App is accepting connections now...");
    try {
      const connected = await RNBluetoothClassic.accept();
      console.log(connected)
      setInterval(() => {pollForData()}, 200);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <Card containerStyle={{borderRadius: 10, marginTop: 20}}>
            <Card.Title style={{fontFamily: 'sans-serif-thin', fontSize: 30}}>
              Perfil
            </Card.Title>
            <Card.Divider />
            <Card.Image
              style={styles.image}
              resizeMode="cover"
              style={{width: 300, height: 300}}
              source={require('../Resources/avatar.png')}
            />
            <View style={styles.CardView}>
              <Text style={styles.CardText} /*onLayout={this.verStatus}*/>
                Olá, {teste.username}
              </Text>
              <Text style={styles.CardSubText}>
                Tens {teste.points} pontos.{' '}
              </Text>
            </View>
          </Card>

          <View style={styles.conjButton}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => navigation.navigate('EnviarDados')}>
              <Text style={styles.buttonText}>Enviar Dados</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={() => navigation.navigate('ReceberDados')}>
              <Text style={styles.buttonText}>Receber Dados</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => logout()} style={styles.button}>
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  CardText: {
    marginTop: 15,
    fontSize: 30,
    fontFamily: 'sans-serif-light',
    alignSelf: 'center',
    paddingLeft: 5,
  },
  CardSubText: {
    marginTop: 5,
    fontSize: 20,
    fontFamily: 'sans-serif-light',
    fontWeight: '600',
    alignSelf: 'center',
    paddingRight: 5,
    color: '#3E606F',
  },
  conjButton: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'sans-serif-light',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
