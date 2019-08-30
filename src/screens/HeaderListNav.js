import React, { Component } from 'react';
import { Container, Header,Button, Content,TouchableOpacity , List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';

import firebase from 'firebase';

export default class HeaderListNav extends Component {
    constructor(props){
      super(props)
    }


  render() {
    return (
      <Container>
        
         <Header transparent>
           <Content padder >
           <Button  full light iconLeft onPress={() => this.props.navigation.closeDrawer()}>
             
             <Icon name='arrow-back' />
            <Text>Back</Text>
           </Button>
           </Content>
          </Header>
        <Content padder >
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }} onPress={()=>this.props.navigation.navigate('EditCategories')}>
                <Icon active name="apps" type="Ionicons" />
              </Button>
            </Left>
            <Body>
              <Text>Edit Categories</Text>
            </Body>
            <Right>
             {// <Switch value={false} />
                }
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button onPress={() => this.props.navigation.navigate('PasswordAndPrivacy')} style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="lock" type="Ionicons" />
              </Button>
            </Left>
            <Body>
              <Text>Password {'&'} Privacy</Text>
            </Body>
            <Right>
              <Text></Text>
              <Icon active name="arrow-forward"/>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button onPress={() => this.props.navigation.navigate('MessageWindow')} style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="document" type="Ionicons"/>
              </Button>
            </Left>
            <Body>
              <Text>Terms and Condition</Text>
            </Body>
            <Right>
              <Text></Text>
              <Icon active name="arrow-forward"/>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button onPress={() => this.props.navigation.navigate('QRscanner')} style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="qr-scanner" type="Ionicons" />
              </Button>
            </Left>
            <Body>
              <Text>Scan QR</Text>
            </Body>
            <Right>
              <Text></Text>
              <Icon active name="qr-scanner" type="Ionicons"/>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button onPress={() => this.props.navigation.navigate('ViewBusiness')} style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="eye" type="Ionicons" />
              </Button>
            </Left>
            <Body>
              <Text>View Business</Text>
            </Body>
            <Right>
              <Text></Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button onPress={() => this.props.navigation.navigate('AddBusiness')} style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="create" type="MaterialIcons" />
              </Button>
            </Left>
            <Body>
              <Text>Add Business</Text>
            </Body>
            <Right>
              <Text></Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button onPress={() => this.props.navigation.navigate('AddSkills')} style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="add-circle" type="Ionicons" />
              </Button>
            </Left>
            <Body>
              <Text>Add Skills</Text>
            </Body>
            <Right>
              <Text></Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button onPress={() => this.props.navigation.navigate('CreateQR')} style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="qr-scanner" type="Ionicons" />
              </Button>
            </Left>
            <Body>
              <Text>Create QR</Text>
            </Body>
            <Right>
              <Text></Text>
              <Icon active name="create" type='Ionicons' />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
            <Button style={{ backgroundColor: "#007AFF" }} onPress ={()=> firebase.auth().signOut()}>
               <Icon active name="log-out" />
            </Button>
            </Left>
            <Body>
              <Text>Log Out</Text>
            </Body>
            <Right>
              <Text>active</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}