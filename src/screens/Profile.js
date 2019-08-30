import React, {Component} from 'react';
import { 
        Platform,
        StyleSheet, 
        ScrollView,
        
        Alert,
        Text
      } from 'react-native';
      

import firebase from 'firebase';
import {  Spinner, } from '../components/common/index';
import SearchBar from '../components/homecomponents/SearchBar';

import Post from '../components/homecomponents/Post';

import { Header ,Button ,Content,CardItem, Body,Card, Right , Left , H3  ,Icon , Container} from 'native-base';

import { ButtonGroup, AirbnbRating, Rating, } from 'react-native-elements';
//import profile components
import ImageProfile from '../components/profilecomponents/ImageProfile';
import DescriptionComponent from '../components/profilecomponents/DescriptionComponent';
import Details from '../components/profilecomponents/Details';
import RecommendedBusinessSlider from '../components/homecomponents/RecommendedBusinessSlider';

export default class Profile extends Component {
  state = {
    searchbar : false,
    selectedIndex: 2,
    firstname:'',
    lastname:'',
    profile:'https://static.thenounproject.com/png/17241-200.png',
    cover:'https://www.incimages.com/uploaded_files/image/970x450/getty_509107562_2000133320009280346_351827.jpg',
    latitude:'',
    longitude:'',
    occupation:'',
    description:'',
    skills:[],
    phone:[],
    posts:[],
    address:null,
    fid:'',
    userId:firebase.auth().currentUser.email


  
  }

  static navigationOptions = {
        header: null
  };
  
  constructor (props) {
    super(props);
    
    this.updateIndex = this.updateIndex.bind(this)
  }

  BusinessClickHandler(){
    this.props.navigation.navigate('BusinessProfile');
  }


  getUser(userId){
    const db =firebase.firestore();
    let userRef = db.collection('users]').doc(userId);
    let getDoc = userRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      const {firstname, lastname ,description,occupation ,address, latitude ,phone, longitude ,profile ,cover ,skills} =doc.data();
      console.log('Document data:', doc.data());
      this.setState({
        firstname:firstname,
        lastname:lastname,
        profile:profile,
        cover:cover,
        latitude:latitude,
        longitude:longitude,
        description:description,
        skills:skills,
        address:address,
        phone:phone,
        occupation:occupation
        
      })
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

  }

  getCampaigns(){
    const db =firebase.firestore();
      let campaignRef = db.collection('campaign');
      const fid='';
      let query = campaignRef.where('creator', '==', 'test@test.com').get()
        .then(snapshot => {
          if (snapshot.empty) {
            Alert.alert('No matching documents.');
            return;
          }  
          
          snapshot.forEach(doc => {
            fid=doc.content;
            console.log(doc.id, '=>', doc.data());
          });
          this.setState({
            fid:fid,
          })
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

    
  }

  componentDidMount(){
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
     
     const userId = this.props.navigation.getParam('userId', firebase.auth().currentUser.email);
      //fetch the user if id passed or the current user 
      this.setState({
        userId:userId
      })
      this.getUser(this.state.userId);
      this.props.navigation.setParams({'userId':firebase.auth().currentUser.email})   
    });
    };
  
  componentDidUpdate(){
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
     
    let userId = this.props.navigation.getParam('userId', firebase.auth().currentUser.email);
      //fetch the user if id passed or the current user 
      this.setState({
        userId:userId
      })
      this.getUser(userId);
      this.props.navigation.setParams({'userId':firebase.auth().currentUser.email})
    });
 
  }
 


  //what will search do ans: follwing

  _renderSearchBar=()=>{
    if(this.state.searchbar == true){

    return (
    <SearchBar
    searchAction={this.searchAction.bind(this)}
    />
    );

    }
    else{
      return;
    }
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }


  toggleSearchBar(){
    if (this.state.searchbar ==false) 
      {
         this.setState({searchbar:true}); 
        }
     else 
     {
       this.setState({searchbar:false})
      }
      
  }

  searchAction(data){
    this.props.navigation.navigate('Searches',{searchkey:data});
  }

 
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  };

  navigateToEdit(){
    this.props.navigation.navigate('EditProfile', {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      description:this.state.description,
      occupation:this.state.occupation,
      cover:this.state.cover,
      profile:this.state.profile,
      latitude:this.state.latitude,
      longitude:this.state.longitude,
      skills:this.state.skills,
      address:this.state.address,
      phone:this.state.phone,

    })
};

  
  _renderMainProfileContents = () => {
      switch(this.state.selectedIndex){
        case 0:
          return(
            <Post
            date ={'April 27, 2017'}
            avatarURL={require('../assets/images/avatar.png')}
            username={"Ram Sapkota"}
            text= {"Need some machine to plant your favourite tree !! "}
            stars= {"100"}
            imageURL = {require('../assets/images/filter.jpg')}
          />
          );
        case 1:
          return(
            <Post
            date ={'April 27, 2017'}
            avatarURL={require('../assets/images/avatar.png')}
            username={"Ram Sapkota"}
            text= {"Need some machine to plant your favourite tree !! "}
            stars= {"100"}
            imageURL = {require('../assets/images/filter.jpg')}
          />
          );
        case 2:
          return (
            <RecommendedBusinessSlider 
            BusinessClickHandler={this.BusinessClickHandler.bind(this)}
            />
          );
        default:
          return(
            <Text style = {{color:'red'}}>Error while rendering selected component</Text>
          );  

      }
  };
  
   render(){

    const buttons = ['Saved Ads', 'My Ads', 'Business']
    const { selectedIndex } = this.state
    const userId = this.props.navigation.getParam('userId', 'NO-ID');
                   
  
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
              
                  <Icon name="ios-search" />
                
              </Button>
          </Right>

          </Header>
          
          {this._renderSearchBar()}

          
          <ScrollView styles ={styles.postContainer}>  
          
          <ImageProfile
            navigateToEdit={()=>this.navigateToEdit.bind(this)}
            firstname={this.state.firstname}
            lastname={this.state.lastname}
            profile={this.state.profile}
            cover={this.state.cover}
            email={this.state.userId}
          />
         
          <DescriptionComponent 
                for='user'
                description={this.state.description}
                email={this.state.userId}
                firstname={this.state.firstname}
                lastname={this.state.lastname}
                profile={this.state.profile}
                occupation={this.state.occupation}

          />
          


          <Details 
              forwhom='user'
              address={this.state.address}
              skills={this.state.skills}
              occupation={this.state.occupation}
              phone={this.state.phone}
            />
          
          <Content>
            
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{height: 80}}
            />
            
            
          </Content>
          {
            //the following container will contain
            //either the saved ads ,or the campaigns or businesses
          }
          <Content>

          {this._renderMainProfileContents()}


          </Content>
          

          </ScrollView>

      </Container>
      
      );
    }

  }

  const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'space-between',
    
    },
    cardContainer: {
      backgroundColor: '#FFF',
      borderWidth: 0,
      flex: 1,
      margin: 0,
      padding: 0,
    },
    postContainer: {
      justifyContent : 'flex-start',
      justifyContent : 'center',
    },
    
  });









