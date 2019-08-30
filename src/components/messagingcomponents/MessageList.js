import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
export default class MessageList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <Content >
          <List>
            <ListItem avatar onPress = {this.props.onPress}>
              <Left>
                <Thumbnail source={require('../../assets/images/avatar.png')} />
              </Left>
              <Body>
                <Text>{this.props.friend}</Text>
                <Text note>{this.props.content}</Text>
              </Body>
              <Right>
                <Text note>{this.props.time}</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
    );
  }
}