import React, {Component} from 'react';
import { 
        Platform,

        StyleSheet, 
        Text, 
        TextInput, 
        View,
        Alert,
      } from 'react-native';
import { Input,CardSection, Button ,Errorhold , Spinner } from  '../common/';
import firebase from 'firebase';

export default class Login extends Component {
    state={
      email:'',
      password:'',
      error: '',
      loading :false
    }
  //the following function handles login
    _onPressButton(){

      const{ email,password} = this.state;
      
      this.setState({error: '',loading : true});
       //bind is used to bind current method with context
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(
            this.onLoginFail.bind(this)
         );

  }

  onLoginSuccess(){
    this.setState({
      email : '',
      password : '',
      loading : false,
      error : ''
    });
  }

  onLoginFail(error){
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        this.onLoginFail.bind(this);
        alert(errorMessage);
      }
      console.log(error);
      
     this.setState({
         error:'Authentication Failed',
         loading : false
     }); 
  }

  _onPressForget(){

    Alert.alert('This is the Forget app');
      
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
        {" Login " }
       </Button> 
    );
    
  }

  render(){
      return(
        <View style={styles.login}>
          <CardSection>
            <Input
              label ="Email"
              value = {this.state.email}
              placeholder = "hello@example.com!"
              color={'#fff'}
              onChangeText = {(email) => this.setState({email})}
            />
          </CardSection >
          <CardSection style={{ backgroundColor:'red'}}>
            <Input
              secureTextEntry
              label = "Password"
              color={'#fff'}
              value = {this.state.password}
              placeholder = "Password"
              onChangeText = {(password) => this.setState({password})}
            />
          </CardSection>
          <Text
              style = {styles.plainlink}
              onPress={this._onPressForget}
              
            >{"Forgot Password ? "}</Text>

            <Errorhold  errorText = {this.state.error}/>
           
           {this.renderButton()}

      </View>
      );
    }
  }


  //stylings here
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    login: {
      padding:10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#08141d4a',
      /*borderWidth: 1,
      borderColor: '#000',
      borderRadius:10,*/
      marginBottom: 30,
    },
    errorTextStyle: {
      fontSize:20,
      color: 'red',
    },  
    plainlink: {
      color: '#fff',
      margin:10,
      fontSize:16,
      
    },
  });