import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  Text,
  View,
  Button,
  ToastAndroid,
  ListView,
  StyleSheet,
  ScrollView,
} from 'react-native';
//Third party
import Hotspot from 'react-native-wifi-hotspot';
import {Colors} from 'react-native/Libraries/NewAppScreen';

class EnviarDados extends React.Component {
  static navigationOptions = {
    title: 'EnviarDados',
  };
  constructor(props) {
    super(props);
  }
  //HotsPot enable function
  doEnable = () => {
    // console.warn("do Enable called");
    Hotspot.enable(
      () => {
        ToastAndroid.show('Hotspot Enable', ToastAndroid.SHORT);
      },
      err => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      },
    );
  };
  //Disable HotsPot
  doDisable = () => {
    Hotspot.disable(
      () => {
        ToastAndroid.show('Hotspot Disabled', ToastAndroid.SHORT);
      },
      err => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      },
    );
  };
  //go to create screen
  goToCreate = () => {
    /* this.props.navigation.navigate('CreateHotspot'); */
    var hotspot = { SSID: 'HelloWorld', password: 'helloworld' }
    Hotspot.create(hotspot, () => {
      ToastAndroid.show("Hotspot Created", ToastAndroid.SHORT);
    }, (err) => {
      ToastAndroid.show("Deu merda!", ToastAndroid.SHORT);
    })
  };

  //fetch your hotspot settings.
  // This funciton will give config details, after enable hotspot
  doFetch = () => {
    Hotspot.getConfig(
      config => {
        ToastAndroid.show(config.ssid, ToastAndroid.SHORT);
      },
      err => {
        console.log(config.ssid)

        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      }
    );
  };

  //go to the peers screen
  goToPeers = () => {
    this.props.navigation.navigate('Peers');
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <View style={styles.instructionsContainer}>
              <Text style={styles.highlight}>
                Ativa e verifica se já está aberto
              </Text>
              <Button title="Ativar" onPress={this.doEnable} />
            </View>
            <View style={styles.instructionsContainer}>
              <Text style={styles.highlight}>
                Desativa e verifica se já está fechado
              </Text>
              <Button title="Desativar" onPress={this.doDisable} />
            </View>
            <View style={styles.instructionsContainer}>
              <Text style={styles.highlight}>
                Configura as opções do HotsPot
              </Text>
              <Button title="Criar" onPress={this.goToCreate} />
            </View>
            <View style={styles.instructionsContainer}>
              <Text style={styles.highlight}>Fetch das opções de HotsPot</Text>
              <Button title="Fetch" onPress={this.doFetch} />
            </View>
            <View style={styles.instructionsContainer}>
              <Text style={styles.highlight}>Mostra todos os Peers</Text>
              <Button title="Peers" onPress={this.goToPeers} />
            </View>
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

export default EnviarDados;
