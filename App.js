/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  Modal,
  ToastAndroid,
  TextInput,
  TouchableHighlight,
  PermissionsAndroid,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';



import wifi from "react-native-android-wifi";
//import Hotspot from "react-native-wifi-hotspot";



class App extends React.Component {


    constructor(props) {
      super(props);
      this.state = {
        isWifiNetworkEnabled: null,
        ssid: null,
        pass: null,
        ssidExist: null,
        currentSSID: null,
        currentBSSID: null, 
        wifiList: null,
        modalVisible: false,
        status:null,
        level: null,
        ip: null,
      };
    }

    componentDidMount (){
      //console.log(wifi);
      this.askForUserPermissions();
    }

    async askForUserPermissions() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Wifi networks',
            'message': 'We need your permission in order to find wifi networks'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Thank you for your permission! :)");
        } else {
          console.log("You will not able to retrieve wifi available networks list");
        }
      } catch (err) {
        console.warn(err)
      }
    }

    ServiceCheckOnPress(){
      wifi.isEnabled(
        (isEnabled)=>{
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

    connectOnPress(){
      wifi.findAndConnect(this.state.ssid, this.state.pass, (found) => {
        this.setState({ssidExist:found});
      });
    }

/*
    enable() {
      Hotspot.enable(() => {
        ToastAndroid.show("Hotspot Enabled",ToastAndroid.SHORT);
      }, (err) => {
        ToastAndroid.show(err.toString(),ToastAndroid.SHORT);
      })
    }
    disable() {
      Hotspot.disable(() => {
        ToastAndroid.show("Hotspot Disabled",ToastAndroid.SHORT);
      }, (err) => {
        ToastAndroid.show(err.toString(),ToastAndroid.SHORT);
      })
    }
*/

    getWifiNetworksOnPress(){
      wifi.loadWifiList((wifiStringList) => {
          console.log(wifiStringList);
          var wifiArray = JSON.parse(wifiStringList);
          this.setState({
            wifiList:wifiArray,
            modalVisible: true
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }

    conectar(){
      //found returns true if ssid is in the range
      wifi.findAndConnect(this.state.ssid, this.state.password, (found) => {
        this.setState({ssidExist:found});
      });
    }


    verSSID = () => {
      wifi.getSSID((ssid) => {
        console.log(ssid);
      });
    };

    connectionStatusOnPress(){
      wifi.connectionStatus((isConnected) => {
        this.setState({status:isConnected});
      });
    }


    //level is the detected signal level in dBm, also known as the RSSI. (Remember its a negative value)
    verLevel = () => {
      wifi.getCurrentSignalStrength((level) => {
        console.log(level);
      });
    };

    //get the current network connection IP
    verIP = () => {
      wifi.getIP((ip) => {
        console.log(ip);
      });
    };

    wifiStatus = () => {
      wifi.isEnabled((isEnabled) => {
      if (isEnabled) {
        this.offWifi();
        console.log("Wifi está DESLIGADO");
      } else if(!isEnabled) {
        this.onWifi();
        console.log("Wifi está LIGADO");
      }
      });
    };

    renderModal(){
      var wifiListComponents = [];
      for (w in this.state.wifiList){
        wifiListComponents.push(
          <View key={w} style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>{this.state.wifiList[w].SSID}</Text>
            <Text>BSSID: {this.state.wifiList[w].BSSID}</Text>
            <Text>Capabilities: {this.state.wifiList[w].capabilities}</Text>
            <Text>Frequency: {this.state.wifiList[w].frequency}</Text>
            <Text>Level: {this.state.wifiList[w].level}</Text>
            <Text>Timestamp: {this.state.wifiList[w].timestamp}</Text>
          </View>
        );
      }
      return wifiListComponents;
    }


  render() {
    return (
      <ScrollView>            
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              <Text style={styles.highlight}>WIFI{"\n"}</Text>
            </Text>
            <View style={styles.instructionsContainer}>
              <Button
                title="Ligar/Desligar Wifi"
                onPress={this.wifiStatus}
              />
              <Text style={styles.answer}> {this.state.status?"Ligado :)":"Desligado :("}</Text>
              <Text>{"\n"}</Text>

            </View>
            
            <Text>{"\n"}</Text>

            <View style={styles.instructionsContainer}>                            
              <Button
                title="Ver SSID"
                onPress={this.verSSID}
              /> 
              <Text style={styles.answer}> {this.state.ssid}</Text>
              <Text>{"\n"}</Text>
            </View>             

            <Text>{"\n"}</Text>
            
            <View style={styles.instructionsContainer}>                            
              <Button
                title="Força do Sinal"
                onPress={this.verLevel}
              />
              <Text>{"\n"}</Text>
            </View>
            
            <Text>{"\n"}</Text>

            <View style={styles.instructionsContainer}>
              <Text>Sign device into a specific network:</Text>
              <Text>{"\n"}</Text>
              <Text>SSID</Text>
              <TextInput 
                underlineColorAndroid='transparent'
                onChangeText={(event)=>this.state.ssid=event}
                value={this.state.ssid}
                placeholder={'ssid'} 
              />
              <Text>Password</Text>
              <TextInput
                secureTextEntry={true} 
                underlineColorAndroid='transparent'
                onChangeText={(event)=>this.state.pass=event}
                value={this.state.pass}
                placeholder={'password'}                   
              />
              <View>
                <Button title="Conectar" onPress={this.connectOnPress.bind(this)}/>
                <Text style={styles.answer}>{this.state.ssidExist==null?"":this.state.ssidExist?"Network in range :)":"Network out of range :("}</Text>
              </View>
            </View>

            <Text>{"\n"}</Text>

            <View style={styles.instructionsContainer}>
              <Button 
                title="Procurar Wifi"
                onPress={this.getWifiNetworksOnPress.bind(this)}>
                <Text style={styles.buttonText}>Available WIFI Networks</Text>
              </Button>
              <Text>{"\n"}</Text>
            </View>

            <Text>{"\n"}</Text>
          
            <View style={styles.instructionsContainer}>
              <Button
                title="verIP"
                onPress={this.verIP}
              />           
              <Text>{"\n"}</Text>
              <Text style={styles.sectionTitle}>
                <Text style={styles.highlight}>{"\n"}HOTSPOT</Text>
              </Text>
            </View>

            <View style={styles.sectionContainer}>
              <Button 
                title="Ativar Hotspot" 
                onPress={this.enable} 
              />
            </View>

            <View style={styles.sectionContainer}>
              <Button 
                title="desativar Hotspot" 
                onPress={this.disable} 
              />
            </View>

            <View style = {styles.sectionContainer}>
              <Text style = {styles.sectionTitle}>
                <Text style = {styles.highlight}>TO DO</Text>
              </Text>
              <Text style= {styles.sectionDescription}>Implementar: Esquecer a rede</Text>
            </View>
          </View>
          <Modal 
            visible={this.state.modalVisible}
            onRequestClose={() => {}}>
            <Button title="Back" onPress={()=>this.setState({modalVisible:false})}>
              <Text style={styles.buttonText}>Close</Text>
            </Button>
            <ScrollView>
              {this.renderModal()}
            </ScrollView>
          </Modal>
        </View>
      </ScrollView>       
    );
  }
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  instructionsContainer: {
    padding:15,
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
  button:{
    padding:5,
    width:120,
    alignItems: 'center',
    backgroundColor:'blue',
    marginRight: 15,
  },
  bigButton:{
    padding:5,
    width:180,
    alignItems: 'center',
    backgroundColor:'blue',
    marginRight: 15,
  },
  buttonText:{
    color:'white'
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


export default App;