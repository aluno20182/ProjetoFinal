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
import {Auth} from 'aws-amplify';

import EnivarDados from './EnviarDados';
import ReceberDados from './ReceberDados';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {ActionButton} from '../Components';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //console.log(wifi);
    this.askForUserPermissions();
  }

  signOut = async () => {
    try {
      await Auth.signOut();
      this.props.navigation.navigate('Auth');
    } catch (err) {
      console.log('error signing out...', err);
    }
  };

  goToEnviarDados = async () => {
    try {
      this.props.navigation.navigate('');
      console.log('Enviar Dados');

    } catch (err) {
      console.log('error signing out...', err);
    }
  };

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
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <View >
            <ActionButton
              title="Enviar Dados"
              onPress={() => navigate('EnviarDados')}
            />
            <ActionButton 
              title="Receber Dados" 
              onPress={() => navigate('ReceberDados')}
            />
            <ActionButton
              title="Sign Out"
              onPress={this.signOut}
              style={styles.link}></ActionButton>
          </View>
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
  link: {
    color: 'blue',
    marginVertical: 5,
  },
});
export default Home;
