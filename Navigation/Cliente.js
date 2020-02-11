import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  PermissionsAndroid,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class Cliente extends React.Component {
  static navigationOptions = {
    title: 'Cliente',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //console.log(wifi);
    this.askForUserPermissions();
  }

  async askForUserPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Wifi networks',
          message: 'We need your permission in order to find wifi networks',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Thank you for your permission! :)');
      } else {
        console.log(
          'You will not able to retrieve wifi available networks list',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }


  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <View style={styles.instructionsContainer}>
              <Button
                title="Enviar Dados"
                onPress={() => navigate('EnviarDados')}
              />
              <Text>{'\n'}</Text>
            </View>

            <Text>{'\n'}</Text>

            <View style={styles.instructionsContainer}>
              <Button
                title="Receber Dados"
                onPress={() => navigate('ReceberDados')}
              />
              <Text>{'\n'}</Text>
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
export default Cliente;
