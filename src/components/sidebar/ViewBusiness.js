import React, {Component} from 'react';
import { 
        Platform,
        StyleSheet, 
        View,
        Text,
        ScrollView,
        ImageBackground,
        Image,
        Alert
      } from 'react-native';
      


import firebase from 'firebase';

import { Header ,Content,Button ,Card, Body, Right , Left , H3 ,Icon ,Container, CardItem} from 'native-base';
import SearchBar from '../homecomponents/SearchBar';





  
export default class ViewBusiness extends Component {

  state = {
    searchbar : false,
    post:[],
  }
  
 constructor(props){
   super();
    this.BusinessClickHandler =this.BusinessClickHandler.bind(this);
}
 componentDidMount(){
   // Get post data from firebase
   this.getData(); 
 }

 BusinessClickHandler(){
  this.props.navigation.navigate('BusinessProfile');
}


getData(){
  var db=firebase.firestore();
 // db.collection("campaigns").where("capital", "==", true)
 db.collection("campaigns").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
  });
});
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
         this.setState({searchbar:true}); }
     else 
     {
       this.setState({searchbar:false})
      }
      
  } 
  searchAction(data){
    this.props.navigation.navigate('Searches');
  }
  _renderBusiness(title="Hello World",image="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",category="Fashion and Beauty",id='112'){
            return(
                <View  style={styles.viewStyle}>
           

                <ImageBackground source={{uri : image}} style={styles.imageBackground}>
                  <Content style ={styles.wrapText}>
                       
                       <Text style={styles.title}>{ title }</Text>
                       
                       <Text style={styles.subtitle}>{ category }</Text>
                       <Button full primary 
                               style={styles.buttonStyle}
                               onPress={()=>this.BusinessClickHandler} >
                                 
                           <Text style={{color:"#fff",fontFamily:'times'}}> Details </Text>
                       </Button>
                 </Content>
                </ImageBackground>
               
               </View>
            );
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
                <H3>{'View Business'}</H3>
                
            </Body>
          
          <Right>
              <Button  transparent primary onPress={()=>{ this.toggleSearchBar()}} >
              
                  <Icon name="search" />
                
              </Button>
          </Right>

          </Header>
          {this._renderSearchBar()}

          
          
          <ScrollView styles ={styles.postContainer}>
          
                <Card style={{justifyContent:'center',width:'100%'}}> 
                    <CardItem>
                        <H3>Fashion and Beauty</H3>
                    </CardItem>
                    {this._renderBusiness()}
                    
                    {this._renderBusiness()}
                    <CardItem>
                        <H3>Health and medicine</H3>
                    </CardItem>
                    {this._renderBusiness(title="Bishal pharma" ,image="https://images.collegexpress.com/article/health-and-medicine.jpg" ,category="Health and Medicine" ,id="32")}
                    
                    {this._renderBusiness()}
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
  
    imageBackground:{
        height:'100%',
        width:'100%',
      },
      viewStyle: {
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom:0,
        paddingTop: 15,
        height:200,
        width:200,
        
        paddingLeft:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
      },
      wrapText:{
        backgroundColor:'#2196f352',
      },
      title: {
        padding: 10,
        marginTop:10,
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    buttonStyle:{
      marginTop:60,
    },
    slider: {
        marginTop: 15,
        marginLeft: 0,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding:10,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 2,
        justifyContent: 'flex-start',
        overflow: 'visible' // for custom animations
    },
    
  });









