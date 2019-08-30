import React, {Component} from 'react';
import { 
        Platform,
        InteractionManager,
        StyleSheet, 
        View,
        Text,
        ScrollView,
        Image,
        Alert
      } from 'react-native';
      


import firebase from 'firebase';
import {  Spinner ,InsertAd, Card } from '../components/common/index';

import Post from '../components/homecomponents/Post';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Header ,Button ,CardItem, Body, Right , Left , H3 ,Icon ,Container} from 'native-base';
import SearchBar from '../components/homecomponents/SearchBar';
import  HorizontalSlider  from '../components/homecomponents/HorizontalSlider';
import RecommendedBusinessSlider from '../components/homecomponents/RecommendedBusinessSlider';


import '@firebase/firestore';


  
export default class Home extends Component {

  state = {
    searchbar : false,
    posts:[],
    firstname:'',
    loading:true,
    
    favCategories:[],
  }
  
  constructor(){
    super();
    
  }

 componentDidMount(){
   // Get post data from firebase
   this.getData(); 
 }

 BusinessClickHandler(){
  this.props.navigation.navigate('BusinessProfile');
}

UserClickHandler(){
   this.props.navigation.navigate('Profile', {
    userId: item.friend,
  })
}


getUser(userid){

  const db = firebase.firestore();
  
  let citiesRef = db.collection('users]').doc(userid);
  let query = citiesRef.get()
  
  .then(doc => {
   
      
      console.log(doc.id, '=>', doc.data());
      
      const {firstname, lastname } =doc.data();
     
               Alert.alert(firstname);
    
     
    
    
    this.setState({
        firstname:firstname,
        
      });
    
  
  })
  .catch(err => {
    console.log('Error getting documents', err);
    Alert.alert('Error on Getting user:',err.toString);
  });
 


}


fetchCategories(){
  const db =firebase.firestore();
  const userId = firebase.auth().currentUser.email;
  let userRef = db.collection('users]').doc(userId);
  let getDoc = userRef.get()
.then(doc => {
  if (!doc.exists) {
  console.log('No such document!');
  } else {
  const { favCategories} =doc.data();
  console.log('Document data:', doc.data());
  this.setState({
     favCategories:favCategories
  })
  this.assignCategoriestoState(favCategories);
  }
})
.catch(err => {
  console.log('Error getting document', err);
});
}

getData(){

  const db = firebase.firestore();  
  let citiesRef = db.collection('campaign');
  let query = citiesRef.orderBy('date','desc').limit(8).get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
    const posts=[];
    snapshot.forEach(doc => {
      
      console.log(doc.id, '=>', doc.data());
      var userid=doc.data().creator;
      var id = doc.id; 
           
          posts.push({
                  content:doc.data().content,
                  image:doc.data().image,
                  date:doc.data().date.toDate().toString(),
                  category:doc.data().category,
                  key:doc.id,
                  id:id,
                  views:doc.data().views,
                  username:doc.data().creator,
                });
    })
     
    
    
    this.setState({
        posts:posts,
        loading:false,
      });
     
  })
  .catch(err => {
    console.log('Error getting documents', err);
    Alert.alert('error');
  });
  //const campaignRef = db.collection('campaign').orderBy('date').limit(5);
  //const posts=[];
  // campaignRef.get().then(function(querySnapshot) {
      
     // querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
        
   //     posts.push({
     //     key: doc.id,
      //    doc
       // });
     // });
      
  //});
  //this.setState({
   // posts,
   // loading:false,
  //});

}

  static navigationOptions = ({
    header: null,
   
  });

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

  messageNav(receiver){
    this.props.navigation.navigate('MessageWindow', {
      userId: receiver,
    })
  }
 _renderPosts=()=>{
    if(this.state.loading){
    return (
      <Spinner size='large'/>
    );
    }

    else{
    const items= this.state.posts.map((item,key)=>{
        return(
        <Post
          date ={item.date}
          avatarURL={require('../assets/images/avatar.png')}
          username={item.username}
          text= {item.content}
          views= {item.views}
          image = {item.image}
          category={item.category}
          key={item.key}
          id={item.id}
          getData={this.getData.bind(this)}
          messageNav={this.messageNav.bind(this)}

        />
        );

     })

       
      
      return(
            <View>
                {items}
               
            </View>
      );
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
          
          <InsertAd/>
         
          <RecommendedBusinessSlider
               BusinessClickHandler={this.BusinessClickHandler.bind(this)}
               />
              

          {this._renderPosts()}

              <HorizontalSlider
               UserClickHandler={this.UserClickHandler.bind(this)}
              />

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
    
  });









