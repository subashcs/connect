import React, {Component} from 'react';
import { 
        Platform,
        StyleSheet, 
        View,
        Text,
        TouchableHighlight,
      } from 'react-native';
      

import firebase from 'firebase';
import {Spinner ,Input} from '../common';

import {Header ,Card,Content, Container ,CardItem , Button ,Left ,Right ,Body, Icon ,H3} from 'native-base';


export default class PasswordAndPrivacy extends Component {
  
  static navigationOptions = {
   header:null,
  };
  state = {
    password:'',
    email: '',
  }
   
   render(){
      return(
        <Container>
             <Header rounded transparent>

                <Left>
                <Button transparent primary onPress={()=>this.props.navigation.goBack()}>
                  
                  <Icon name='arrow-back' type='Ionicons' />
                    
                  </Button>

                  </Left>
                <Body>
                  <H3>{'Change Password'}</H3>
                </Body>

                <Right>
                  <Button  transparent primary >
                  
                      <Icon name="search" />
                    
                  </Button>
                </Right>

                </Header>

             <Card>
                <CardItem>
                </CardItem>
                <CardItem>
                <Input
                  label ="Old Password"
                  value = {this.state.password}
                  placeholder = "pass"
                  onChangeText = {(email) => this.setState({email})}
                />
              </CardItem>
              <CardItem>
                <Input
                  secureTextEntry
                  label = "New Password"
                  value = {this.state.password}
                  placeholder = "Password"
                  onChangeText = {(password) => this.setState({password})}
                />
              </CardItem>
              <CardItem>
                <Input
                  secureTextEntry
                  label = "Retype New Password"
                  value = {this.state.password}
                  placeholder = "Password"
                  onChangeText = {(password) => this.setState({password})}
                />
              </CardItem>
              <CardItem>
                <Content>
                  <Button  full primary style={{padding:10,}}>
                    <Text style={{color:'#fff'}}>Change</Text>  
                  </Button>  
                </Content>
              </CardItem>
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









