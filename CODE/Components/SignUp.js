import React, {Component, useState} from 'react';

//import SignUpUser from './../Actions/SignUpActions'

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


export default function SignUp({navigation}) {
  const navigationOptions = {
    header: null,
  };


  const [username, setUsername] = useState('btest');
  const [email, setEmail] = useState('b@bb.com')
  const [password, setPassword] = useState('teste123')
  const [firstname, setFirstName]= useState('B')
  const [lastname, setLastName] = useState('BB')
  const [points, setPoints] = useState('')

  handleBackToLoginPress = () => {
    this.props.navigation.goBack();
  };

  async function register(){
    const registerForm = {name: username,
      email: email,
      password: password};
      console.log(registerForm);
      let data = JSON.stringify(registerForm);
    await fetch(`https://strate-backend.herokuapp.com/register`, {
      method: "POST",
      headers: {'Content-Type':'application/json'
      },
      body: data
    }).then((response) => {        
      if(response.status==200){
          changeLogin();
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  
  function changeLogin(){
    navigation.navigate('Login');
  }
/* 
  handleSignUpPress = async () => {
    this.props.SignUpUser(this.props.email, this.props.username, this.props.password, this.props.firstname, this.props.lastname)
  }; */

  goToLogin = () => {
    /*     const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'SignIn'})],
        });
        this.props.navigation.dispatch(resetAction); */
    navigation.navigate('SignIn');
  };

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
            onChangeText = {(text) => setUsername(text)}
            value={username}
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
            onChangeText = {(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="white"
            value={firstname}
            onChangeText = {(text) => setFirstName(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Second Name"
            placeholderTextColor="white"
            value={lastname}
            onChangeText = {(text) => setLastName(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="white"
            value={password}
            onChangeText = {(text) => setPassword(text)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </View>

         <TouchableHighlight
          style={styles.loginBtn}
          onPress={() => signUp()}
          underlayColor="#99d9f4">
          <Text style={styles.loginText}>Criar Conta</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={changeLogin}>
          <Text style={styles.signUpLinkText}>Voltar ao login</Text>
        </TouchableHighlight> 
      </View> 
    );
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
    color: 'white',
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


