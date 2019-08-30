import React from 'react';
import { View , Text, TextInput } from 'react-native';

const Input = ({ label, value,color, onChangeText ,placeholder ,secureTextEntry}) => {
  
    const { inputStyle, labelStyle1 ,labelStyle2,containerStyle  } = styles;
    
    const labelColor = color?labelStyle1:labelStyle2;
  return (
     <View style ={containerStyle}>
      <Text style= {labelColor}>
           {label}
      </Text>
      <TextInput
        secureTextEntry ={secureTextEntry}
        autoCorrect = {false}
        style = {inputStyle}
        value ={value}
        placeholder ={placeholder}
        onChangeText = {onChangeText}        
      />

    </View>      
  );
};
const styles = {
    
    inputStyle: {
        color : "#000",
        paddingRight : 5,
        paddingLeft : 5,
        fontSize : 16,
        lineHeight :25,
        flex : 2,
        backgroundColor:'#fff',
        marginBottom:5,
      },
      labelStyle1: {
        fontSize : 17,
        color : '#fff',
        paddingLeft: 20,
        fontWeight:'bold',
        flex :1,
      },
      labelStyle2: {
        fontSize : 16,
        color : '#000',
        paddingLeft: 20,
        flex :1,
      },
      containerStyle : {
        
        backgroundColor:'transparent',
        height :50,
        flex :1,
        justifyContent:'space-between',
        flexDirection : 'row',
        alignItems : 'center',
      },

};

export  { Input};