import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Errorhold = (props) => {
  const { errorTextStyle } = styles;

  return (
      <Text style={errorTextStyle}>
        {props.errorText}
      </Text>
  );
};

const styles = {
    errorTextStyle: {
        fontSize:16,
    
        color: 'red',
      }  
};

export { Errorhold };