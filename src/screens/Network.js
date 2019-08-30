import React, {Component} from 'react';
import { 
        Platform,
        StyleSheet, 
        View,
        
        FlatList
      } from 'react-native';
      

import firebase from 'firebase';
import {  Spinner } from '../components/common';

import { Header ,Button ,Content, Text ,Thumbnail, ListItem ,Body, Right , Left , H3 ,Icon ,Container} from 'native-base';
import SearchBar from '../components/homecomponents/SearchBar';


export default class Network extends Component {
  
  static navigationOptions = {
    header:null,
  };

  state ={
    searchbar :false,
    networks:[],
    loading:null,
  }

componentDidMount(){

  
  const db = firebase.firestore();
  
  let networkRef = db.collection('users]').doc(firebase.auth().currentUser.email).collection('network');
  let query = networkRef.orderBy('firstname','asc').limit(8).get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No network yet.');
      return;
    }  
    const networks=[];
    snapshot.forEach(doc => {
      
      console.log(doc.id, '=>', doc.data());
      var userid=doc.data().creator;
          
           
          networks.push({
                  firstname:doc.data().firstname,
                  lastname:doc.data().lastname,
                  friend:doc.data().friend,
                  key:doc.id,
                  occupation:doc.data().occupation,
                  profile:doc.data().profile
                });
    })
     
    
    
    this.setState({
        networks:networks,
        loading:false,
      });
    
  
  })
  .catch(err => {
    console.log('Error getting documents', err);
    Alert.alert('error');
  });
  
}



keyExtractor = (item, index) => index.toString()

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
                <Button iconLeft  light onPress={()=> this.props.navigation.navigate('Profile', {
                                                        userId: item.friend,
                                                      })}>
                <Icon name='open' type='Ionicons' />
                <Text>Details</Text>
                </Button>
              </Right>
              
            </ListItem>
);

  
   render(){
     
      

      return(
        <View style={styles.container}>
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
                    <FlatList
                      keyExtractor={this.keyExtractor}
                      data={this.state.networks}
                      renderItem={this.renderItem}

                    />
          
        </View>
      );
    }

  }

  const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'space-between',
    
    },
    
  });









