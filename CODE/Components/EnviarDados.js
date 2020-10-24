import React, { useState, useEffect } from 'react';
import RNBluetoothClassic, {
  BTEvents,
  BTCharsets,
} from 'react-native-bluetooth-classic';
import {useSelector} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import url from '../../Url';
import AndroidOpenSettings from 'react-native-android-open-settings';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../Actions/types';


export default function EnviarDados({ navigation }) {
  const navigationOptions = {
    title: 'Partilhar Dados',
    headerStyle: {
      backgroundColor: '#08a092',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  const [wifiList, setWifiList] = useState(null);
  const [ssid, setSSID] = useState();
  const [password, setPassword] = useState();
  const teste = useSelector((state) => state.UserReducer.user);
  const dispatch = useDispatch();

  

  function goToSet() {
    // Open wireless settings menu
    AndroidOpenSettings.wirelessSettings();
  }

  //
  async function hotspotPoints() {
    let email = teste.email
    let login = { email: email};
    let data = JSON.stringify(login);
    console.log('data', data)

    await fetch(url + '/pontoshotspot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,

    })
      .then((res) => res.json())
      .then((res) => {
        console.log('response', res);
        //passar para a app
        dispatch({
          type: SET_USER,
          payload: res,
        });
        return res
      })
      .catch((error) => {
        console.error(error);
      }); 
  }

  async function sendData(ssid, password) {
    let data = { ssid, password };
    data = JSON.stringify(data);
    await RNBluetoothClassic.write(data);
    console.log(data)
    hotspotPoints()
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.conjInput}>
        <Card.Title style={styles.titulo}>Configurar o Hotspot</Card.Title>

        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="SSID"
            placeholderTextColor="white"
            value={ssid}
            onChangeText={(value) => setSSID(value)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="white"
            value={password}
            onChangeText={(value) => setPassword(value)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          {/*           {this.state.error.length !== 0 && (
          <Text style={styles.errorMessage}>{this.state.error}</Text>
        )} */}
        </View>

        <Divider style={{ marginTop: 40 }} />
        <Card.FeaturedSubtitle style={{ marginTop: 20, fontFamily: 'sans-serif-thin', textAlign: 'center', fontSize: 15, color: '#fb5b5a' }}>Definições de Ponto de Acesso {">"} Definir com as mesmas credenciais que em cima {">"} Selecionar "Enviar as Credenciais"</Card.FeaturedSubtitle>

        <View style={styles.buttonView}>

          <TouchableHighlight
            style={styles.buttonCheck}
            onPress={() => {
              goToSet();
            }}>
            <Text style={styles.buttonText}>Configurar o Hotspot</Text>
          </TouchableHighlight>
        </View>
      </Card>
      <View style={styles.conjButton}>



        <TouchableHighlight style={styles.button} onPress={() => { sendData(ssid, password) }}>
          <Text style={styles.buttonText}>
            Enviar as Credenciais
        </Text>
        </TouchableHighlight>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    fontFamily: 'sans-serif-thin',
    fontSize: 30,
    color: '#fb5b5a'
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginTop: 40,
    marginLeft: 35,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonView: {
    borderRadius: 25,
    height: 50,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  input: {
    height: 60,
    color: 'white',
    fontFamily: 'sans-serif-thin',
    textAlign: 'left',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  highlight: {
    fontWeight: '700',
  },
  conjButton: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conjInput: {
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 50,
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
  buttonCheck: {
    width: '80%',
    backgroundColor: '#32CD32',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'sans-serif-light',
  },
});
