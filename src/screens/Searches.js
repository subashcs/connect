import React, {Component} from 'react';
import { 
        Platform,
        StyleSheet, 
        View,
        
        ScrollView,
        Image,
        Alert,
        FlatList
      } from 'react-native';
      


import firebase from 'firebase';
import {  Spinner ,InsertAd } from '../components/common/index';

import Post from '../components/homecomponents/Post';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Header ,Text,Button ,ListItem,Thumbnail, Body, Right ,Card, Content,CardItem, Left , H3 ,Icon ,Container} from 'native-base';
import SearchBar from '../components/homecomponents/SearchBar';
import  HorizontalSlider  from '../components/homecomponents/HorizontalSlider';
import RecommendedBusinessSlider from '../components/homecomponents/RecommendedBusinessSlider';


import { ButtonGroup } from 'react-native-elements';


  
export default class Searches extends Component {

  state = {
    searchbar : false,
    selectedIndex: 2,
    ads:[],
    peoples:[],
    businesses:[],
    searchkey:'',
    loading:null
  
  }
  
 constructor(props){
   super();
   
   this.updateIndex = this.updateIndex.bind(this)
 }

 onClickHandler(){
  this.props.navigation.navigate('BusinessProfile');
}
  static navigationOptions = ({
    header: null,
   
  });

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
  componentDidMount(){
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      const searchkey = this.props.navigation.getParam('searchkey','');
      this.setState({
        searchkey:searchkey
      })
      this.getSearchResult(searchkey);
    });
 

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
    this.setState({searchkey:data})
    this.getSearchResult(this.state.searchkey);
    
  }


  getSearchResult(searchkey){
    const db = firebase.firestore();
    this.getBusiness(db);
    this.getPeoples(db,searchkey);
    //this.getAds(db);
  }

  getBusiness(db){
    
  }
  getAds(db){
  
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
            
             
            posts.push({
                    content:doc.data().content,
                    image:doc.data().image,
                    date:doc.data().date.toDate().toString(),
                    category:doc.data().category,
                    key:doc.id,
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
  
  }

  getPeoples(db,searchkey){
     
  let networkRef = db.collection('users]').where('firstname','==',searchkey);
  let query = networkRef.get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No peoples yet.');
      Alert.alert('No matching peoples for '+this.state.searchkey);
  
    }  
    const networks=[];
    snapshot.forEach(doc => {
      
      console.log(doc.id, '=>', doc.data());
  
            
          networks.push({
                  firstname:doc.data().firstname,
                  lastname:doc.data().lastname,
                  email:doc.data().email,
                  key:doc.id,
                  occupation:doc.data().occupation,
                  profile:doc.data().profile
                });
    })
     
    
    
    this.setState({
        peoples:networks,
        loading:false,
      });
    
  
  })
  .catch(err => {
    console.error('Error getting documents', err);
    Alert.alert('error');
  });

  }

  updateIndex (index) {
    this.setState({selectedIndex:index});
  };
 toProfile(email){
   this.props.navigation.navigate('Profile', {
    userId: email,
  })
 }
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
 
    <ListItem avatar style ={{ marginBottom:1,}}>
      
      <Left>
        <Thumbnail source={{uri: item.profile }} />
      </Left>
      <Body style={{padding:5}}>
        <Text>{item.firstname+" "+item.lastname}</Text>
        <Text note>{item.occupation}</Text>
      </Body>
      <Right>
        <Content padder/>
        <Button iconLeft  light onPress={()=>this.toProfile(item.email)}>
        <Icon name='open' type='Ionicons' />
        <Text>Details</Text>
        </Button>
      </Right>
      
    </ListItem>
);


  _renderMainSearchContents = () => {
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
          <View>
            <FlatList
                      keyExtractor={this.keyExtractor}
                      data={this.state.peoples}
                      renderItem={this.renderItem}

                    />
          </View>
        );
      case 2:
        return (
          <RecommendedBusinessSlider />
        );
      default:
        return(
          <Text style = {{color:'red'}}>Error while rendering selected component</Text>
        );  

    }
};


   render(){
     
    const buttons = ['Ads', 'Peoples', 'Business'];
    const  selectedIndex  = this.state.selectedIndex;
    
      return(
        
        <Container>
          
          <Header rounded transparent>

            <Left>
            <Button transparent primary onPress={() => this.props.navigation.openDrawer()}>
              
              <Icon name='menu' />
                
              </Button>
            
              </Left>
            <Body>
                <H3>{'Search Results'}</H3>
                
            </Body>
          
          <Right>
              <Button  transparent primary onPress={()=>{ this.toggleSearchBar()}} >
                  <Icon name="search" />  
              </Button>
          </Right>

          </Header>

          {this._renderSearchBar()}

          <CardItem>
            <Text>{this.state.searchkey}</Text>
          </CardItem>
          <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{height: 80}}
            />

          <ScrollView styles ={styles.postContainer}>
          
          {this._renderMainSearchContents()}
            
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









