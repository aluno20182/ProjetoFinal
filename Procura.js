import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  Modal,
  TextInput,
  ToastAndroid,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import HomePage from './HomePage';

class Procura extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Procura',
  };

  /*componentDidMount() {
    console.log(this.props.wifi);
  }*/


  getWifiNetworksOnPress() {
    console.log("poww")
    wifi.loadWifiList(
      wifiStringList => {
        console.log(wifiStringList);
        var wifiArray = JSON.parse(wifiStringList);
        this.state ={
          wifiList: wifiArray,
          modalVisible: true,
        };
      },
      error => {
        console.log(error);
      },
    );
  }

  renderModal = () => {
    console.log("oi");
    <Text>fuck</Text>
    var wifiListComponents = [];
    for (w in this.props.wifiList) {
      wifiListComponents.push(
        <View key={w} style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>
            {this.props.wifiList[w].SSID}
          </Text>
          <Text>BSSID: {this.props.wifiList[w].BSSID}</Text>
          <Text>Capabilities: {this.props.wifiList[w].capabilities}</Text>
          <Text>Frequency: {this.props.wifiList[w].frequency}</Text>
          <Text>Level: {this.props.wifiList[w].level}</Text>
          <Text>Timestamp: {this.props.wifiList[w].timestamp}</Text>
        </View>,
      );
    }
    return wifiListComponents;
  }

  CallRender = () => {
    new HomePage().renderModal();
  };

  CallNetworks = () =>{
    new HomePage().getWifiNetworksOnPress();
    //new HomePage().renderModal();
    //console.log("oiiiiii")
    //this.renderModal;
  }
  render() {
    return (
      <View style={styles.instructionsContainer}>
        <View style={styles.instructionsContainer}>
        <Text >Available WIFI Networks</Text>
          <Button
            title="Procurar Wifi"
            onPress={this.getWifiNetworksOnPress.bind(this)}>
            {/*this.renderModal*/}
            <Text>fdsf</Text>
          </Button>
          <Text>{'\n'}</Text>
        </View>
        {/*<Modal visible={this.state.modalVisible} onRequestClose={() => {}}>*/}
        <View>
            {this.renderModal}
        </View>

        {/*</Modal>*/}
      </View>
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

export default Procura;
