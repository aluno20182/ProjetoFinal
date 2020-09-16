import React, { useState, useEffect } from 'react';
import RNBluetoothClassic, {
  BTEvents,
  BTCharsets,
} from 'react-native-bluetooth-classic';
import {
  Platform,
  Text,
  View,
  Button,
  ToastAndroid,
  ListView,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Clipboard
} from 'react-native';
//Third party
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { HotspotWizard } from 'react-native-wifi-and-hotspot-wizard';
import { Card, Divider } from 'react-native-elements';

import AndroidOpenSettings from 'react-native-android-open-settings';

import wifi from 'react-native-android-wifi';

export default function EnviarDados({ navigation }) {
  const navigationOptions = {
    title: 'Enviar Dados',
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
  

  //HotsPot enable function
  /* function doEnable() {
    // console.warn("do Enable called");
    HotspotWizard.turnOnHotspot('', '')
      .then((data) => {
        console.log(data);
        let status = data.status;
        if (status == 'success') {
          // Hotspot Enabled Successfully with custom credentials.
          console.log('Criado com SSID: John Doe Network & Pass: helloworld');
        } else if (status == 'auth') {
          // Hotspot Enabled Successfully with random credentials.
          console.log('o tal ssid', data.SSID);
          console.log(data.status);
        }
      })
      .catch((err) => console.log(err)); */
  /* Hotspot.enable(
      () => {
        ToastAndroid.show('Hotspot Enabled', ToastAndroid.SHORT);
      },
      err => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      },
    );
  }*/
  //Disable HotsPot
  /*   function doDisable() {
    HotspotWizard.turnOffHotspot().then((data) => {
      let status = data.status;
      if (status == 'success') {
        // Hotspot Disabled Successfully
        console.log('Disabled');
      } else {
        // Failed to disabled Hotspot.
        console.log('error');
      }
    });
    /* Hotspot.disable(
      () => {
        ToastAndroid.show('Hotspot Disabled', ToastAndroid.SHORT);
      },
      err => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      },
    ); 
  } */

  // //go to create screen
  // goToCreate = () => {
  //   /* this.props.navigation.navigate('CreateHotspot'); */
  //   var hotspot = { SSID: 'HelloWorld', password: 'helloworld' };
  //   Hotspot.create(
  //     hotspot,
  //     () => {
  //       ToastAndroid.show('Hotspot Created', ToastAndroid.SHORT);
  //     },
  //     err => {
  //       ToastAndroid.show('Deu merda!', ToastAndroid.SHORT);
  //     },
  //   );
  // };

  // //fetch your hotspot settings.
  // // This funciton will give config details, after enable hotspot
  // doFetch = () => {
  //   Hotspot.getConfig(
  //     config => {
  //       ToastAndroid.show(config.ssid, ToastAndroid.SHORT);
  //     },
  //     err => {
  //       console.log(config.ssid);

  //       ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
  //     },
  //   );
  // };

  //go to the peers screen
  /*   goToPeers = () => {
    this.props.navigation.navigate('Peers');
  }; */

  function goToSet() {
    // Open date settings menu
    AndroidOpenSettings.wirelessSettings();
  }

  async function sendData(ssid, password) {
    let data = { ssid, password };
    data = JSON.stringify(data);
    await RNBluetoothClassic.write(data);
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
