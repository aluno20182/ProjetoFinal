import React from "react";
import PropTypes from "prop-types";
import {
  Platform,
  Text,
  View,
  Button,
  ToastAndroid,
  ListView,
  StyleSheet,
} from "react-native";
//Third party
import Hotspot from "react-native-wifi-hotspot";
import {Colors} from 'react-native/Libraries/NewAppScreen';


class EnviarDados extends React.Component {
  static navigationOptions = {
    title: "EnviarDados"
  };
  constructor(props) {
    super(props);
  }
  //HotsPot enable function
  doEnable = () => {
    // console.warn("do Enable called");
    Hotspot.enable(
      () => {
        ToastAndroid.show("Hotspot Enable", ToastAndroid.SHORT);
      },
      err => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      }
    );
  };
  //Disable HotsPot
  doDisable = () => {
    Hotspot.disable(
      () => {
        ToastAndroid.show("Hotspot Disabled", ToastAndroid.SHORT);
      },
      err => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      }
    );
  };
  //go to create screen
  goToCreate = () => {
    this.props.navigation.navigate("CreateHotspot");
  };
  //fetch your hotspot settings.
  // This funciton will give config details, after enable hotspot
  doFetch = () => {
    Hotspot.getConfig(
      config => {
        ToastAndroid.show(config.ssid, ToastAndroid.SHORT);
      },
      err => {
        ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
      }
    );
  };
  //go to the peers screen
  goToPeers = () => {
    this.props.navigation.navigate("Peers");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hotspot Library</Text>
        <View style={styles.buttonView}>
          <Text style={styles.subtitle}>
            Enable & Check if it already opened
          </Text>
          <Button title="Enable" onPress={this.doEnable} />
        </View>
        <View style={styles.buttonView}>
          <Text style={styles.subtitle}>
            Disable & Check if it already disabled
          </Text>
          <Button title="Disable" onPress={this.doDisable} />
        </View>
        <View style={styles.buttonView}>
          <Text style={styles.subtitle}>Set your hotspot settings</Text>
          <Button title="Create" onPress={this.goToCreate} />
        </View>
        <View style={styles.buttonView}>
          <Text style={styles.subtitle}>Fetch your hotspot settings</Text>
          <Button title="Fetch" onPress={this.doFetch} />
        </View>
        <View style={styles.buttonView}>
          <Text style={styles.subtitle}>Show all Peers</Text>
          <Button title="Peers" onPress={this.goToPeers} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    margin: 8
  },
  welcome: {
    fontSize: 20,
    height: 60,
    lineHeight: 50
  },
  buttonView: {
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  }
});

export default EnviarDados;