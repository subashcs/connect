import React, {Component} from 'react';
import { 
        Platform,
        StyleSheet, 
        View,
        ActivityIndicator,
        Alert,
      } from 'react-native';
      

import firebase from 'firebase';
import {Input,} from '../common/index';
import ImagePicker from 'react-native-image-picker';

import {Header ,Text,Card,Content, Container ,CardItem , Button ,Left ,Right ,Body, Icon ,H3} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

const options = {
    title: 'Select Avatar',
    customButtons: [],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

export default class AddSkills extends Component {
  
  static navigationOptions = {
   header:null,
  };
  state = {
    firstname:'',
    skills:[],
    newskill:'',
    loadingAdd:null,
  }

  componentDidMount(){
            this.fetchSkills();
            this.setState({
              loadingAdd:false,
            })
  }
  fetchSkills(){
    const db =firebase.firestore();
    const userId=firebase.auth().currentUser.email;
    let userRef = db.collection('users]').doc(userId);
    let getDoc = userRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      const {firstname,skills} =doc.data();
      console.log('Document data:', doc.data());
      this.setState({
        firstname:firstname,
        skills:skills,
        
      })
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

  }

  uploadSkill = (newskill)=>{
      if(newskill){
        this.setState({
          loadingAdd:true,
          skills:this.state.skills.concat(newskill)
        })
        
        this.updateSkillDatabase(this.state.skills.concat(newskill));
    }
    else{
      Alert.alert('Null value supplied');
    }
    
  }
  updateSkillDatabase(skills){
       
    const db =firebase.firestore();
    db.collection("users]").doc(firebase.auth().currentUser.email).set(
      {
      skills:skills
    },{merge:true}  
    ).then(()=>{
      console.log("Successfully updated users skill");
      Alert.alert('Successfully Updated');
      this.setState({
        newskill:null,
        loadingAdd:false,
      })
    
  })
  .catch(function(error) {
    this.setState({
      loadingAdd:false,
    })  
    console.error("Error adding document: ", error);
      
  });
 
  }

  doDelete(index){
    let items = this.state.skills;
    
    const filteredItems = items.slice(0, index).concat(items.slice(index + 1, items.length))
    this.setState({
      skills:filteredItems
    })
    this.updateSkillDatabase(filteredItems);
     
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
        
      <Button  full primary style={{padding:10,}} onPress={()=>this.uploadSkill(this.state.newskill)}>
      <Text style={{color:'#fff'}}>Add</Text>  
    </Button>  
     )
   }
 }
   render(){
    const items = this.state.skills? this.state.skills.map((item,index)=>{
        return (
          <CardItem key={index} >
            <Left>
             <Text style={styles.textStyle}> {item} </Text>
            </Left>
            <Right>  
              <Button style={{paddingRight:10}} transparent onPress={()=>this.doDelete(index)}>
              <Icon name='trash' type="Ionicons"/>
              </Button>
            </Right>  
          </CardItem>

        );
      }):null ;

      return(
        <Container>
             <Header rounded transparent>

                <Left>
                <Button transparent primary onPress={()=>this.props.navigation.goBack()}>
                  
                  <Icon name='arrow-back' type='Ionicons' />
                    
                  </Button>

                  </Left>
                <Body>
                  <H3>{'Add Skills'}</H3>
                </Body>

                <Right>
                  <Button  transparent primary >
                  
                      <Icon name="search" />
                    
                  </Button>
                </Right>

              </Header>
              
             <ScrollView>
              <Card>
                

                  {items}

                
              </Card>
              <Card> 
              <CardItem>
                <Input
                  label = "Append New Skill"
                  value = {this.state.newskill}
                  placeholder = "eg: Electric Repair"
                  onChangeText = {(newskill) => this.setState({newskill})}
                />
              </CardItem>
              <CardItem>
                <Content>
                  {this._renderAddButton()}
                </Content>
              </CardItem>
              </Card>
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
      color :'#000',
      fontSize: 18,
      backgroundColor:'#fefefe',
      padding:5,
    },
    skillStyle:{
      textAlign:'center',
      
      alignSelf:'center',
      borderWidth:1,
      borderRadius:10,
      
      margin:5,
      borderColor:'blue'
    }
    
  });









