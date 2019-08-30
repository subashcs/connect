import React, {Component} from 'react';
import { 
        Platform,
        StyleSheet, 
        Text, 
        TextInput, 
        View,
        Alert,
        ScrollView
      } from 'react-native';

import { Spinner,MultiLineInput, CardSection, Input, Button ,Errorhold } from  '../common';

import firebase from 'firebase';
import '@firebase/firestore';




export default class Signup extends Component {
    state={
      firstname:'',
      lastname:'',
      email:'',
      description:'',
      occupation:'',
      password:'',      
      error: '',
      loading :false
    }
    constructor(){
      super();
      
    }

    _onPressButton(){
      const{ email,password,firstname,lastname,occupation,description} = this.state;
      this.setState({error: '',loading : true});
      if(this._SendDataToFirestore(email,password,firstname,lastname,occupation,description))
      {
          //bind is used to bind current method with context
          const originalSend = XMLHttpRequest.prototype.send;
          XMLHttpRequest.prototype.send = function(body) {
            if (body === '') {
              originalSend.call(this);
            } else {
              originalSend.call(this, body);
            }
          };    
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onSignupSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email,password)
          .then(this.onSignupSuccess.bind(this))
          .catch(
            this.onSignupFail.bind(this));
      });
    }
    else{
      Alert.alert('Error adding to firebase');
    }
   
  }

  
  _SendDataToFirestore(email, password, firstname, lastname, occupation,description){
    
    
    const db = firebase.firestore();
    const usersRef = db.collection('users]').doc(email);

    usersRef.get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          usersRef.onSnapshot((doc) => {
            // do stuff with the data
          });
          Alert.alert("Already Inserted");
          return 0;
        }
        else {
          db.collection("users]").doc(email).set({
            email:email,
            firstname:firstname,
            lastname:lastname,
            occupation:occupation,
            password:'',
            cover:'https://www.incimages.com/uploaded_files/image/970x450/getty_509107562_2000133320009280346_351827.jpg',
            latitude:'0',
            longitude:'0',
            profile:'https://static.thenounproject.com/png/17241-200.png',
            address:'',
            skills:["Skill1","Skill2"],
            description:description,
            phone:["0000000","000000"]
          })
          .then(function() {
              console.log("Success");
              Alert.alert('success');
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
              Alert.alert('failure');

          });
    
       }
    });
   return 1;
  }


  onSignupSuccess(){

    this.setState({
      email : '',
      password : '',
      loading : false,
      error : ''
    });

  }

  onSignupFail(){
     this.setState({
         error:'Signup Failed',
         loading : false
    }); 
  }

  renderButton(){
    if(this.state.loading){
      return (
        <View style ={{padding:10,height : 50}}>
          <Spinner size = 'small'/>
        </View>  
      );
    }

    return(
        <Button onPress={this._onPressButton.bind(this)}>
        {" Signup " }
       </Button> 
    );
    
  }
  
    render(){
      return(
        
         <View style={styles.signup}>
          <CardSection>
            <Input
            label ={"First Name"}
            color={'#fff'}
            value= {this.state.firstname}
            placeholder ={"First Name"}
            onChangeText={(text) => this.setState({firstname:text})}
            />
          </CardSection>
          <CardSection>
            <Input
              label ={"Last Name"}
              color={'#fff'}
              value = {this.state.lastname}
              placeholder="Last Name"
              onChangeText={(text) => this.setState({lastname:text})}
          />
          </CardSection>
          <CardSection>
            <Input
              label ={"Email"}              
              value = {this.state.email}
              placeholder="john@example.com"
              color={'#fff'}
              onChangeText={(text) => this.setState({email:text})}
            />
          </CardSection>
          <CardSection>  
            <Input
              label ={"Occupation"}
              color={'#fff'}
              value={this.state.occupation}
              placeholder="eg: Freelancer , Architect engineer ,Plumber"
              onChangeText={(text) => this.setState({occupation:text})}
            />
          </CardSection>
          <CardSection>
            <MultiLineInput
                label ={"Description"}
                color={'#fff'}
                value={this.state.description}
                placeholder="Type professional description of yours"
                onChangeText={(text) => this.setState({description:text})}
              
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              label ={"Password"}
              color={'#fff'}
              value={this.state.password}
              placeholder="******"
              onChangeText={(text) => this.setState({password:text})}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              label ={"Confirm Password"}
              color={'#fff'}
              placeholder="*******"
              onChangeText={(text) => this.setState({password:text})}
            />
          </CardSection>
          
          <Errorhold errorText={this.state.error}/>

          {this.renderButton()}
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
   
    signup: {
      paddingHorizontal:10,
      paddingBottom:35,
      /*borderWidth: 1,
      borderColor: '#000',
      borderRadius:10,*/
      textAlign: 'left',
      
      backgroundColor: '#08141d78',
      marginBottom: 30,
    },
  });