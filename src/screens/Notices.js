import React, {Component} from 'react';
import { 
        Platform,
        StyleSheet, 
        View,
        Text,
        TouchableHighlight,
      } from 'react-native';
      

import firebase from 'firebase';
import {Spinner } from '../components/common';

import {Card} from '../components/common';
import {Header , Container ,Button ,Left ,Right ,Body, Icon ,H3} from 'native-base';


export default class Notices extends Component {
  
  static navigationOptions = {
   header:null,
  };
   
   render(){
      return(
        <Container>
             <Header rounded transparent>

                <Left>
                <Button transparent primary >
                  
                  <Icon name='menu' />
                    
                  </Button>

                  </Left>
                <Body>
                    <H3>{'Connector'}</H3>
                </Body>

                <Right>
                  <Button  transparent primary >
                  
                      <Icon name="search" />
                    
                  </Button>
                </Right>

                </Header>

            <Card>
              <TouchableHighlight>
                <Text style= {styles.textStyle}>
                  This is a notice
                </Text>
              </TouchableHighlight>  
            </Card>
          </Container>  
      );
    }

  }

  const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'space-between',
    
    },
    textStyle :{
      color :'blue',
      fontSize: 16,
      backgroundColor:'#fefefe',
      padding:5,
    }
    
  });









