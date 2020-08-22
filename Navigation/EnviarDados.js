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
  TouchableHighlight,
} from 'react-native';
//Third party
import Hotspot from 'react-native-wifi-hotspot';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { WifiWizard, HotspotWizard } from 'react-native-wifi-and-hotspot-wizard';



class EnviarDados extends React.Component {
  static navigationOptions = {
    title: 'Enviar Dados',
    headerStyle: {
      backgroundColor: '#08a092',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  constructor(props) {
    super(props);
  }
  //HotsPot enable function
  doEnable = () => {
    // console.warn("do Enable called");
    HotspotWizard.turnOnHotspot("John Doe Network", "helloworld").then(data => {
      let status = data.status;
      if (status == "success") {
        // Hotspot Enabled Successfully with custom credentials.
        console.log('Criado com SSID: John Doe Network & Pass: helloworld')
      }
      else if (status == "auth") {
        // Hotspot Enabled Successfully with random credentials.
        console.log('o tal ssid', data.SSID);
        console.log(data.status);
      }
    }).catch(err => console.log(err))
    /* Hotspot.enable(
      () => {
        ToastAndroid.show('Hotspot Enabled', ToastAndroid.SHORT);
      },
      err => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      },
    );*/
  }; 
    //Disable HotsPot
    doDisable = () => {
      HotspotWizard.turnOffHotspot().then(data => {
        let status = data.status;
        if (status == "success") {
          // Hotspot Disabled Successfully
          console.log('Disabled');

        }
        else {
          // Failed to disabled Hotspot.
          console.log('error');

        }
      })
      /* Hotspot.disable(
        () => {
          ToastAndroid.show('Hotspot Disabled', ToastAndroid.SHORT);
        },
        err => {
          ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
        },
      ); */
    };
    //go to create screen
    goToCreate = () => {
      /* this.props.navigation.navigate('CreateHotspot'); */
      var hotspot = { SSID: 'HelloWorld', password: 'helloworld' };
      Hotspot.create(
        hotspot,
        () => {
          ToastAndroid.show('Hotspot Created', ToastAndroid.SHORT);
        },
        err => {
          ToastAndroid.show('Deu merda!', ToastAndroid.SHORT);
        },
      );
    };

    //fetch your hotspot settings.
    // This funciton will give config details, after enable hotspot
    doFetch = () => {
      Hotspot.getConfig(
        config => {
          ToastAndroid.show(config.ssid, ToastAndroid.SHORT);
        },
        err => {
          console.log(config.ssid);

          ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
        },
      );
    };

    //go to the peers screen
    goToPeers = () => {
      this.props.navigation.navigate('Peers');
    };
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.sectionContainer}>
            <TouchableHighlight style={styles.button} onPress={this.doEnable}>
              <Text style={styles.buttonText}>
                Desliga o Wifi, Liga dados Moveis e ativa o Hotspot
            </Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={this.doDisable}>
              <Text style={styles.buttonText}>
                Desativa e verifica se já está fechado
            </Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={this.goToCreate}>
              <Text style={styles.buttonText}>
                {' '}
              Configura as opções do HotsPot
            </Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={this.doFetch}>
              <Text style={styles.buttonText}> Fetch das opções de HotsPot</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={this.goToPeers}>
              <Text style={styles.buttonText}> Mostra todos os Peers</Text>
            </TouchableHighlight>
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
