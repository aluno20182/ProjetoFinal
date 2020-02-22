import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import EnivarDados from './EnviarDados'
import ReceberDados from './ReceberDados'


import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const HomeNav = createStackNavigator({
  EnivarDados: {
    screen: EnivarDados
  },
  ReceberDados: {
    screen: ReceberDados
  }
})

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
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


  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{this.state.ssid} oi</Text>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    backgroundColor: '#2d2d2d'
  },
  text: {
    fontFamily: 'SourceSansPro-Regular',
    color: '#ababab',
    fontSize: 18,
    justifyContent:'center'
  }
});
export default Home;
