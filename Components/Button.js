import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;
  
    return (
      <TouchableOpacity onPress={onPress}>
        <Text
          style={}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  };


  const styles = {

};


export { Button };
