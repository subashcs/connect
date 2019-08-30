import React, {Component} from 'react';
import { 
        Platform,
        StyleSheet, 
        ScrollView,
        TouchableOpacity,
        View,
        Image,
        PixelRatio,
        Text,
        Alert
      } from 'react-native';
      

import firebase from 'firebase';
import '@firebase/firestore';

import {  Input,Spinner } from '../components/common/index';


import { Header ,Button ,Form,Textarea, Item, Picker ,Content, Body,Card ,CardItem, Right , Left , H3  ,Icon , Container} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import SelectBusiness from '../components/businesscomponents/SelectBusiness';

export default class EditProfile extends Component {
  
  state = {
  
    avatarSource: null,
    coverSource:null,
    description:null,
    latitude:null,
    longitude:null,
    firstname:null,
    lastname:'',
    occupation:'',
    skills:[],
    phone1:'',
    phone2:'',

  };


  onValueChange2(value) {
    this.setState({
      occupation: value
    });
  };

  static navigationOptions = {
        header: null
  };
  
  constructor (props) {
    super(props);

    this.selectProfileTapped = this.selectProfileTapped.bind(this);

    this.selectCoverTapped =this.selectCoverTapped.bind(this);
  };

  componentDidMount(){
      const firstname= this.props.navigation.getParam('firstname','');
      const lastname = this.props.navigation.getParam('lastname','null');
      const description = this.props.navigation.getParam('description','desc');
      const latitude = this.props.navigation.getParam('latitude','0');
      const longitude = this.props.navigation.getParam('longitude','0');
      const skills = this.props.navigation.getParam('skills',[]);
      const address = this.props.navigation.getParam('address','not set');
      const phone = this.props.navigation.getParam('phone','00 00 00');
      const occupation = this.props.navigation.getParam('occupation','Unemployed');
      this.setState({
        firstname:firstname,
        lastname:lastname,
        description:description,
        latitude:latitude,
        longitude:longitude,
        skills:skills,
        address:address,
        phone1:phone[0],
        phone2:phone[1],
        occupation:occupation,
        

      })
    }

  selectProfileTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
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
        imageName = 'avatarimage'+ today.toString() + rand.toString()
        this._uploadtoFirebase(source.uri, imageName,"profile")
       
      }
    });
  };


  selectCoverTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          coverSource: source,
        });
         //get todays date
         var today = new Date();
         var dd = String(today.getDate()).padStart(2, '0');
         var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
         var yyyy = today.getFullYear();
 
         today = mm + '/' + dd + '/' + yyyy;
         //create random number
         var rand = Math.random()*10232343000;
         //create imagenamenew
         imageName = 'coverimage'+ today.toString() + rand.toString();
         this._uploadtoFirebase(source.uri, imageName,"cover")
        
      }
    });
  };

 _uploadtoFirebase = async (uri , imageName,type)=>{
  const response = await fetch(uri);
  const blob = await response.blob();
  if(type=="cover"){

  var ref= firebase.storage().ref(`Users/${firebase.auth().currentUser.email}/`).child("images/cover" + imageName);
  }
  else{
    var ref= firebase.storage().ref(`Users/${firebase.auth().currentUser.email}/`).child("images/avatar" + imageName);
    
  }  
  var upload=ref.put(blob);
  
  //instead of using function using 
  //arrow function keeps the scope of this 
  //so that we can access this.state
  upload.then((snapshot)=> {
    snapshot.ref.getDownloadURL().then((downloadURL)=> {
     Alert.alert('File available at', downloadURL);
      const url = downloadURL; 
      const db =firebase.firestore();

      if(type=="cover"){
     
      db.collection("users]").doc(firebase.auth().currentUser.email).update({
        cover:url
       
      }).then(function() {
        console.log("Success");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    }
    else{
      
      db.collection("users]").doc(firebase.auth().currentUser.email).update({
        profile:url
       
      }).then(function() {
        console.log("Success");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    }
    })  
  })
  .catch((error)=>{
    Alert.alert(error);
  })
 
 
  
}
 
    
_uploadData(){
  const db = firebase.firestore();
  var phonearray = [this.state.phone1,this.state.phone2];
  db.collection("users]").doc(firebase.auth().currentUser.email).update({
    
    firstname:this.state.firstname,
    lastname:this.state.lastname,
    address:this.state.address,
    occupation:this.state.occupation,
    phone:phonearray,
    latitude:this.state.latitude,
    longitude:this.state.longitude,
    description:this.state.description

  }).then(function() {
    Alert.alert("Success");
    
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

};

  
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
                <H3>{'Edit Profile'}</H3>
            </Body>
          
          <Right>
          
          </Right>

          </Header>

          
          <ScrollView styles ={styles.postContainer}>  
       

            <TouchableOpacity onPress={this.selectProfileTapped.bind(this)}>
              <View
                style={[
                  styles.avatar,
                  styles.avatarContainer,
                  { marginBottom: 20 },
                ]}
              >
                {this.state.avatarSource === null ? (
                  <Text>Click to change profile</Text>
                  ) : (
                  <Image style={styles.avatar} source={this.state.avatarSource} />
                )}
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={this.selectCoverTapped.bind(this)}>
              <View
                style={[
                  styles.cover,
                  styles.avatarContainer,
                  { marginBottom: 20 },
                ]}
              >
                {this.state.coverSource === null ? (
                  <Text>Click to change Cover </Text>
                ) : (
                  <Image style={styles.cover} source={this.state.coverSource} />
                )}
              </View>
            </TouchableOpacity>
            
            <Input
              label ="First Name"
              value = {this.state.firstname}
              placeholder = "Ram Sharma"
              onChangeText = {(firstname) => this.setState({firstname})}
            />

             <Input
              label ="Last Name"
              value = {this.state.lastname}
              placeholder = "LastName"
              onChangeText = {(lastname) => this.setState({lastname})}
            />
            <Input
              label ="Address"
              value = {this.state.address}
              placeholder = "Local address, Mycity , MyDistrict"
              onChangeText = {(address) => this.setState({address})}
            />
            
           <CardItem>
            <Text style={{color:'black',fontSize:18}}>Description</Text>
            </CardItem>
            <Textarea rowSpan={5} bordered 
                      value={this.state.description}
                      style={{margin:5}}
                      placeholder="Insert Description" 
                      onChangeText={(description) => this.setState({description})}/>
            
            
            
             
             <Input
              label ="Phone"
              value = {this.state.phone1}
              placeholder = "9860427421"
              onChangeText = {(phone1) => this.setState({phone1})}
            />
            <Input
              label ="Phone(optional)"
              value = {this.state.phone2}
              placeholder = "9860427421"
              onChangeText = {(phone2) => this.setState({phone2})}
            />
            <CardItem>

            <H3>Location</H3>
            </CardItem>

            <Input
              label ="Latitude"
              value = {this.state.latitude}
              placeholder = "0"
              onChangeText = {(latitude) => this.setState({latitude})}
            />

            <Input
              label ="Longitude"
              value = {this.state.longitude}
              placeholder = "0"
              onChangeText = {(longitude) => this.setState({longitude})}
            />
            <CardItem>
            <Content>
              <Form>
                <H3>Choose Occupation</H3>
              <Item picker>
                <Picker
                  mode="dialog"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined,color:'#000',overflow:'scroll' }}
                  placeholder="Select to change your occupation"
                  placeholderStyle={{ color: "#000" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.occupation}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  
                  <Picker.Item label="Student" value="student" />
                  <Picker.Item label="Teacher" value="teacher" />
                  <Picker.Item label="Fashion Designer" value="fashion" />
                  <Picker.Item label="Plumber" value="plumber" />
                  <Picker.Item label="Architect" value="architect" />
                  <Picker.Item label="Civil Engineer" value="student" />
                  <Picker.Item label="Computer Engineer" value="teacher" />
                  <Picker.Item label="Mechanical Engineer" value="fashion" />
                  <Picker.Item label="Gardener" value="plumber" />
                  <Picker.Item label="Software Engineer" value="architect" />
                  
                  <Picker.Item label="Physiotherpist" value="teacher" />
                  <Picker.Item label="Doctor" value="fashion" />
                  <Picker.Item label="Nurse" value="plumber" />
                  <Picker.Item label="Scientist" value="architect" />
                  
                  <Picker.Item label="Pharmacist" value="teacher" />
                  <Picker.Item label="Lawyer" value="fashion" />
                  <Picker.Item label="Dentist" value="plumber" />
                  <Picker.Item label="Graphics Designer" value="architect" />
                  <Picker.Item label="Social Worker" value="plumber" />
                  <Picker.Item label="Politician" value="architect" />
                  
                </Picker> 
              </Item>
              </Form>
            </Content>
            </CardItem>
            {

            //<CardItem >
              //<Content>
              
              //<SelectBusiness/>
               
             //</Content>
            //</CardItem>

            }
            
            <Button full primary
                    onPress={() => {
                        this._uploadData();
                    }}>
                    <Text style={{padding:10,color:'#fff'}}>Change</Text>
                </Button>
        

          </ScrollView>

      </Container>
      
      );
    };


  
  };   

  const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'space-between',
    
    },
    cardContainer: {
      backgroundColor: '#FFF',
      borderWidth: 0,
      flex: 1,
      margin: 0,
      padding: 0,
    },
    postContainer: {
      justifyContent : 'flex-start',
      justifyContent : 'center',
    },
    avatarContainer: {
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center',
      
      alignSelf:'center',
    },
    avatar: {
      borderRadius: 10,
      width: 150,
      height: 150,
    },
    cover:{
      width:150,
      height:150,
    }
    
  });


