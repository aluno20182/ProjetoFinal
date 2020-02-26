import React from 'react';
import {TouchableHighlight, Text, View, StyleSheet} from 'react-native';

const ActionButton = ({onPress, title}) => (
  <TouchableHighlight
    onPress={onPress}
    style={styles.buttonNovo}
    underlayColor="#ffbf2d">
    <View style={styles.button}>
      <Text style={styles.buttonNovoText}>{title}</Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#ffb100',
    borderRadius: 25,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'SourceSansPro-SemiBold',
  },
  buttonNovo: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#FC6663',
    alignSelf: 'stretch',
    margin: 15,
    marginHorizontal: 20,
  },
  buttonNovoText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  }

});

export default ActionButton;
