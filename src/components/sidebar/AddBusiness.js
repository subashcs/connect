import React, {Component} from 'react';
import { 
        Platform,
        StyleSheet, 
        View,
        Text,
        Alert,
        Image,
        ActivityIndicator,
        TouchableHighlight,
      } from 'react-native';
      

import firebase from 'firebase';
import {Spinner ,Input,MultiLineInput} from '../common/index';
import ImagePicker from 'react-native-image-picker';

import {Header ,Card,Content, Container ,CardItem , Button ,Left ,Right ,Body, Icon ,H3} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

const options = {
    title: 'Select Avatar',
    customButtons: [],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

export default class AddBusiness extends Component {
  
  static navigationOptions = {
   header:null,
  };
  state = {
    title:'',
    description: '',
    latitude:'',
    longitude:'',
    phone:'',
    address:'',
    loadingAdd:false,
    coverSource:null,
  }
  _uploadImage(){
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }  else {
          let source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            coverSource: source.uri,
          });
          
        }
      });
  }
  
  _uploadtoFirebase = async (uri , imageName)=>{
    const response = await fetch(uri);
    const blob = await response.blob();
    
  
    var ref= firebase.storage().ref(`Business/${firebase.auth().currentUser.email}/`).child("images/" + imageName);
    
       
    var upload=ref.put(blob);
    
    //instead of using function using 
    //arrow function keeps the scope of this 
    //so that we can access this.state
    upload.then((snapshot)=> {
      snapshot.ref.getDownloadURL().then((downloadURL)=> {
       Alert.alert('File available at', downloadURL);
        const url = downloadURL; 
        const db =firebase.firestore();

  
        
       
        db.collection("business").doc().set({
          cover:url,
          title:this.state.title,
          description:this.state.description,
          latitude:this.state.latitude,
          longitude:this.state.longitude,
          address:this.state.address,
          phone:this.state.phone,
          owner:firebase.auth().currentUser.email,
          
         
        }).then(function() {
          console.log("Success");
          Alert.alert('Successfully added')
          this.setState({
            coverSource:null,
            loadingAdd:false,
          })
      })
      .catch((error)=> {
        this.setState({
          loadingAdd:false,
        })
          console.error("Error adding document: ", error);
      });
     

      })  
    })
    .catch((error)=>{
      Alert.alert(error);
    })
   
   
    
  }

  uploadData(){
    this.setState({
      loadingAdd:true,
    })
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    //create random number
    var rand = Math.random()*10232343000
    //create imagenamenew
    imageName = 'coverimage'+ today.toString() + rand.toString()
    this._uploadtoFirebase(this.state.coverSource,imageName)
  }
   // More info on all the options is below in the API Reference... just some common use cases shown here

   _renderAddButton(){
    if(this.state.loadingAdd){
     return(
         
       <ActivityIndicator size="small" color="#000" />
     )
    }
    else{
      return(
         
       <Button  full primary style={{padding:10,}} onPress={()=>this.uploadData()}>
        <Text style={{color:'#fff'}}>ADD</Text>  
       </Button>  
      )
    }
  }
   render(){
      return(
        <Container>
             <Header rounded transparent>

                <Left>
                <Button transparent primary onPress={()=>this.props.navigation.goBack()}>
                  
                  <Icon name='arrow-back' type='Ionicons' />
                    
                  </Button>

                  </Left>
                <Body>
                  <H3>{'Add a Business'}</H3>
                </Body>

                <Right>
                  <Button  transparent primary >
                  
                      <Icon name="search" />
                    
                  </Button>
                </Right>

              </Header>
              
             <ScrollView>
                <CardItem>
                    <Button light style={{padding:5,margin:10}}onPress={this._uploadImage.bind(this)}>
                        <Text>{'Choose Cover'}</Text>
                    </Button>
                    <Image
                        source={{
                        uri: this.state.coverSource,
                        }}
                        style={{ width: 100,margin:10, height: 100 }}
                    />
                </CardItem>
                <CardItem>
                <Input
                  label ="Business Title"
                  value = {this.state.title}
                  placeholder = "pass"
                  onChangeText = {(title) => this.setState({title})}
                />
              </CardItem>
              <CardItem>
                <Input
                  label ="Address"
                  value = {this.state.address}
                  placeholder = "pass"
                  onChangeText = {(address) => this.setState({address})}
                />
              </CardItem>
              <CardItem>
                <Input 
                  label = "Location(lat)"
                  value = {this.state.latitude}
                  placeholder = "1.N"
                  onChangeText = {(latitude) => this.setState({latitude})}
                />
              </CardItem>
              <CardItem>
                <Input
                  label = "Location(long)"
                  value = {this.state.longitude}
                  placeholder = "0W"
                  onChangeText = {(longitude) => this.setState({longitude})}
                />
              </CardItem>
              <CardItem>
                <MultiLineInput
                  label="Description"
                  value={this.state.description}
                  placeholder={'Write business description'}
                  onChangeText={(description)=>this.setState({description})}

                />
              </CardItem>
              
              <CardItem>
                <Input
                  label = "phone"
                  value = {this.state.phone}
                  placeholder = "What do your business do"
                  onChangeText = {(phone) => this.setState({phone})}
                />
              </CardItem>
              <CardItem>
                <Content>
                  {this._renderAddButton()} 
                </Content>
              </CardItem>
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
    textStyle :{
      color :'blue',
      fontSize: 16,
      backgroundColor:'#fefefe',
      padding:5,
    }
    
  });









