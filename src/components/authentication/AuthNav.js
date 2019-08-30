// Import libraries for making a component
import React from 'react';
import { Text, View,Image } from 'react-native';
import { black } from 'ansi-colors';
import {CardItem,H3,Icon} from 'native-base';

// Make a component
const AuthNav = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}
            onPress={props.addedEvent}
      >
      {props.navText}
      </Text>
      <CardItem>
        <Image
          style={{width: 40, height: 35,}}
          source={require('../../assets/images/icon.png')}
        />
        <H3 style={{color:'darkblue',paddingHorizontal:10}} >
          Connector: Connect and Serve
        </H3>
      </CardItem>
    </View>
  );
};

const styles = {
  viewStyle: {
    alignItems:'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    marginBottom:8,
    backgroundColor:'#673ab7',
    borderWidth:1,
    borderColor:'#673ab7'
  },
  textStyle: {
    borderWidth:1,
    borderColor:'#673ab7',
    fontSize: 22,
    paddingHorizontal:15,
    paddingTop:5,
    paddingBottom:5,
    marginTop:-20,
    color:'#fff',
    backgroundColor:'#673ab7',
    marginBottom:5,
    borderRadius:20,
  }
};

// Make the component available to other parts of the app
export default AuthNav;