import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';

import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

const {width} = Dimensions.get('window');

class Auth extends React.Component {
  state = {
    showSignUp: false,
    formType: 'showSignIn',
  };



  toggleAuthType = formType => {
    this.setState({formType});
  };
  render() {
    const showSignIn = this.state.formType === 'showSignIn';
    const showSignUp = this.state.formType === 'showSignUp';
    const showForgotPassword = this.state.formType === 'showForgotPassword';
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('./amplify.png')}
        />
        <Text style={styles.title}>MansNotHot</Text>
        <Text style={styles.subtitle}>Hotspot Managment</Text>
        {showSignIn && (
          <SignIn
            navigation={this.props.navigation}
            toggleAuthType={this.toggleAuthType}
          />
        )}
        {showSignUp && <SignUp toggleAuthType={this.toggleAuthType} />}
        {showForgotPassword && (
          <ForgotPassword toggleAuthType={this.toggleAuthType} />
        )}
        <View style={{position: 'absolute', bottom: 40}}>
          {showSignUp || showForgotPassword ? (
            <Text style={styles.bottomMessage}>
              Already signed up?
              <Text
                style={styles.bottomMessageHighlight}
                onPress={() => this.toggleAuthType('showSignIn')}>
                &nbsp;&nbsp;Sign In
              </Text>
            </Text>
          ) : (
            <Text style={styles.bottomMessage}>
              Need an account?
              <Text
                onPress={() => this.toggleAuthType('showSignUp')}
                style={styles.bottomMessageHighlight}>
                &nbsp;&nbsp;Sign Up
              </Text>
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background:{

  },
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d2d2d'
  },
  logo: {
    height: width / 2.5,
  },
  title: {
    fontSize: 26,
    marginTop: 15,
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#e19f51',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#ababab',
    fontFamily: 'SourceSansPro-Regular',
  },
  bottomMessage: {
    fontFamily: 'SourceSansPro-Regular',
    color: '#ababab',
    fontSize: 18,
  },
  bottomMessageHighlight: {
    color: '#f4a63b',
    paddingLeft: 10,
  },
});

export default Auth;
