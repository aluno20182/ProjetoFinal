import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangedText, placeholder, secureTextEntry }) => {
    const {  } = styles;

    return (
        <View style={}>
          <Text style={}>{ label }</Text>
          <TextInput
            style={}
            value={value}
            onChangeText={onChangedText}
            autoCorrect={false}
            placeholder={placeholder}
            autoCapitalize={'none'}
            secureTextEntry={secureTextEntry}
          />
        </View>
      );
};

const styles = {

  };

export { Input };
