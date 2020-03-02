import React from 'react';
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
import {fromLeft} from 'react-navigation-transitions';
class ReceberDados extends React.Component {
  static navigationOptions = {
    title: 'Receber Dados',
    headerStyle: {
      backgroundColor: '#08a092',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    transitionConfig: () => fromLeft(),
  };

  intervalo = 0;

  componentDidMount() {
    this.intervalo = setInterval(this.verStatus, 5000);
  }

  constructor(props) {
    super(props);
    //const ds = new FlatList.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //const peers = [];
    this.state = {
      isWifiNetworkEnabled: null,
      ssid: null,
      pass: null,
      ssidExist: null,
      //currentSSID: null,
      //currentBSSID: null, BSSID é simplesmente o endereço MAC de um ponto de acesso wireless ou também conhecido como WAP
      wifiList: null,
      modalVisible: false,
      status: null,
      enable: null,
      level: null,
      ip: null,
      //peers,
      //dataSource: this.ds.cloneWithRows(peers),
    };
  }

  //Apresenta o status da conexão
  verStatus = () => {
    wifi.isEnabled(isEnabled => {
      if (isEnabled) {
        this.setState({enable: 'Ligado'});
        this.verSSID();
        console.log(this.state.enable);
      } else if (!isEnabled) {
        this.setState({enable: 'Desligado'});
        this.setState({ssid: 'Não está conectado!'});
        console.log(this.state.enable);
      }
    });
  };

  onWifi = () => {
    wifi.setEnabled(true);
    this.setState({enable: 'Ligado'});
    console.log('wifi ligado? ' + this.state.enable);
  };

  offWifi = () => {
    wifi.setEnabled(false);
    this.setState({enable: 'Desligado'});
    this.verSSID();
    console.log('wifi ligado? ' + this.state.enable);
  };

  connectOnPress() {
    console.log(this.state.pass);

    wifi.findAndConnect(this.state.ssid, this.state.pass, found => {
      this.setState({ssidExist: found});
    });
  }

  mudaEstado = () => {
    setTimeout(this.verStatus(), 5000);
    //this.verSSID();
  };

  verSSID = () => {
    wifi.getSSID(ssid => {
      this.verStatus;
      if (
        this.state.enable == 'Ligado' &&
        this.state.ssid == '<unknown ssid>'
      ) {
        this.setState({ssid: 'Não está conectado!'});
        console.log(ssid);
      } else if (
        this.state.enable == 'Ligado' &&
        this.state.ssid != '<unknown ssid>'
      ) {
        this.setState({ssid: ssid});
        console.log(ssid);
      } else if (
        this.state.enable == 'Desligado' ||
        this.state.ssid == '<unknown ssid>'
      ) {
        this.setState({ssid: 'Não está conectado!'});
        console.log(ssid);
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
  verLevel = () => {
    wifi.getCurrentSignalStrength(level => {
      ToastAndroid.show(level, ToastAndroid.SHORT);
      console.log(level);
    });
  };

  //get the current network connection IP
  verIP = () => {
    if (this.state.isEnabled == true) {
      wifi.getIP(ip => {
        ToastAndroid.show(ip, ToastAndroid.SHORT);
        console.log(ip);
      });
    } else {
      ToastAndroid.show(
        'Para aceder a esta função ligue WIFI',
        ToastAndroid.SHORT,
      );
    }
  };

  //liga wifi se estiver desligado, desliga caso contrario
  togglerWifi = () => {
    try {
      wifi.isEnabled(isEnabled => {
        if (isEnabled) {
          this.offWifi();
          console.log(this.state.enable);
        } else if (!isEnabled) {
          this.onWifi();
          setTimeout(this.verSSID, 5000);
          console.log(this.state.enable);
        }
      });
    } catch (_err) {
      console.log(_err);
    }
  };

  connectAndRefresh = () => {
    this.togglerWifi();
    this.mudaEstado();
  };

  goToSet = () => {
    // Open date settings menu
    AndroidOpenSettings.wirelessSettings();
  };

  getWifiNetworksOnPress() {
    //clearInterval(this.intervalo)
    console.log(this.state.status);
    this.verStatus();
    if (this.state.enable == 'Ligado') {
      wifi.loadWifiList(
        wifiStringList => {
          console.log(wifiStringList);
          var wifiArray = JSON.parse(wifiStringList);
          this.setState({
            wifiList: wifiArray,
            modalVisible: true,
          });
        },
        error => {
          console.log(error);
        },
      );
    } else if (this.state.enable == 'Desligado') {
      ToastAndroid.show(
        'Para aceder a esta função ligue WIFI',
        ToastAndroid.SHORT,
      );
    }
  }

  renderModal = () => {
    /*     let wifiListComponents = [];
    if (this.state.wifiList != null && this.state.wifiList.length > 0) {
      for (w in this.state.wifiList) {
        wifiListComponents.push(
        <View style={styles.instructionsContainer}>
          <View key={w} style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>
              {this.state.wifiList[w].SSID}
            </Text>
            <Text>BSSID: {this.state.wifiList[w].BSSID}</Text>
            <Text>Capabilities: {this.state.wifiList[w].capabilities}</Text>
            <Text>Frequency: {this.state.wifiList[w].frequency}</Text>
            <Text>Level: {this.state.wifiList[w].level}</Text>
            <Text>Timestamp: {this.state.wifiList[w].timestamp}</Text>
          </View>
          <Button title="Selecionar" key={w} onPress={this.selClick} />
        </View>
        );
      }
    }
    return wifiListComponents;   */
    //console.log(this.state.wifiList);

    if (this.state.wifiList != null && this.state.wifiList.length > 0) {
      const wifiListComponents = this.state.wifiList.map(w => (
        <View key={w.SSID} style={styles.instructionsContainer}>
          <Text style={styles.textWifi}>{w.SSID}</Text>
          <Text style={styles.textProp}>BSSID: {w.BSSID}</Text>
          <Text style={styles.textProp}>Capabilities: {w.capabilities}</Text>
          <Text style={styles.textProp}>Frequency: {w.frequency}</Text>
          <Text style={styles.textProp}>Level: {w.level}</Text>
          <Text style={styles.textProp}>Timestamp: {w.timestamp}</Text>
          <TouchableHighlight
            style={styles.buttonS}
            onPress={() => this.selClick(w)}>
            <Text style={styles.buttonText}>Selecionar</Text>
          </TouchableHighlight>
        </View>
      ));
      return wifiListComponents;
    }
  };

  selClick = w => {
    this.setState({
      ssid: w.SSID,
    });
  };

  /*   goToEnviar = () =>{
    this.props.navigation.navigate('EnviarDados');
  } */

  render() {
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

            <Text style={styles.buttonText} onLayout={this.verStatus}>
              Wifi status:{' '}
              <Text style={styles.textState}>{this.state.enable}</Text>
            </Text>
          </View>
          <View style={styles.instructionsContainer}>
            <Text style={styles.buttonText} onLayout={this.verStatus}>
              Wifi SSID:{' '}
              <Text
                style={styles.textState}
                onChangeText={event => (this.state.ssid = event)}>
                {this.state.ssid}
              </Text>
            </Text>
          </View>
          <View style={styles.instructionsContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={this.togglerWifi}>
              <Text style={styles.buttonText}>Ligar/Desligar Wifi</Text>
            </TouchableHighlight>

            {/* <Button title="Ligar" onPress={this.onWifi} />

            <Button title="Desligar Wifi" onPress={this.offWifi} />*/}

            <TouchableHighlight
              style={styles.button}
              title="Procurar Wifi"
              onPress={this.getWifiNetworksOnPress.bind(this)}>
              <Text style={styles.buttonText}>Redes WIFI Disponiveis</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={this.verSSID}>
              <Text style={styles.buttonText}>Ver SSID</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={this.verIP}>
              <Text style={styles.buttonText}>Ver IP</Text>
            </TouchableHighlight>
          </View>
          <Modal
            visible={this.state.modalVisible}
            presentationStyle={['pageSheet ']}
            swipeDirection={['up', 'down']} // can be string or an array
            swipeThreshold={100} // default 100
            onSwipeOut={event => {
              this.setState({modalVisible: false});
            }}
            onBackButtonPress={() => {
              this.setState({modalVisible: false});
            }}
            onTouchOutside={() => {
              this.setState({modalVisible: false});
            }}>
            <ModalContent style={styles.modal}>
              <ScrollView>
                <View>
                  <Text>{'\n'}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({visibleModal: false});
                    }}>
                    <Text>Exit</Text>
                  </TouchableOpacity>
                  <Text style={styles.textHighlightS}>SSID</Text>
                  <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    onChangeText={event => (this.state.ssid = event)}
                    value={this.state.ssid}
                    placeholder={'ssid'}
                  />
                  <Text style={styles.textHighlightS}>Password</Text>
                  <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    onChangeText={event => (this.state.pass = event)}
                    value={this.state.pass}
                    placeholder={'password'}
                  />
                  <View>
                    <Button
                      title="Conectar"
                      onPress={this.connectOnPress.bind(this)}
                    />
                    <Text style={styles.answer}>
                      {this.state.ssidExist == null
                        ? ''
                        : this.state.ssidExist
                        ? 'Network in range :)'
                        : 'Network out of range :('}
                    </Text>
                  </View>
                  {this.renderModal()}
                </View>
              </ScrollView>
            </ModalContent>
          </Modal>
        </View>
      </View>
    );
  }
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

export default ReceberDados;
