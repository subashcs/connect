import React, { Component } from 'react';
import { Image ,View ,Alert,TouchableOpacity , Dimensions ,StyleSheet} from 'react-native';
import { Container,  Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base';
import firebase from 'firebase';

export default class Post extends Component {
  constructor(props){
    super(props);
  }
  state = {
    postmenu :false,
    showpostmenu:false,
  }
  componentDidMount(){
    if(this.props.username==firebase.auth().currentUser.email){
      this.setState({
        showpostmenu:true,
      })
    }
  }
 
  getWidth(){
  return  width = Dimensions.get('window').width;  
 } 
 
 deletePost(key){
   const db= firebase.firestore();
   db.collection('campaign').doc(key).delete().then(()=>{
    
    Alert.alert('post deleted');

   })
   .catch((err)=>{

     Alert.alert('Could not delete');
   })
 }
getData(){
  this.props.getData();
}

 _renderPostMenu(){
  if(this.state.showpostmenu){
      if(this.state.postmenu == true){ 
          return(
          <View>
          <CardItem >
              <TouchableOpacity transparent 
                  onPress={()=>this.toggleMenu()}
              >
                <Icon name='close-circle' type='Ionicons'/>           
              </TouchableOpacity>
          </CardItem>
            
          <CardItem style={{borderWidth:1,borderColor:'#000',}}>
              <TouchableOpacity transparent 
                     onPress={()=>this.deletePost(this.props.id)}
              >
               <Icon name='trash' type='Ionicons' />
             </TouchableOpacity>
          </CardItem>
          <CardItem style={{borderWidth:1,borderColor:'#000',}}><Icon name='create' type='Ionicons'/></CardItem>
          </View>
        );
      }
      else{
        return(
          <View>
            
            <TouchableOpacity
                onPress={()=>this.toggleMenu()}
                style={{padding:10}}
              >
              <Icon name='more' type='Ionicons'/>
                          
            </TouchableOpacity>
          
          </View>
        );
      }
  }
  else{
    return;
  }

 }


 toggleMenu(){
  if (this.state.postmenu == false) 
    {
       this.setState({postmenu:true}); }
   else 
   {
     this.setState({postmenu:false})
    }
    
} 
_renderPostImage(){
    if(this.props.image && this.props.image!=''){
      return(
     
        <CardItem cardBody>
        <Image source={{uri:this.props.image}} style={styles.image}/>
      
        </CardItem>
      )      
  }
  else{
    return ;
  } 
  
}
 render() {
    
    return (
      <View >
        
        <Content>
          <Card style={{flex: 0,zIndex:0}}>
            <CardItem style={{zIndex:1}}>
              <Left style={{justifyContent:'center',textAlign:'center',}}>
                <Thumbnail source={this.props.avatarURL} />
                <Body>
                  <Text>{this.props.username}</Text>
                  <Text note>{this.props.date}</Text>
                  <Text note >{this.props.category}</Text>
                </Body>
                
              </Left>
              
              <Right>
                <Card style={{position:'absolute',marginTop:-25, marginRight:-10,zIndex:2}}>
                  
                  
                  {this._renderPostMenu()}
                 </Card>
              </Right>
            </CardItem>
              {this._renderPostImage()}
            <CardItem >
                  <Text>{this.props.text}</Text>              
          </CardItem>

            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="eye"  type="Ionicons"/>
                  <Text>{this.props.views} views</Text>
                </Button>
              </Left>
              <Right>
                <Button transparent textStyle={{color: '#87838B' }} onPress={()=> this.props.messageNav(this.props.username)}>
                  <Icon name="paper" />
                  <Text>Message</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  
  image: {
       width :null,
       height:200,
       flex:1,

    },
});