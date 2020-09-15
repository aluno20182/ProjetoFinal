import React, {Component, useState, useEffect, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import RNBluetoothClassic, {
  BTEvents,
  BTCharsets,
} from 'react-native-bluetooth-classic';
import {ListItem} from 'react-native-elements';


function DeviceList({
  devices,
  unpairedDevices,
  onPress,
  onPressedUnpaired,
  style,
}) {
  //console.log('DeviceList.render()');
  console.log(devices);
  //console.log(unpairedDevices);

 

  return (
    <ScrollView>
      <Text
        style={{
          fontFamily: 'sans-serif-light',
          fontSize: 25,
          color: '#fb5b5a',
        }}>
        Dispositivos Emparelhados
      </Text>
      {devices.map((device, i) => {
        return (
          <ListItem
            bottomDivider
            key={device.id}
            onPress={() => onPress(device)}>
            <ListItem.Content>
              <ListItem.Title style={styles.CardText}>
                {device.name}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.CardSubText}>
                {device.address}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
      <Text
        style={{fontFamily: 'sans-serif-light', fontSize: 25, marginTop: 20}}>
        Dispositivos Novos
      </Text>
      {unpairedDevices.map((device, i) => {
        return (
          <TouchableOpacity
            key={device.id}
            style={[styles.button2, style]}
            onPress={() => onPressedUnpaired(device)}>
            <View style={{flex: 1}}>
              <Text style={styles.deviceName}>{device.name}</Text>
              <Text>{device.address}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default function Bluetooth({navigation}) {
 
  const [deviceList, setDeviceList] = useState([]);
  const [unpairedDeviceList, setUnpairedDeviceList] = useState([]);

  const dispatch = useDispatch();
  

  useEffect(()=> {
    initialize();
    console.log(deviceList);
    console.log(unpairedDeviceList);
  },[]);

  async function discoverDevices(){
    try {
      let unpaired = await RNBluetoothClassic.discoverDevices();
      setUnpairedDeviceList(...unpairedDeviceList, unpaired);
    } catch (error) {
      console.log(error);
    }
  }
 

  async function connectDevice(device){
    try {
      await RNBluetoothClassic.connect(device.id);
      //this.setState({connectedDevice});
      console.log('connected')
      navigation.navigate('ReceberDados');
    } catch (error) {
      console.log(error.message);
    }
  }

  async function initialize() {
    let enabled = await RNBluetoothClassic.isEnabled();

    if (enabled) {
      try {
        let devices = await RNBluetoothClassic.list();
        setDeviceList(...deviceList, devices);
      } catch (error) {
        console.error(error);
      }
    }

    //this.setState(newState);
  }

  const handleRemoveItem = (e) => {
    console.log('removing')
    const address = e.address;
    setUnpairedDeviceList(unpairedDeviceList.filter(item => item.address !== address));
    console.log(unpairedDeviceList);
   };
 
  async function pairNewDevice(device) {
    //console.log(`Attempting to cancel discovery...`);
    try {
      await RNBluetoothClassic.pairDevice(device.id);
      setDeviceList(deviceList => [...deviceList, device])
      handleRemoveItem(device);
      console.log("Device Paired");
    } catch(error) {
      console.log(error);
    }
  }


  selectDevice = device => connectDevice(device);
  pairDevice = device => pairNewDevice(device);

  return (
    <ScrollView style={{flex: 1}}>
      <ListItem bottomDivider>
        {deviceList && (
          <DeviceList
            devices={deviceList}
            unpairedDevices={unpairedDeviceList}
            onPress={selectDevice}
            onPressedUnpaired={pairDevice}
          />
        )}
      </ListItem>
      <View style={styles.conjButton}>
        <TouchableOpacity style={styles.button} onPress={discoverDevices}>
          <Text style={styles.buttonText}>Discover Devices</Text>
          <ActivityIndicator size={'small'} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/**
 * The statusbar height goes wonky on Huawei with a notch - not sure if its the notch or the
 * Huawei but the fact that the notch is different than the status bar makes the statusbar
 * go below the notch (even when the notch is on).
 */
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  conjButton: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'sans-serif-light',
    paddingTop: 15,
  },
  startAcceptButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 9,
    marginBottom: 9,
  },
  CardText: {
    marginTop: 5,
    fontSize: 17,
    fontFamily: 'sans-serif-light',
    alignSelf: 'center',
    paddingLeft: 5,
  },
  CardSubText: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'sans-serif-light',
    fontWeight: '600',
    alignSelf: 'center',
    paddingRight: 5,
    color: '#3E606F',
  },
  deviceName: {
    fontSize: 16,
  },
});
