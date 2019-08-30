import React, {Component} from 'react';
import { 
  Platform,
  StyleSheet, 
  View,
  ImageBackground,
  Image,
  ScrollView,
  Alert
  
} from 'react-native';


import firebase from 'firebase';
import {  Spinner , } from '../components/common/index';

import Post from '../components/homecomponents/Post';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AirbnbRating } from 'react-native-elements';

import { Header ,Text ,Content ,Button ,Card,CardItem, Body, Right , Left , H3  ,Icon , Container} from 'native-base';
import SearchBar from '../components/homecomponents/SearchBar';
import  HorizontalSlider  from '../components/homecomponents/HorizontalSlider';
import RecommendedBusinessSlider from '../components/homecomponents/RecommendedBusinessSlider';

import DescriptionComponent from '../components/profilecomponents/DescriptionComponent';
import Details from '../components/profilecomponents/Details';




  
export default class BusinessProfile extends Component {

  state = {
    searchbar : false,
  }
  
 constructor(props){
   super(props);
 }
 BusinessClickHandler(){
  this.props.navigation.navigate('BusinessProfile');
}

  static navigationOptions = ({
    header: null,
   
  });

  _renderSearchBar=()=>{
    if(this.state.searchbar == true){

    return (
    <SearchBar/>
    );

    }
    else{
      return;
    }
  }
  toggleSearchBar(){
    if (this.state.searchbar ==false) 
      {
         this.setState({searchbar:true}); }
     else 
     {
       this.setState({searchbar:false})
      }
      
  } 


   render(){
      return(
        
        <Container>
          
          <Header rounded transparent>

            <Left>
            <Button transparent primary onPress={() => this.props.navigation.openDrawer()}>
              
              <Icon name='menu' />
                
              </Button>
            
              </Left>
            <Body>
                <H3>{'Connector'}</H3>
            </Body>
          
          <Right>
              <Button  transparent primary onPress={()=>{ this.toggleSearchBar()}} >
              
                  <Icon name="search" />
                
              </Button>
          </Right>

          </Header>
          {this._renderSearchBar()}

          
          
          <ScrollView styles ={styles.postContainer}>
          
          <Content>
                <ImageBackground
                style={styles.headerBackgroundImage}
                blurRadius={10}
                source={require('../assets/images/backuser.jpg')}
                >
                <View style={styles.headerColumn}>
                   
                    <Text style={styles.userNameText}>{"ITGLANCE private limited"}</Text>
                   

                    <CardItem style ={{backgroundColor:'#3f51b536',padding:0,margin:0,justifyContent:'center',}}>
                      <Left>
                        <Content >
                        <AirbnbRating
                            count={4}
                            reviews={["Bad", "Good", "Very Good", "Excellent"]}
                            defaultRating={2}
                            size={20}
                            onFinishRating={()=>{ Alert.alert(
                              'Rating Completed');} }
                        />
                       
                        </Content>
                      </Left>
                      <Body>
                        <Content>
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
                        </Content>
                      </Body>
                      <Right>
                      <Content style ={{paddingTop:20,paddingHorizontal:20,}}>
                      <Button light >
                        <Icon name='chat' type ='MaterialIcons' />
                        
                      </Button>
                        </Content>
                      </Right>
                      
                    </CardItem>
                   
                </View>
                </ImageBackground>
                </Content>
                
                <DescriptionComponent
                      for='business'
                      description='Hello this is my business profile'
                />
                <Details
                  forwhom ='business'
                  id='1'
                  phone={['985434234','34242434']}
                />
                <Card>
                 <CardItem>
                   <H3>Related Businesses:</H3>               
                 </CardItem> 
                 <RecommendedBusinessSlider
                    BusinessClickHandler={this.BusinessClickHandler.bind(this)}
                 />
        
                </Card>
                
          </ScrollView>
           
        </Container>
      );
    }

  }

  const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'space-between',

    },
    postContainer: {
      justifyContent : 'flex-start',
      justifyContent : 'center',
    },
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
      paddingHorizontal:5,
    },
    userCityText: {
      color: '#fff',
      fontSize: 15,
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









