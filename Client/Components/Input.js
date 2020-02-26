import React from 'react'
import { Dimensions, StyleSheet, TextInput } from 'react-native'

const { width } = Dimensions.get('window')

const Input = ({
  placeholder, type, secureTextEntry = false, onChangeText
}) => (
  <TextInput
    style={styles.Input}
    placeholder={placeholder}
    autoCapitalize='none'
    autoCorrect={false}
    onChangeText={v => onChangeText(type, v)}
    secureTextEntry={secureTextEntry}
    placeholderTextColor='#e2a45b'
    selectionColor={'#e2a45b'}
  />
)

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fcf3db',
    borderRadius: 30,
    height: 45,
    width: width - 20,
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 14,
    fontFamily: 'SourceSansPro-Regular',
    color: '#e2a45b'
  },
  Input:{
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    marginBottom: 15,
    marginHorizontal: 20,
    fontSize: 16,
  }
})

export default Input