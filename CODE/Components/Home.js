import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  PermissionsAndroid,
  TouchableHighlight,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import url from '../../Url';


class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#3E606F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
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
    const {email} = this.props.navigation.state.params.data;
    console.log(email);

    await fetch(url + '/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);

        this.props.navigation.navigate('SignIn');
      })
      .catch(err => console.log(err));
  };

  getPoints = async () => {
    const {email} = this.props.navigation.state.params.data;
    console.log(email);

    await fetch(url + '/getpoints', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log('esteee', res);
        return <Text />;
      })
      .catch(err => console.log(err));
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
    let nome = this.props.users.firstname;

    return (
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          {this.getPoints}
          <View style={styles.intro}>
                <Text style={styles.statusText}>Olá, {nome}!</Text>
              </View>
          <TouchableHighlight
            style={styles.button}
            onPress={() => navigate('EnviarDados')}>
            <Text style={styles.buttonText}>Enviar Dados</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => navigate('ReceberDados')}>
            <Text style={styles.buttonText}>Receber Dados</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.signOut} style={styles.link}>
            <Text style={styles.buttonText}>Sair</Text>
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
export default Home;
