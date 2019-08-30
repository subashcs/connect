import React, {Component} from 'react';
import { 
        Platform,
        StyleSheet, 
        View,
        ImageBackground,
        Image,
        Alert,
        TouchableOpacity
        
      } from 'react-native';
      

import firebase from 'firebase';

import { Header ,Text ,Content ,Button ,CardItem, Body, Right , Left , H3  ,Icon , Container} from 'native-base';

import {  AirbnbRating,  } from 'react-native-elements';

class ImageProfile extends React.Component{
    constructor (props) {
        super(props); 
      }

      renderEditOption(){
      if(this.props.email!==firebase.auth().currentUser.email){
          return null;
      }
      else{

      return(
        <TouchableOpacity
                         onPress={this.props.navigateToEdit()} 
                         style={{position:'absolute',backgroundColor:'white',padding:10,borderRadius:30,bottom:5,left:30}}>
                      <Icon name='create' type='Ionicons' />
              </TouchableOpacity>
      )
      }
    }
    render(){
        return(
            <Content style={{backgroundColor:'#000'}}>
                <ImageBackground
                style={styles.headerBackgroundImage}
                blurRadius={3}
                source={{uri:this.props.cover}}
                >
                <View style={styles.headerColumn}>
                  <View style={{position:'relative'}}>
                    <Image
                    style={styles.userImage}
                    source={{uri : this.props.profile}}
                    />
                     {this.renderEditOption()}
                   </View> 
                    <Text style={styles.userNameText}>{this.props.firstname+' '+this.props.lastname}</Text>
                   

                    <CardItem style ={{backgroundColor:'#3f51b536',padding:0,margin:0,justifyContent:'center',}}>
                      <Left>
                        <AirbnbRating
                            count={4}
                            reviews={["Bad", "Good", "Very Good", "Excellent"]}
                            defaultRating={2}
                            size={15}
                            style={{fontSize:13}}
                            onFinishRating={()=>{Alert.alert(
                              'Rating Completed');}}
                        />
                       
                      </Left>
                      <Body>
                        <View style={styles.userAddressRow}>
                          <View>
                              <Icon
                              name='pin'
                              type='Ionicons'
                              active = {true}
                              style={styles.placeIcon}
                              />
                          </View>
                          <View style={styles.userCityRow}>
                              <Text style={styles.userCityText}>
                              {"Kathmandu"}, {"Nepal"}
                              </Text>
                          </View>
                        </View>
                      </Body>
                      <Right>
                      <Content style ={{padding:10,}}>
                      <Button light>
                        <Icon name='chat' type ='MaterialIcons' />
                      </Button>
                        </Content>
                      </Right>
                      
                    </CardItem>
                    
                </View>
                </ImageBackground>
                
                
                </Content>
         
        );
    }
}
const styles = StyleSheet.create({
 
   
    headerBackgroundImage: {
      paddingBottom: 0,
      paddingTop: 35,
    },
    headerContainer: {},
    headerColumn: {
      backgroundColor: 'transparent',
      ...Platform.select({
        ios: {
          alignItems: 'center',
          elevation: 1,
          marginTop: -1,
        },
        android: {
          alignItems: 'center',
        },
      }),
    },
    placeIcon: {
      color: '#fff',
      fontSize: 20,
      padding: 5,

    },
    telContainer: {
      backgroundColor: '#FFF',
      flex: 1,
      paddingTop: 30,
    },
    userAddressRow: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingTop:20,
    },
    userCityRow: {
      backgroundColor:'transparent',
    },
    userCityText: {
      color: '#fff',
      fontSize: 13,
      fontWeight: '600',
      textAlign: 'center',
    },
    userImage: {
      borderColor: '#fff',
      borderRadius: 85,
      borderWidth: 3,
      height: 170,
      marginBottom: 15,
      width: 170,
    },
    userNameText: {
      color: '#FFF',
      fontSize: 22,
      fontWeight: 'bold',
      paddingBottom: 8,
      textAlign: 'center',
    },
    
  });
export default ImageProfile;