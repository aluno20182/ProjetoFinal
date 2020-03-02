import React, {Component} from 'react';
import PropTypes from 'prop-types';

//import axios from 'axios';

import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  StatusBar,
  StackActions,
  NavigationActions,
} from 'react-native';

const axios = require('axios');

class SignUp extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: 'teste',
    email: 'a@aa.com',
    password: 'teste123',
    error: '',
    success: '',
  };

  /*handleUsernameChange = name => {
    this.setState({name});
  };*/

  handleEmailChange = email => {
    this.setState({email});
  };

  handlePasswordChange = password => {
    this.setState({password});
  };

  handleBackToLoginPress = () => {
    this.props.navigation.goBack();
  };

  
  handleSignUpPress = async () => {

    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState(
        {error: 'Preencha todos os campos para continuar!'},
        () => false,
      );
    } else {
      try {
        await fetch('http://192.168.1.7:3000/users', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
          }),
        }).then((response) => response.json());
        
        console.log('ta');


        this.setState({
          success: 'Conta criada com sucesso! Redirecionando para o login',
          error: '',
        });

        setTimeout(this.goToLogin, 2500);
      } catch (_err) {
        console.log(_err);
        this.setState({
          error:
            'Houve um problema com o cadastro, verifique os dados preenchidos!',
        });
      }
    }
  };

  goToLogin = () => {
/*     const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'SignIn'})],
    });
    this.props.navigation.dispatch(resetAction); */
    this.props.navigation.navigate('SignIn');
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
{/*         <Image
          style={styles.logo}
          source={require('./amplify.png')}
          resizeMode="contain"
        /> 
        {this.state.success.length !== 0 && (
          <Text style={styles.successMessage}>{this.state.success}</Text>
        )}*/}
       <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          value={this.state.username}
          onChangeText={this.handleUsernameChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço de e-mail"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {/* {this.state.error.length !== 0 && (
          <Text style={styles.errorMessage}>{this.state.error}</Text>
        )} */}
        <TouchableHighlight style={styles.button} onPress={this.handleSignUpPress}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.signUpLink}
          onPress={this.handleBackToLoginPress}>
          <Text style={styles.signUpLinkText}>Voltar ao login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d2d2d',
  },
  logo: {
    height: 30,
    marginBottom: 40,
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    marginBottom: 15,
    marginHorizontal: 20,
    fontSize: 16,
  },

  errorMessage: {
    textAlign: 'center',
    color: '#ce2029',
    fontSize: 16,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  successMessage : {
    textAlign: 'center',
    color: '#08a092',
    fontSize: 16,
    marginBottom: 15,
    marginHorizontal: 20,
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

  signUpLink: {
    padding: 10,
    marginTop: 20,
  },

  signUpLinkText: {
    color: '#999',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SignUp;
