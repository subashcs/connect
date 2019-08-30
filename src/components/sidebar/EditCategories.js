import React, {Component} from 'react';
import { 
        Platform,
        StyleSheet, 
        View,
        ScrollView,
        Alert,
        TouchableHighlight,
        ActivityIndicator,
      } from 'react-native';
      

import firebase from 'firebase';
import {Spinner } from '../common/index';

import {Header ,Card ,Container ,Text ,Content,Button ,Left ,Right ,Body, Icon ,H3, CardItem} from 'native-base';


export default class EditCategories extends Component {
  
  static navigationOptions = {
   header:null,
  };
   
  state={
    Recruitment:false,
    Foods:false,
    Fashion:false,
    Machineries: false,
    Travel:false,
    Energy:false,
    Agriculture:false,
    Health:false,
    Constructions:false,
    Banking:false,
    Hotel:false,
    Education:false,
    Entertainment:false,
    Sports:false,
    Engineering:false,
    Household:false,
    favCategories:[],
    loading:false,  
        
  };
  componentDidMount(){
     this.fetchCategories();

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

toggleState(item){
   switch(item){
      case 'Recruitment':
         this.setState({Recruitment:!this.state.Recruitment});
         return;
      case 'Foods Dairy and Beverages':
         this.setState({Foods:!this.state.Foods});
         return;
 
      case 'Fashion and Beauty':
         this.setState({Fashion:!this.state.Fashion});
         return;
 
      case 'Machineries and Instrument':
         this.setState({Machineries:!this.state.Machineries});
         return;
 
      case 'Travel and Tourism':
         this.setState({Travel:!this.state.Travel});
         return;
 
      case 'Energy and Environment':
         this.setState({Energy:!this.state.Energy});
         return;
 
      case 'Agriculture':
         this.setState({Agriculture:!this.state.Agriculture});
         return;
 
      case 'Health and Medicine':
         this.setState({Health:!this.state.Health});
         return;
 
      case 'Constructions':
         this.setState({Constructions:!this.state.Constructions});
         return;
 
      case 'Banking Insurance and Financial Services':
         this.setState({Banking:!this.state.Banking});
         return;
 
      case 'Hotel and Restaurants':
         this.setState({Hotel:!this.state.Hotel});
         return;
 
      case 'Education':
         this.setState({Education:!this.state.Education});
         return;
 
      case 'Entertainment':
         this.setState({Entertainment:!this.state.Entertainment});
         return;
 
      case 'Sports':
         this.setState({Sports:!this.state.Sports})
         return;
 
      case 'Engineering and Technology':
         this.setState({Engineering:!this.state.Engineering});
         return;
         
      case 'Household and Office':
         this.setState({Household:!this.state.Household});
         return;
 
      default:
         Alert.alert('Invalid Code');
     }
}

  assignCategoriestoState(favCategories){
     favCategories.map((item,index)=>{
        //if any item is found in array it state will be true
       this.toggleState(item);
     })
  }


  _renderCats=(catvalue,cat)=>{
    
    var backColor= catvalue?'#3f51b5':'#fff';
    var fontColor= catvalue?'#fff':'#000';
        return(
          <View  style={{margin:7,}}>
              
                <Button onPress={()=>this._updateCategory(catvalue,cat)}
                        style={{backgroundColor:backColor}}
                >
                <Text style={{color:fontColor,}} >
                  {cat}
                </Text>
                </Button>
          
          </View>
          );

  };

  _updateSnippet=(category,catvalue)=>{
     
   let favCategories= this.state.favCategories;
   if(catvalue){
      var index = favCategories.indexOf(category);
      if (index > -1) {
        favCategories.splice(index,1);//deleting value
        this.setState({
           favCategories:favCategories
        })
        this.updateDatabseCat(favCategories);
      }
     }
     else{
         this.setState({
            favCategories:favCategories.concat(category)
         })
         this.updateDatabseCat(favCategories.concat(category));
     }
     //finally change category's state
     this.toggleState(category);
  }//_updateSnippet code ends



  _updateCategory=(catvalue,cat)=>{
     this.setState({
        loading:true,
     })
   switch(cat){
     case 'Recruitment':
       this._updateSnippet('Recruitment',catvalue);
       
       this.setState({Recruitment:!catvalue});
        return;
     case 'Foods Dairy and Beverages':
       this._updateSnippet('Foods Dairy and Beverages',catvalue);
       this.setState({Foods:!catvalue});
        return;

     case 'Fashion and Beauty':
       this._updateSnippet('Fashion and Beauty',catvalue);
       this.setState({Fashion:!catvalue});
        return;

     case 'Machineries and Instrument':
         this._updateSnippet('Machineries and Instrument',catvalue);
         return;

     case 'Travel and Tourism':
         this._updateSnippet('Travel and Tourism',catvalue);
         return;

     case 'Energy and Environment':
         this._updateSnippet('Energy and Environment',catvalue);
         return;

     case 'Agriculture':
         this._updateSnippet('Agriculture',catvalue);
         return;

     case 'Health and Medicine':
         this._updateSnippet('Health and Medicine',catvalue);
         return;

     case 'Constructions':
         this._updateSnippet('Constructions',catvalue);
         return;

     case 'Banking Insurance and Financial Services':
         this._updateSnippet('Banking Insurance and Financial Services',catvalue);
         return;

     case 'Hotel and Restaurants':
         this._updateSnippet('Hotel and Restaurants',catvalue);
         return;

     case 'Education':
         this._updateSnippet('Education',catvalue);
         return;

     case 'Entertainment':
         this._updateSnippet('Entertainment',catvalue);
         return;

     case 'Sports':
         this._updateSnippet('Sports',catvalue);
         return;

     case 'Engineering and Technology':
         this._updateSnippet('Engineering and Technology',catvalue);
         return;
        
     case 'Household and Office':
         this._updateSnippet('Household and Office',catvalue);
         return;

     default:
        return (Alert.alert('Invalid Code')); 
   }
  }



  updateDatabseCat(favCategories){
          
    const db =firebase.firestore();
    db.collection("users]").doc(firebase.auth().currentUser.email).set(
      {
      favCategories:favCategories
    },{merge:true}  
    ).then(()=>{
      console.log("Successfully updated users categories");
      this.setState({
        loading:false,
      })
  })
  .catch(function(error) {
    this.setState({
      loading:false,
    })  
    console.error("Error adding document: ", error);
      
  });

}

   render(){
      if(!this.state.loading){
      return(
        <Container>
             <Header rounded transparent>

                <Left>
                <Button transparent primary >
                  
                  <Icon name='menu' />
                    
                  </Button>

                  </Left>
                <Body>
                    <H3>{'Connector'}</H3>
                </Body>

                <Right>
                  <Button  transparent primary >
                  
                      <Icon name="search" />
                    
                  </Button>
                </Right>

                </Header>

            <Card>
              <CardItem>
                <H3>{'Click to choose categories of interest:'}</H3>
              </CardItem>
              <ScrollView>
              <CardItem style={{flexDirection:'column'}}>
                
                  {this._renderCats(this.state.Recruitment ,'Recruitment')}
                  
                  {this._renderCats(this.state.Food,'Foods Dairy and Beverages')}
                  {this._renderCats(this.state.Fashion,'Fashion and Beauty')}
                  {this._renderCats(this.state.Machineries,'Machineries and Instrument')}
                  {this._renderCats(this.state.Travel,'Travel and Tourism')}
                  {this._renderCats(this.state.Energy,'Energy and Environment')}
                  {this._renderCats(this.state.Agriculture,'Agriculture')}
                  {this._renderCats(this.state.Health,'Health and Medicine')}
                  {this._renderCats(this.state.Constructions,'Constructions')}
                  {this._renderCats(this.state.Banking,'Banking Insurance and Financial Services')}
                  {this._renderCats(this.state.Hotel,'Hotel and Restaurants')}

                  {this._renderCats(this.state.Education,'Education')}
                  {this._renderCats(this.state.Entertainment,'Entertainment')}
                  {this._renderCats(this.state.Sports,'Sports')}
                  {this._renderCats(this.state.Engineering,'Engineering  and Technology')}
                  {this._renderCats(this.state.Household,'Household and Office')}
               
               </CardItem>
              </ScrollView> 
            </Card>
          </Container>  
      );
    }
    else{
      return(
         <Container style={{justifyContent:"center"}}>
            <ActivityIndicator size="large" color="#000" style={{justifyContent:'center'}}/>

         </Container>
      )
    }

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
    }
    
  });









