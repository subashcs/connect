import React, {Component} from 'react';
import { 
        Platform,
        Button,
        ImageBackground,
        StyleSheet, 
        View,
        Alert,
        Text,
      } from 'react-native';
      
import AuthNav from '../components/authentication/AuthNav';
import AuthCard from '../components/authentication/AuthCard';

import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';

export default class Entry extends Component {
  constructor(props){
    super(props)
    this.addedEvent=this.addedEvent.bind(this);
  }

    state={
      cur:'Signup'
    }


    addedEvent(){
      if( this.state.cur =='Login'){
        this.setState({cur:'Signup'});
      }
      else{
        this.setState({cur: 'Login'});
      }       
    }


   render(){
      return(
        
          <ImageBackground style={{width: '100%', height: '100%'}} source={require("../assets/images/connector.png")} >
          
          <View style ={styles.container}>
            
          <AuthCard cur={this.state.cur}/>
          <AuthNav navText={this.state.cur} addedEvent={this.addedEvent}/>
         
           </View>
          </ImageBackground>
          
         
          
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow:'scroll'
     
    },
    
  });