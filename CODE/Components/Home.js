import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
//import { signOut, getPoints } from '../Actions/HomeActions';

import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { PropTypes } from 'prop-types';


const propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const navigationOptions = {
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

export default function Home ({navigation}){

  const teste = useSelector(state => state.UserReducer.user);


  //[] = corre só 1 vez
  useEffect(() => {
    console.log('useasdsgfdsfdasr', teste.username);

  }, []);

  /*   componentDidMount() {
    //console.log(wifi);
    this.askForUserPermissions();
  } */

/*   handleSignOutPress = () => {
    this.props.signOut(this.props.email);
  }; */


  
  


    //const { navigate } = this.props.navigation;
    //let username = this.props.user.username;



    /* let pontos = this.props.user.points;


    console.log(nome, 'nome');
    console.log(pontos, 'pontos');
 */
    //console.log('useasdsgfdsfdasr', email);


    return (
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
         
          <View style={styles.intro}>
            <Text style={styles.statusText}>Olá, {teste.username} !</Text>

          </View>
          <TouchableHighlight
            style={styles.button}
            onPress={() => navigation.navigate('EnviarDados')}>
            <Text style={styles.buttonText}>Enviar Dados</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => navigation.navigate('ReceberDados')}>
            <Text style={styles.buttonText}>Receber Dados</Text>
          </TouchableHighlight>
{/*           <TouchableHighlight onPress={this.handleSignOutPress} style={styles.link}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableHighlight> */}
        </View>
      </View>
    );
  
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
    color: '#000',
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
