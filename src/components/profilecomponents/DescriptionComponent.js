import React, {Component} from 'react';
import { 
        Platform,
        StyleSheet,
        Alert 
        
      } from 'react-native';
      

import firebase from 'firebase';

import { Content ,Container,Icon,Button, Card , CardItem ,Body ,Text } from 'native-base';

class DescriptionComponent extends React.Component{
    constructor (props) {
        super(props);
        
      }
      state={
        connected:false,
      }
    
    
    checkConnection(email){

      const db =firebase.firestore();
      let userRef = db.collection('users]').doc(firebase.auth().currentUser.email).collection('network').doc(email);
      let getDoc = userRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        this.setState({
          connected:false,
        })
      } else {
        console.log('doc exists');
        this.setState({
          connected:true,
        })
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
      Alert.alert('Query error in description connection fetch');
    });


    }


    connectUser(email){
      const db = firebase.firestore();
      db.collection('users]').doc(firebase.auth().currentUser.email).collection('network').doc(email).set({
        firstname:this.props.firstname,
        lastname:this.props.lastname,
        friend:this.props.email,
        occupation:this.props.occupation,
        profile:this.props.profile,

      }).then(()=>{
        Alert.alert("Connected");
        this.setState({
          connected:true
        })
      }).catch(err=>{
        Alert.alert('Error');
        console.log('Error',err);
      })
      

    }  

    _renderConnect= ()=>{
      
      if(this.props.for=='user' && this.props.email!==firebase.auth().currentUser.email){

        this.checkConnection(this.props.email);
          
      if(this.state.connected==true){
        return(
        <Button light style={{borderRadius:30,padding:10,alignSelf:'center',position:'absolute',top:-25,}}>
        <Text>{"Connected"}</Text>
        <Icon name='call' type='Ionicons'/>
       </Button>
        );
      }
      else{
       return(
        <Button  style={{borderRadius:30,padding:10,alignSelf:'center',position:'absolute',top:-25,}} 
                 onPress={()=>this.connectUser(this.props.email)} 
        >
        <Text>{"Connect"}</Text>
        </Button>
       );
      }
      }
      else{
        return null;
      }
    };  
    
    render(){
            
        return(
            <Card style={{textAlign:'center',padding:10,shadowColor:'#000',shadowOpacity:'0.3',shadowOffset:{width:2,height:2},shadowRadius:1,}}>
                {this._renderConnect()}
                
                <Body>

                  <Text style ={{textAlign:'center',marginTop:30,}}>
                     {this.props.description}
                  </Text>
                </Body>
          
          </Card>
          
        );
    }
}


export default DescriptionComponent;