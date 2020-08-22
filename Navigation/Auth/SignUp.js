import React, { Component } from 'react';
import PropTypes from 'prop-types';
import url from '../../Url';

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

  constructor(props) {
    super(props);
    this.state = {
      username: 'btest',
      email: 'b@bb.com',
      password: 'teste123',
      firstname: 'B',
      lastname: 'BB',
      points: '',
      error: '',
      success: '',
    };
  }

  username(event) {
    this.setState({username: event.nativeEvent.text});
  }
  firstname(event) {
    this.setState({firstname: event.nativeEvent.text});
  }
  lastname(event) {
    this.setState({lastname: event.nativeEvent.text});
  }
  email(event) {
    this.setState({email: event.nativeEvent.text});
  }
  password(text) {
    this.setState({password: text});
  }



  /*handleUsernameChange = name => {
    this.setState({name});
  };*/

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handleFirstNameChange = firstname => {
    this.setState({ firstname });
  };
  handleLastNameChange = lastname => {
    this.setState({ lastname });
  };

  handleBackToLoginPress = () => {
    this.props.navigation.goBack();
  };


  signUp() {
    let email = this.state.email;
    let password = this.state.password;
    let first = this.state.first;
    let last = this.state.last;
    if (
      email === '' ||
      password === '' ||
      first === '' ||
      last === '' 
    ) {
      this.setState({
        error: 'Por favor, preencha todos os campos!',
      });
    }
    else {
      console.log('match password');
      this.handleSignUpPress(email, password, first, last);
    }
  }

  renderButton() {

    return (
      <TouchableHighlight
        style={styles.loginBtn}
        onPress={() => this.signUp()}
        underlayColor="#99d9f4">
        <Text style={styles.loginText}>Criar Conta</Text>
      </TouchableHighlight>
    );
  }

  handleSignUpPress = async (email, password, first, last) => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState(
        { error: 'Preencha todos os campos para continuar!' },
        () => false,
      );
    } else {
      try {

        await fetch(url + '/createaccount', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
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
            'Houve um problema com o registo, verifique os dados preenchidos!',
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
        <View style={styles.intro}>
          <Text style={styles.logo}>Por favor, preencha todos os campos!</Text>
        </View>
        <View style={styles.inputView}>

          <TextInput
            style={styles.input}
            placeholder="Nome de utilizador"
            placeholderTextColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            onChange={this.username.bind(this)}
            value={this.state.username}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Endereço de e-mail"
            keyboardTyle="email-address"
            placeholderTextColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            onChange={this.email.bind(this)}
            value={this.state.email}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="white"
            value={this.state.firstname}
            onChange={this.firstname.bind(this)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Second Name"
            placeholderTextColor="white"
            value={this.state.lastname}
            onChange={this.lastname.bind(this)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="white"
            value={this.state.password}
            onChange={this.password.bind(this)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </View>

        <Text style={styles.error}>{this.state.error}</Text>

        {this.renderButton()}
        <TouchableHighlight
          onPress={this.handleBackToLoginPress}>
          <Text style={styles.signUpLinkText}>Voltar ao login</Text>
        </TouchableHighlight>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  intro: {
    alignItems: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontFamily: 'sans-serif-thin',
    fontSize: 20,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  input: {
    height: 50,
    fontFamily: 'sans-serif-thin',
    color: 'white'
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },

  errorMessage: {
    textAlign: 'center',
    color: '#ce2029',
    fontSize: 16,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  successMessage: {
    textAlign: 'center',
    color: '#08a092',
    fontSize: 16,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  button: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'sans-serif-thin',
  },

  signUpLink: {
    padding: 10,
    marginTop: 20,
  },

  signUpLinkText: {
    color: '#999',
    fontFamily: 'sans-serif',
    fontSize: 16,
    textAlign: 'center',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontFamily: 'sans-serif-thin',
  },
});

export default SignUp;
