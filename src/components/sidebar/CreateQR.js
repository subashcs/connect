import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View,ScrollView, TextInput, } from 'react-native';
// import all basic components
import QRCode from 'react-native-qrcode';

import {Header ,Card ,Container ,Text ,Content,Button ,Left ,Right ,Body, Icon ,H3, CardItem} from 'native-base';

import vCard from 'react-native-vcards';


 
export default class CreateQR extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      // Default Value of the TextInput
      valueForQRCode: '',
      // Default value for the QR Code
    };
  }
  static navigationOptions = {
    header:null,
   };
   
  getTextInputValue = () => {
    // Function to get the value from input
    // and Setting the value to the QRCode
    this.setState({ valueForQRCode: this.state.inputValue });
  };
  render() {
    //create a new vCard
      contact = vCard();

      //set properties
      contact.firstName = 'Subash';
      contact.lastName = 'Sapkota';
      contact.organization = 'ACHS';
      contact.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');
      contact.workPhone = '9860427421';
      contact.birthday = new Date('01-01-1985');
      contact.title = 'Software Developer';
      contact.url = 'https://github.com/enesser';
      contact.note = 'Notes on Eric';

      //save to file
      //contact.saveToFile('./eric-nesser.vcf');

      

    return (
      
      <Container>
            <Header rounded transparent>

              <Left>
              <Button transparent primary onPress={()=>this.props.navigation.goBack()}>
                
                <Icon name='arrow-back' type='Ionicons' />
                  
                </Button>

                </Left>
              <Body>
                <H3>{'Create QR '}</H3>
              </Body>

              <Right>
                <Button  transparent primary >
                
                    <Icon name="search" />
                  
                </Button>
              </Right>

              </Header>

            <Card>
              <CardItem>
                <H3>{'Scan the following QR code to share your info'}</H3>
              </CardItem>
              <ScrollView>
              <CardItem style={{flexDirection:'column'}}>
              <View style={styles.MainContainer}>
                <QRCode
                  value={contact.getFormattedString()}
                  //Setting the value of QRCode
                  size={300}
                  //Size of QRCode
                  bgColor="#000"
                  //Backgroun Color of QRCode
                  fgColor="#fff"
                  //Front Color of QRCode
                />
                
                <Button
                  onPress={this.getTextInputValue}
                  activeOpacity={0.7}
                  style={styles.button}>
                  <Text style={styles.TextStyle}> Generate QR Code </Text>
                </Button>
              </View>
               </CardItem>
              </ScrollView> 
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
    },
    TextInputStyle:{
      borderWidth:1,
      color:'#fff',
      marginTop:30,
      padding:10,
      alignSelf:'center',
    },
    button:
    {
    padding:10,
    margin:10,
    alignSelf:'center',
    }
  });