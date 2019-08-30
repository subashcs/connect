// Import libraries for making a component
import React from 'react';
import { Text, View ,Alert ,Image} from 'react-native';
import { Container, Header,Icon,Left,Right,CardItem, Button, Content, Textarea, Form } from "native-base";
import ImagePicker from 'react-native-image-picker';

import firebase from 'firebase';

import '@firebase/firestore';


const options = {
  title: 'Select image',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

// Make a component
class InsertAd extends React.Component {
  
  

  state = {
    imageSource :null,
    downloadURL:null,
    content:null,
    error:'',
    category:null,
  };
 
  getCategory(content){
  
    fetch("http://10.0.2.2:5000/classify", {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "content": content,
      }),
    })
    .then(response => response.json())
    .then((responseJson)=> {
      
      this.setState({
      category: responseJson.category.toString()
      })
      
    })
    .catch( 
  
      error=> this.setState({
      
      error: error
      })) 
      //to catch the errors if any
    const returnValue = this.state.category;
    return returnValue;
  } //function ends
  

 _uploadPost =()=>{
  const db = firebase.firestore();
        
      var cat=this.getCategory(this.state.content);
        if(cat)
          {
          
          db.collection("campaign").doc().set({
            content:this.state.content,
            date:firebase.firestore.Timestamp.fromDate(new Date()),
            creator:firebase.auth().currentUser.email,
            image:this.state.downloadURL,
            video:'',
            views:1,
            category:cat,
        })
        .then(()=> {
          
          Alert.alert('Ads inserted successfully');
          this.setState({
            content:'',
            category:null,
            imageSource:null,
          })
        })
        .catch(function(error) {
        console.error("Error adding document: ", error);
        })

        }
        else{
          console.log('Error categorizing');
        }

};

_uploadImage = async () => {
  ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          imageSource: source.uri,
        });
        //get todays date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        //create random number
        var rand = Math.random()*10232343000
        //create imagenamenew
        imageName = 'postimage'+ today.toString() + rand.toString()
        this._uploadtoFirebase(source.uri, imageName)
              
              
      
      }
    });
}
_uploadtoFirebase = async (uri , imageName)=>{
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref= firebase.storage().ref(`Users/${firebase.auth().currentUser.email}/`).child("images/" + imageName);
  
  var upload=ref.put(blob);
  
  //instead of using function using 
  //arrow function keeps the scope of this 
  //so that we can access this.state
  upload.then((snapshot)=> {
    snapshot.ref.getDownloadURL().then((downloadURL)=> {
     Alert.alert('File available at', downloadURL);
      const url = downloadURL; 
      this.setState({
        downloadURL:url
      })
    })  
  })
  .catch((error)=>{
    Alert.alert(error);
  })
 
 
  
}
_renderCategory(){
  if(this.state.category){
    return (
      <CardItem>
        <Text>
        {this.state.category}

        </Text>
      </CardItem>
    )
  }
}
render(){
  const { imageSource ,category } = this.state;

  return (
        <Content padder>
          <Form  style={styles.formStyle}>
            <Textarea rowSpan={5} bordered 
                      placeholder="Insert Ads Content Text .." 
                      onChangeText={(text) => this.setState({content:text})}/>
            <CardItem>
              <Left>
              <Button iconLeft primary transparent onPress={this._uploadImage.bind(this)}>
                <Icon name='images' type='Ionicons' />
                 <Text> Add Image</Text>
              </Button>
              </Left>
              <Right>
              <Button iconLeft primary bordered  onPress={this._uploadPost} style = {{paddingHorizontal:10,}}>
                <Icon name='cloud-upload' type='Ionicons' style={{marginLeft:0}}/>
                 <Text > Post </Text>
              </Button>
              </Right>

            </CardItem>
        
            
              {
               this._renderCategory()
              }
          {/* <Text>
            {this.state.downloadURL}
          </Text> */}
              
              {
                imageSource && (
                <CardItem>
                  <Image
                  source={{ uri: imageSource }}
                  style={{ width: 300, height: 300 }}
                />
                </CardItem>
                )
              }
                    
          </Form>
        </Content>
  );
};
};

const styles = {
 formStyle:{
    borderWidth:1,
    borderColor:'transparent',
    borderRadius:5,
    shadowColor:'blue',
    margin:0,
    shodowOffset:{width:1,height:1},
    shadowOpacity:0.7,
    shadowRadius:10,
    elevation:2,
 },
};

// Make the component available to other parts of the app
export { InsertAd};