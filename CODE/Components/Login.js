import React, { Component, useState, useContext } from 'react';
import { AsyncStorage } from 'react-native';
import { LoginApi } from '../../index.js';
import { SET_USER } from '../Actions/types';
import url from '../../Url';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { useDispatch } from 'react-redux';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const api = useContext(LoginApi);
  const dispatch = useDispatch();

  const navigationOptions = {
    header: null,
  };

  //Passa para o ecra de Registo
  function changeRegister() {
    navigation.navigate('SignUp');
  }

  //Passa para o ecra de Receber Dados
  function handleNotLoggedIn() {
    navigation.navigate('ReceberDados');
  }

  async function login() {
    //Values que vem do textinput
    let login = { email: email, password: password };
    let data = JSON.stringify(login);
    console.log('data', data)

    //Comunicação com o back end
    await fetch(url + '/loginaccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,

    })
      .then((res) => res.json())
      .then((res) => {
        console.log('response', res);
        //guardar username e token no AsyncStorage
        AsyncStorage.setItem('token', res.token);
        //passar para a app
        dispatch({
          type: SET_USER,
          payload: res,
        });
        //executa o login e passa para o ecra Home
        api.onLoginPress();
      })
      .catch((error) => {
        console.error(error);
      });
  }


  //Login feito sem autenticação, razões de teste
  function loginSemAuth() {
    api.onLoginPress();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Hotspot</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Endereço de e-mail"
          value={email}
          onChangeText={(value) => setEmail(value)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={(value) => setPassword(value)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
      </View>
      <View style={styles.separator} />

      <TouchableHighlight style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={changeRegister}>
        <Text style={styles.signUpLinkText}>Criar conta grátis</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button} onPress={handleNotLoggedIn}>
        <Text style={styles.buttonText}>Sem ligação à Internet?</Text>
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
  logo: {
    fontFamily: 'sans-serif-thin',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  input: {
    height: 50,
    color: 'white',
    fontFamily: 'sans-serif-thin',
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
    fontFamily: 'sans-serif-light',
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
});
