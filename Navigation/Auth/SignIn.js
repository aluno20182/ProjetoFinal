import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet, Button} from 'react-native';

import {Auth} from 'aws-amplify';

import {Input, ActionButton} from '../../Components';

class SignIn extends Component {
  state = {
    username: '',
    password: '',
  };
  onChangeText = (key, value) => {
    this.setState({[key]: value});
  };
  signIn = async () => {
    const {username, password} = this.state;
    try {
      await Auth.signIn(username, password);
      console.log('successfully signed in');
      this.props.navigation.navigate('Cliente');
    } catch (err) {
      console.log('error signing up...', err);
    }
  };
  showForgotPassword = () => {
    this.props.toggleAuthType('showForgotPassword');
  };
  render() {
    return (
      <View>
        {/*         <Button
          title="Sign in with Google"
          onPress={() => Auth.federatedSignIn({provider: 'Google'})}
        />
        <Button
          title="Sign in with Facebook"
          onPress={() => Auth.federatedSignIn({provider: 'Facebook'})}
        />
        <Button
          title="Sign in with Apple"
          onPress={() => Auth.federatedSignIn({provider: 'SignInWithApple'})}
        />
        <Button
          title="Launch Hosted UI"
          onPress={() => Auth.federatedSignIn()}
        /> */}
        <Input
          onChangeText={this.onChangeText}
          type="username"
          placeholder="Username"
          autoCorrect={false}
        />
        <Input
          onChangeText={this.onChangeText}
          type="password"
          placeholder="Password"
          secureTextEntry
          autoCorrect={false}
        />
        <ActionButton title="Sign In" onPress={this.signIn} />
        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={this.showForgotPassword}>
            <Text style={styles.bottomMessageHighlight}>
              &nbsp;&nbsp;Forget your password?
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bottomMessageHighlight: {
    color: '#f4a63b',
    paddingLeft: 10,
  },
});

export default SignIn;
