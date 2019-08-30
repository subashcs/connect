import React, { Component } from 'react';
import {Alert} from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';

export default class SearchBar extends Component {
  constructor (props){
    super(props);
    
  }
  
  state = {
    searchkey:'',
  }

  render() {
    return (
      
      <Header searchBar rounded style ={{backgroundColor :'#fff'}}>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search...."
                 onChangeText={(text) => this.setState({searchkey:text})}/>
          <Icon name="arrow-round-forward" type="Ionicons" onPress={()=>this.props.searchAction(this.state.searchkey)}/>
        </Item>
      </Header>
         
    );
  }
}