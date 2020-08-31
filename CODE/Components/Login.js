console.disableYellowBox = true;
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUpdate, loginUser} from '../Actions/LoginActions';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  handleCreateAccountPress = () => {
    this.props.navigation.navigate('SignUp');
  };

  handleNotLoggedIn = async () => {
    this.props.navigation.navigate('ReceberDados');
  };

  handleSignInPress = () => {
    this.props.loginUser(this.props.email, this.props.password);
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Hotspot</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Endereço de e-mail"
            value={this.props.email}
            onChangeText={value =>
              this.props.loginUpdate({prop: 'email', value: value})
            }
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={this.props.password}
            onChangeText={value =>
              this.props.loginUpdate({prop: 'password', value: value})
            }
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          {/*           {this.state.error.length !== 0 && (
            <Text style={styles.errorMessage}>{this.state.error}</Text>
          )} */}
        </View>
        <View style={styles.separator} />

        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSignInPress}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.handleCreateAccountPress}>
          <Text style={styles.signUpLinkText}>Criar conta grátis</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleNotLoggedIn}>
          <Text style={styles.buttonText}>Sem ligação à Internet?</Text>
        </TouchableHighlight>
      </View>
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
  errorMessage: {
    textAlign: 'center',
    color: '#ce2029',
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
  buttonD: {
    padding: 30,
    borderRadius: 5,
    backgroundColor: '#08a092',
    alignSelf: 'stretch',
    margin: 15,
    marginHorizontal: 20,
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

const mapStateToProps = state => {
  return {
    email: state.log.email,
    password: state.log.password,  };
};

export default connect(
  mapStateToProps,
  {loginUpdate, loginUser},
)(Login);
