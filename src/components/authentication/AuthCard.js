import React, {Component} from 'react';
import { 
        Platform,
        Button,
        StyleSheet, 
        Text, 
        TextInput, 
        View,
        ScrollView,
        Alert,
      } from 'react-native';
import Login from './Login';
import Signup from './Signup';



    const AuthCard = (props) => {
       
         if(props.cur=='Login'){   
                return(
                    <ScrollView style={{paddingTop:40,paddingBottom:20}}>
                    <Signup/>
                    </ScrollView>
                );
             }    
            else{
                return(
                    <View>
                    <Login/>
                    </View>
                );
            }
       
      };

 
  const styles = StyleSheet.create({
    container: {
    
    },
    
  });

  export default AuthCard;