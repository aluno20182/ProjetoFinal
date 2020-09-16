import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ToastAndroid,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
//Third party

class Peers extends React.Component {
  static navigationOptions = {
    title: 'Peers',
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
    this.state = {
      dataSource: [],
    };
  }
  //get peers
  // Now its throw only error part
  // doPeers = () => {
  //   Hotspot.peersList(
  //     data => {
  //       const peers = JSON.parse(data);
  //       this.setState({dataSource: peers});
  //     },
  //     err => {
  //       ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
  //     },
  //   );
  // };



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonView}>
          <Text style={styles.textHighlight}>Show all Peers</Text>
          <TouchableHighlight style={styles.button} onPress={this.doPeers}>
            <Text style={styles.buttonText}>Peers</Text>
          </TouchableHighlight>
        </View>
        <FlatList
          data={this.state.dataSource}
          style={styles.flatList}
          renderItem={({item}, index) => {
            return (
              <View style={styles.viewList}>
                <Text style={styles.viewText}>{item.device}</Text>
                <Text style={styles.viewText}>{item.ip}</Text>
                <Text style={styles.viewText}>{item.mac}</Text>
              </View>
            );
          }}
          keyExtractor={item => item.device}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#2d2d2d',
  },
  highlight: {
    fontWeight: '700',
  },
  textHighlight: {
    marginTop: 20,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
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
  viewList: {
    backgroundColor: '#F1F1F1',
    marginBottom: 10,
  },
  viewText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  flatList: {
    marginTop: 15,
  },
});

export default Peers;
