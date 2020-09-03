import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  TextInput,
  ToastAndroid,
  Alert,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import wifi from 'react-native-android-wifi';
import AndroidOpenSettings from 'react-native-android-open-settings';
import Modal, {ModalContent} from 'react-native-modals';


export default function ReceberDados({navigation}) {
  const navigationOptions = {
    title: 'Receber Dados',
    headerStyle: {
      backgroundColor: '#08a092',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };


  const [ssid, SetSsid] = useState(null);
  const [pass, setPass] = useState(null);
  const [ssidExist, setSsidExist] = useState(null);
  //currentSSID: null,
  //currentBSSID: null, BSSID é simplesmente o endereço MAC de um ponto de acesso wireless ou também conhecido como WAP
  const [wifiList, setWifiList] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState(null);
  const [enable, setEnable] = useState(false);
  const [level, setLevel] = useState(null);
  const [ip, setIp] = useState(null);


  useEffect(()=>{
    verStatus();
  },[status,ssid]);

  
  //Apresenta o status da conexão
  function verStatus(){
    wifi.isEnabled(res => {
      //console.log(res)
      if (res) {
        setEnable(true);
        verSSID();
        console.log({enable});
      }
    });
  };

  function onWifi() {
    wifi.setEnabled(true);
    setEnable(true);
    console.log('wifi ligado? ' + {enable});
  };

  function offWifi(){
    wifi.setEnabled(false);
    setEnable(false);
    verSSID();
    console.log('wifi ligado? ' + {enable});
  };

  function connectOnPress() {
    console.log({pass});
    wifi.findAndConnect(ssid, pass, found => {
      setSsidExist(found);
    });
  }

  // function mudaEstado() {
  //   setTimeout(this.verStatus(), 5000);
  //   //this.verSSID();
  // };

  function verSSID(){
    wifi.getSSID(res => {
      if(enable && res != '<unknown ssid>'){
        SetSsid(res);
      }
      //ToastAndroid.show(ssid, ToastAndroid.SHORT);
    });
  };

  //dá o estado da ligação
  /*   connectionStatusOnPress = () => {
    wifi.connectionStatus(isConnected => {
      this.setState({status: isConnected});
      console.log(this.state.status);
    });
  }; */

  //level is the detected signal level in dBm, also known as the RSSI. (Remember its a negative value)
  function verLevel() {
    wifi.getCurrentSignalStrength(res => {
      //ToastAndroid.show(level, ToastAndroid.SHORT);
      console.log(res);
    });
  };

  //get the current network connection IP
  function verIP() {
    if(enable) {
      wifi.getIP(res => {
        //ToastAndroid.show(ip, ToastAndroid.SHORT);
        console.log(res);
      });
    } else {
      //ligar wifi
    }
  };

  //liga wifi se estiver desligado, desliga caso contrario
  function togglerWifi(){
    try {
      wifi.isEnabled(isEnabled => {
        if (isEnabled) {
          offWifi();
          //console.log({enable});
        } else{
          onWifi();
          setTimeout(verSSID(), 5000);
          //console.log({enable});
        }
      });
    } catch (_err) {
      console.log(_err);
    }
  };

  function connectAndRefresh(){
    togglerWifi();
    mudaEstado();
  };

  function goToSet() {
    // Open date settings menu
    AndroidOpenSettings.wirelessSettings();
  };

  function getWifiNetworksOnPress() {
    console.log({status});
    verStatus();
    if (enable) {
      wifi.loadWifiList(
        wifiStringList => {
          console.log({wifiStringList});
          var wifiArray = JSON.parse(wifiStringList);
          setWifiList(wifiArray);
          setModalVisible(true);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      //pedir ligaçao wifis
    }
  }

  function renderModal() {
    if (wifiList != null && wifiList.length > 0) {
      const wifiListComponents = wifiList.map(w => (
        <View key={w.SSID} style={styles.instructionsContainer}>
          <Text style={styles.textWifi}>{w.SSID}</Text>
          <Text style={styles.textProp}>BSSID: {w.BSSID}</Text>
          <Text style={styles.textProp}>Capabilities: {w.capabilities}</Text>
          <Text style={styles.textProp}>Frequency: {w.frequency}</Text>
          <Text style={styles.textProp}>Level: {w.level}</Text>
          <Text style={styles.textProp}>Timestamp: {w.timestamp}</Text>
          <TouchableHighlight
            style={styles.buttonS}
            onPress={() => selClick(w)}>
            <Text style={styles.buttonText}>Selecionar</Text>
          </TouchableHighlight>
        </View>
      ));
      return wifiListComponents;
    }
  };

  function selClick(w) {
    setSsid(w.ssid);
  };

  /*   goToEnviar = () =>{
    this.props.navigation.navigate('EnviarDados');
  } */

    return (
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <Text style={styles.textHighlight}>WIFI</Text>
          <View style={styles.instructionsContainer}>
            {/*              <TouchableOpacity onPress={this.goToEnviar}>
              <Image
                source={require('./refresh.png')}
                style={styles.ImageIconStyle}
              />
            </TouchableOpacity> */}

            <Text style={styles.buttonText} /*onLayout={this.verStatus}*/>
              Wifi status:{' '}
              <Text style={styles.textState}>{enable}</Text>
            </Text>
          </View>
          <View style={styles.instructionsContainer}>
            <Text style={styles.buttonText} /*onLayout={verStatus}*/>
              Wifi SSID:{' '}
              <Text
                style={styles.textState}
                onChangeText={event => {setSsid(event)}}>
                {ssid}
              </Text>
            </Text>
          </View>
          <View style={styles.instructionsContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={togglerWifi}>
              <Text style={styles.buttonText}>Ligar/Desligar Wifi</Text>
            </TouchableHighlight>

            {/* <Button title="Ligar" onPress={this.onWifi} />

            <Button title="Desligar Wifi" onPress={this.offWifi} />*/}

            <TouchableHighlight
              style={styles.button}
              title="Procurar Wifi"
              onPress={getWifiNetworksOnPress}>
              <Text style={styles.buttonText}>Redes WIFI Disponiveis</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={verSSID}>
              <Text style={styles.buttonText}>Ver SSID</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={verIP}>
              <Text style={styles.buttonText}>Ver IP</Text>
            </TouchableHighlight>
          </View>
          <Modal
            visible={modalVisible}
            presentationStyle={['pageSheet ']}
            swipeDirection={['up', 'down']} // can be string or an array
            swipeThreshold={100} // default 100
            onSwipeOut={event => {
              setModalVisible(false);
            }}
            onBackButtonPress={() => {
              setModalVisible(false);
            }}
            onTouchOutside={() => {
              setModalVisible(false);
            }}>
            <ModalContent style={styles.modal}>
              <ScrollView>
                <View>
                  <Text>{'\n'}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    <Text>Exit</Text>
                  </TouchableOpacity>
                  <Text style={styles.textHighlightS}>SSID</Text>
                  <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    onChangeText={event => {setSsid(event)}}
                    value={ssid}
                    placeholder={'ssid'}
                  />
                  <Text style={styles.textHighlightS}>Password</Text>
                  <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    onChangeText={event => {setPass(event)}}
                    value={pass}
                    placeholder={'password'}
                  />
                  <View>
                    <Button
                      title="Conectar"
                      onPress={connectOnPress}
                    />
                    <Text style={styles.answer}>
                      {ssidExist == null
                        ? ''
                        : ssidExist
                        ? 'Network in range :)'
                        : 'Network out of range :('}
                    </Text>
                  </View>
                  {renderModal()}
                </View>
              </ScrollView>
            </ModalContent>
          </Modal>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    width: 300,
    height: 300,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  instructionsContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2d2d2d',
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    marginBottom: 10,
    marginHorizontal: 10,
    fontSize: 16,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
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
  buttonS: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FC6663',
    alignSelf: 'stretch',
    margin: 10,
    marginHorizontal: 10,
  },
  buttonD: {
    padding: 30,
    borderRadius: 5,
    backgroundColor: '#08a092',
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
  textState: {
    color: '#08a092',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  textWifi: {
    color: '#08a092',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textProp: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  textHighlight: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  textHighlightS: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  bottomMessageHighlight: {
    color: '#f4a63b',
    paddingLeft: 10,
  },
  ImageIconStyle: {
    padding: 20,
    alignItems: 'center',
    margin: 15,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
});

