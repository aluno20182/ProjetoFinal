import React, {useState, useEffect} from 'react';
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
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HotspotWizard} from 'react-native-wifi-and-hotspot-wizard';

import AndroidOpenSettings from 'react-native-android-open-settings';

import wifi from 'react-native-android-wifi';

export default function EnviarDados({navigation}) {
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

  async function sendData(ssid, password){
    let data = {ssid, password};
    data = JSON.stringify(data);
    await RNBluetoothClassic.write(data);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="SSID do HotSpot Configurado"
          value={ssid}
          onChangeText={(value) => setSSID(value)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
     
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Password do HotSpot Configurado"
          value = {password}
          onChangeText={(value) => setPassword(value)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {/*           {this.state.error.length !== 0 && (
          <Text style={styles.errorMessage}>{this.state.error}</Text>
        )} */}
      </View>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          goToSet();
        }}>
        <Text style={styles.buttonText}>Configurar o HotsPot</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.button} onPress={()=>{
            sendData(ssid,password);
        }}
        >
        <Text style={styles.buttonText}>
          Enviar as credenciais
        </Text>
      </TouchableHighlight>
{/*
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          goToCreate();
        }}>
        <Text style={styles.buttonText}> Configura as opções do HotsPot</Text>
      </TouchableHighlight> */}

      {/*         <TouchableHighlight style={styles.button} onPress={this.doFetch}>
          <Text style={styles.buttonText}> Fetch das opções de HotsPot</Text>
        </TouchableHighlight> */}
      {/* 
        <TouchableHighlight style={styles.button} onPress={this.goToPeers}>
          <Text style={styles.buttonText}> Mostra todos os Peers</Text>
        </TouchableHighlight> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '60%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  input: {
    height: 60,
    color: 'white',
    fontFamily: 'sans-serif-thin',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#FC6663',
    alignSelf: 'stretch',
    margin: 15,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
