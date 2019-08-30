/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { 
        Platform,
        InteractionManager,
        StyleSheet, 
         
        TextInput, 
        View,
        Alert,
      } from 'react-native';
import { Header} from './src/components/common/Header';
import Entry from './src/screens/Entry';
import firebase from 'firebase';


//importing for the navigation
import AppNavigator from './src/navigation/AppNavigator';



//code to handle firebase timer issue starts
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
// Work around issue `Setting a timer for long time`
// see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startsWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}

//code to handle firebase timer issue ends





export default class App extends Component {
  //why are not we insertin userid in state
  state={
    loggedIn: null,
  }
 //  
 componentDidMount(){
  if (!firebase.apps.length) {

  firebase.initializeApp({
    apiKey: "AIzaSyCJMslonsm1NrPQaXcL4XAeXMbkiRjMC7A",
    authDomain: "connector-51010.firebaseapp.com",
    databaseURL: "https://connector-51010.firebaseio.com",
    projectId: "connector-51010",
    storageBucket: "connector-51010.appspot.com",
    messagingSenderId: "945888367594",
    appId: "1:945888367594:web:852b3900e040f932"
  });
  }
  firebase.auth().onAuthStateChanged((user) => {
    if( user ){
      this.setState({loggedIn : true});
    }
    else{
      this.setState({loggedIn : false});
    }
  });
}
  render() {
    
    switch(this.state.loggedIn){
      //i have changed here
      case true:
          return(
              <AppNavigator/>
              
          );
      case false:
          return (
            <View style={styles.container}>
              <Entry />
            </View>
          );
      default:
            return (
            <View style = {styles.container}>
              {/* <Spinner size = "large" /> */}
            </View>
            );
    }
   
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'space-between',
  },
});
