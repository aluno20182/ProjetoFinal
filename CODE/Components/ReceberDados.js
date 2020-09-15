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
  SafeAreaView,
  NativeModules,
  DeviceEventEmitter,
  NativeEventEmitter
} from 'react-native';


import { Colors } from 'react-native/Libraries/NewAppScreen';

import wifi from 'react-native-android-wifi';

import AndroidOpenSettings from 'react-native-android-open-settings';
import Modal, { ModalContent } from 'react-native-modals';
import { Card, Divider } from 'react-native-elements';
import RNBluetoothClassic, {
  BTEvents,
  BTCharsets,
} from 'react-native-bluetooth-classic';
import { WifiWizard, HotspotWizard } from 'react-native-wifi-and-hotspot-wizard';





export default function ReceberDados({ navigation }) {

  const [ssid, SetSsid] = useState(null);
  const [pass, setPass] = useState(null);
  const [ssidExist, setSsidExist] = useState(null);
  //currentSSID: null,
  //currentBSSID: null, BSSID é simplesmente o endereço MAC de um ponto de acesso wireless ou também conhecido como WAP
  const [wifiList, setWifiList] = useState(null);
  const [list, setList] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState(null);
  const [enable, setEnable] = useState(false);
  const [level, setLevel] = useState(null);
  const [ip, setIp] = useState(null);


    //falta listener connection failed e lost



  useEffect(() => {
    verStatus();
    const interval = setInterval(() => {pollForData()}, 200);
    //cleanup remove listener e interval
  }, [status]);

  const [scannedData, setScannedData] = useState(null)

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
    // data.timestamp = new Date();
    // let scannedData = {scannedData};
    // scannedData.unshift(data);
    // setScannedData(scannedData);
    console.log('special: ', data);
    switch (data.data) {
      case 'host':
        sendData('dados')
        break;
      case true:
        console.log('entri')
        setSsid(JSON.parse(data.ssid));
        setPass(JSON.parse(data.password));
        break;s
      default:
        break;
    }
   
    console.log('data: ', data)
  };

  async function sendData(message){
     // For commands
    await RNBluetoothClassic.write(message);
    console.log('enviei')
  };

  // sendData = async () => {
  //   let message = this.state.text + '\r'; // For commands
  //   await RNBluetoothClassic.write(message);

  //   let scannedData = this.state.scannedData;
  //   scannedData.unshift({
  //     timestamp: new Date(),
  //     data: this.state.text,
  //     type: 'sent',
  //   });
  //   this.setState({text: '', scannedData});
  // };


  //Apresenta o status da conexão
  function verStatus() {
    wifi.isEnabled(res => {
      //console.log(res)
      if (res) {
        setEnable('Ligado');
        verSSID();
        //console.log({enable});
      }
      else {
        setEnable('Desligado');
        verSSID()
      }
    });
  };

  function onWifi() {
    WifiWizard.turnOnWifi();
    setEnable('Ligado');
    console.log('wifi ligado? ' + enable);
  };

  async function offWifi() {
    //WifiManager.setEnabled(false);
    //wifi.setEnabled(false)
    await WifiWizard.turnOffWifi();
    setEnable('Desligado');
    verSSID();
    console.log('wifi ligado? ' + enable);
  };

  function turnOffWifi() {
    WifiWizard.turnOffWifi().then(() => {
      console.log('WiFi is now INACTIVE')
    });
  }

  async function connectOnPress() {
    console.log(pass);

    /*     wifi.findAndConnect(ssid, pass, (found) => {
          console.log(ssid, 'ssid');
          console.log(pass, 'pass');
          console.log(found, 'found');
    
          if (found) {
            console.log("wifi is in range");
            setSsid(ssid);
    
          } else {
            console.log("wifi is not in range");
          }
        });  */



    /* 
        try {
          const data = await WifiManager.connectToProtectedSSID(
            ssid,
            pass,
            false,
          );
          console.log('Connected successfully!', {data});
          SetSsid(ssid);
        } catch (error) {
          console.log('Connection failed!', {error});
        }  */

    let network = wifiList.filter((Network) => {
      console.log('ssssssssssss', ssid)
      return Network.SSID == "NOS-8E40";
    })
    console.log(network[0])

    WifiWizard.connectToNetwork(network[0], "NOS-8E40", "7ea33eeec632")
      .then((data) => {
        console.log('sextou', data)
        if (data.status == "connected") {
          // Further Tasks
          console.log("wifi is in range");
          setSsidExist(ssid);
        }
      }).catch(err => console.log(err))

  }


  function verSSID() {

    wifi.getSSID((res) => {
      SetSsid(res);
      console.log(res);
    });
    //ligar wifi



  };




  //get the current network connection IP
  function verIP() {
    if (enable) {
      wifi.getIP(res => {
        //ToastAndroid.show(ip, ToastAndroid.SHORT);
        console.log(res);
      });
    } else {
      //ligar wifi
    }
  };

  //liga wifi se estiver desligado, desliga caso contrario
  function togglerWifi() {
    try {
      wifi.isEnabled(res => {
        if (res) {
          offWifi();
          console.log({ enable });
        } else {
          onWifi();
          //setTimeout(verSSID(), 5000);
          console.log({ enable });
        }
      });
    } catch (_err) {
      console.log(_err);
    }
  };

  function connectAndRefresh() {
    togglerWifi();
    mudaEstado();
  };

  function goToSet() {
    // Open date settings menu
    AndroidOpenSettings.wifiSettings();
  };

  function getWifiNetworksOnPress() {
    console.log({ status });
    verStatus();
    if (enable) {
      wifi.loadWifiList(
        wifiStringList => {
          console.log({ wifiStringList });
          var wifiArray = JSON.parse(wifiStringList);
          setList(wifiArray)

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
    console.log(w.SSID)
    SetSsid(w.SSID);
  };

  /*   goToEnviar = () =>{
    this.props.navigation.navigate('EnviarDados');
  } */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View >
          <Card
            containerStyle={{ borderRadius: 10, marginTop: 50 }}>
            <Card.Title style={{ fontFamily: 'sans-serif-light', fontSize: 30 }}>Wifi</Card.Title>
            <View style={styles.CardView}>
              <Text style={styles.CardText} /*onLayout={this.verStatus}*/>Status</Text>
              <Text style={styles.CardSubText}>{enable} </Text>
            </View>
            <Divider style={{ backgroundColor: 'black' }} />
            <View style={styles.CardView}>
              <Text style={styles.CardText}/*onLayout={verStatus}*/>SSID:</Text>
              <Text style={styles.CardSubText} /* onChangeText={event => { setSsid(event) }} */>{ssid}</Text>
            </View>
          </Card>
        </View>
        <View style={styles.conjButton}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => { togglerWifi() }}>
            <Text style={styles.ButtonText}>Ligar/Desligar Wifi</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            title="Procurar Wifi"
            onPress={getWifiNetworksOnPress}>
            <Text style={styles.ButtonText}>Redes WIFI Disponiveis</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button} onPress={verSSID}>
            <Text style={styles.ButtonText}>Ver SSID</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button} onPress={verIP}>
            <Text style={styles.ButtonText}>Ver IP</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => {navigation.navigate('Bluetooth')}}>
            <Text style={styles.ButtonText}>Ver Devices</Text>
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
              <Text>{'\n'}</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={styles.exit}>Exit</Text>
              </TouchableOpacity>
              <Text style={styles.textHighlightS}>SSID</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={event => { SetSsid(event) }}
                value={ssid}
                placeholder={'ssid'}
              />
              <Text style={styles.textHighlightS}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={event => { setPass(event) }}
                value={pass}
                placeholder={'password'}
              />
              <View style={styles.conjButton}>
                <TouchableHighlight
                  style={styles.button}
                  onPress={connectOnPress}
                >
                <Text>
                Conectar
                </Text>
                </TouchableHighlight>
                <Text style={styles.answer}>
                  {ssidExist == null
                    ? ''
                    : ssidExist
                      ? 'Network in range :)'
                      : 'Network out of range :('}
                </Text>
              </View>
              {renderModal()}
            </ScrollView>
          </ModalContent>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    width: 300,
    height: 300,
  },
  exit: {
    fontFamily: 'sans-serif-light',
    color:'white'
  },
  
  CardView: {
    marginTop: 15,
    marginBottom: 25,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  CardText: {
    marginTop: 5,
    fontSize: 20,
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
  ButtonText: {
    color: 'white',
    fontFamily: 'sans-serif-light',
  },
  instructionsContainer: {
    marginTop: 5,
    marginBottom: 5,
    flex: 1,
    justifyContent: 'space-between',
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
    fontSize: 30,
    fontFamily: 'sans-serif-light',
    alignSelf: 'center',
    paddingLeft: 5,
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
  textHighlightS: {
    color: '#FFF',
    fontFamily: 'sans-serif',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,  
  },
  bottomMessageHighlight: {
    color: '#f4a63b',
    paddingLeft: 10,
  },
});

