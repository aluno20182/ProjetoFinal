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
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import wifi from 'react-native-android-wifi';
import AndroidOpenSettings from 'react-native-android-open-settings';
import Modal, {ModalContent} from 'react-native-modals';
class ReceberDados extends React.Component {
  static navigationOptions = {
    title: 'ReceberDados',
  };

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
      level: null,
      ip: null,
      //peers,
      //dataSource: this.ds.cloneWithRows(peers),
    };
  }

  ServiceCheckOnPress() {
    wifi.isEnabled(isEnabled => {
      this.setState({isWifiNetworkEnabled: isEnabled});
      console.log(isEnabled);
    });
  }

  onWifi = () => {
    wifi.setEnabled(true);
    //console.log("ligou");
  };

  offWifi = () => {
    wifi.setEnabled(false);
    //console.log("desligou");
  };

  connectOnPress() {
    console.log(this.state.pass);

    wifi.findAndConnect(this.state.ssid, this.state.pass, found => {
      this.setState({ssidExist: found});
    });
  }

  verSSID = () => {
    wifi.getSSID(ssid => {
      console.log(ssid);

      //this.setState({ssid:ssid});
      ToastAndroid.show(ssid, ToastAndroid.SHORT);
    });
  };

  connectionStatusOnPress() {
    wifi.connectionStatus(isConnected => {
      this.setState({status: isConnected});
    });
  }

  //level is the detected signal level in dBm, also known as the RSSI. (Remember its a negative value)
  verLevel = () => {
    wifi.getCurrentSignalStrength(level => {
      ToastAndroid.show(level, ToastAndroid.SHORT);
      console.log(level);
    });
  };

  //get the current network connection IP
  verIP = () => {
    wifi.getIP(ip => {
      ToastAndroid.show(ip, ToastAndroid.SHORT);
      console.log(ip);
    });
  };

  wifiStatus = () => {
    wifi.isEnabled(isEnabled => {
      if (isEnabled) {
        this.offWifi();
        this.setState({status: isEnabled});
        console.log(this.state.status);
      } else if (!isEnabled) {
        this.onWifi();
        this.setState({status: isEnabled});
        console.log(this.state.status);
      }
    });
  };

  goToSet = () => {
    // Open date settings menu
    AndroidOpenSettings.wirelessSettings();
  };

  getWifiNetworksOnPress() {
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
          <Text style={styles.instructionsTitle}>{w.SSID}</Text>
          <Text>BSSID: {w.BSSID}</Text>
          <Text>Capabilities: {w.capabilities}</Text>
          <Text>Frequency: {w.frequency}</Text>
          <Text>Level: {w.level}</Text>
          <Text>Timestamp: {w.timestamp}</Text>
          <Button title="Selecionar" onPress={() => this.selClick(w)} />
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

  render() {
    return (
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              <Text style={styles.highlight}>WIFI{'\n'}</Text>
            </Text>
            <View style={styles.instructionsContainer}>
              <Button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored" title="Ligar/Desligar Wifi" onPress={this.wifiStatus} />

              {this.state.status
                ? ToastAndroid.show(
                    "You're not connected :(",
                    ToastAndroid.SHORT,
                  )
                : ToastAndroid.show("You're connected :)", ToastAndroid.SHORT)}
            </View>

            <View style={styles.instructionsContainer}>
              <Button title="Ver SSID" onPress={this.verSSID} />
            </View>

            <View style={styles.instructionsContainer}>
              <Button title="Força do Sinal" onPress={this.verLevel} />
            </View>

            <View style={styles.instructionsContainer}>
              <Button
                title="Procurar Wifi"
                onPress={this.getWifiNetworksOnPress.bind(this)}>
                <Text style={styles.buttonText}>Available WIFI Networks</Text>
              </Button>
            </View>

            <View style={styles.instructionsContainer}>
              <Button title="verIP" onPress={this.verIP} />
            </View>
            <Modal
              visible={this.state.modalVisible}
              swipeDirection={['up', 'down']} // can be string or an array
              swipeThreshold={200} // default 100
              onSwipeOut={event => {
                this.setState({modalVisible: false});
              }}
              onTouchOutside={() => {
                this.setState({modalVisible: false});
              }}>
              <ModalContent>
                <ScrollView>
                  <View style={styles.instructionsContainer}>
                    <Text>{'\n'}</Text>

                    <Text style={styles.instructions}>SSID</Text>
                    <TextInput
                      style={styles.textInput}
                      underlineColorAndroid="transparent"
                      onChangeText={event => (this.state.ssid = event)}
                      value={this.state.ssid}
                      placeholder={'ssid'}
                    />
                    <Text style={styles.instructions}>Password</Text>
                    <TextInput
                      style={styles.textInput}
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
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  instructionsContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
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
    padding: 5,
    width: 120,
    alignItems: 'center',
    backgroundColor: 'blue',
    marginRight: 15,
  },
  bigButton: {
    padding: 5,
    width: 180,
    alignItems: 'center',
    backgroundColor: 'blue',
    marginRight: 15,
  },
  buttonText: {
    color: 'white',
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

export default ReceberDados;
