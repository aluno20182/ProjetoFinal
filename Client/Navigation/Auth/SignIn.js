import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Logo,
  ButtonText,
  Input,
  StatusBar,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';

import API from './../../Service/API';

class SignIn extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    email: '',
    password: '',
    error: '',
  };

  handleEmailChange = email => {
    this.setState({email});
  };

  handlePasswordChange = password => {
    this.setState({password});
  };

  handleCreateAccountPress = () => {
    this.props.navigation.navigate('SignUp');
  };

  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState(
        {error: 'Preencha usuário e senha para continuar!'},
        () => false,
      );
    } else {
      try {

        const response = await API.post('/sessions', {
          email: this.state.email,
          password: this.state.password,
        });
        console.log('ta')


        await AsyncStorage.setItem('@MansNotHotApp:token', response.data.token);

        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'Home',
              params: {token: response.data.token},
            }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      } catch (_err) {
        console.log(_err);
        this.setState({
          error: 'Houve um problema com o login, verifique suas credenciais!',
        });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Image
          style={styles.logo}
          source={require('./amplify.png')}
          resizeMode="contain"
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
        {this.state.error.length !== 0 && (
          <Text style={styles.errorMessage}>{this.state.error}</Text>
        )}
        <TouchableHighlight style={styles.button} onPress={this.handleSignInPress}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.signUpLink}
          onPress={this.handleCreateAccountPress}>
          <Text style={styles.signUpLinkText}>Criar conta grátis</Text>
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

export default SignIn;
