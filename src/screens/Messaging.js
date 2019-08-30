import React, {Component} from 'react';
import { 
        Platform,
        StyleSheet, 
        ScrollView,
        View,
        Text,
        Modal,
        TouchableHighlight
      } from 'react-native';
      

import firebase from 'firebase';
import { Spinner } from '../components/common';
import MessageList from '../components/messagingcomponents/MessageList';

import { Header , Container ,Button ,Left ,Alert ,Right ,Body, Icon ,H3 } from 'native-base';

export default class Messaging extends Component {
  
  constructor(props){
    super(props);
   
  }
  static navigationOptions = {
    header:null,
  };
  state = {

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
                
          <ScrollView styles ={styles.postContainer}>  


              <MessageList 
                friend = {"Ram Sapkota"}
                content = {" Hello sir, can you help me getting my house reconstructed any suggestions"}
                time ={" 3:43 "}
                onPress={()=>this.props.navigation.navigate('MessageWindow')} 
              />
                
               <MessageList 
                friend = {"Yasu apel"}
                content = {" Hello sir, can you help me getting my house reconstructed any suggestions"}
                time ={" 4:43 "}
              />


              <MessageList 
                friend = {"Basu apel"}
                content = {" Hello sir, can you help me getting my house reconstructed any suggestions"}
                time ={" 4:43 "}
              />

              <MessageList 
                friend = {"Yasu apel"}
                content = {" Hello sir, can you help me getting my house reconstructed any suggestions"}
                time ={" 4:43 "}
              />
           </ScrollView>   
        </Container>
      );
    }

  }

  const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'flex-start',
    
    },
    postContainer: {
      justifyContent : 'flex-start',
      justifyContent : 'center',
    },

    
  });









