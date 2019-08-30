// Import libraries for making a component
import React from 'react';
import { Text, View ,Dimensions,ScrollView } from 'react-native';

import {Thumbnail , Card ,Button } from 'native-base';
 
import firebase from 'firebase';
// Make a component
const screenWidth = Math.round(Dimensions.get('window').width);
const SLIDER_1_FIRST_ITEM = 1;
class HorizontalSlider extends React.Component  {
 constructor(props){
     super(props);
 }
 state = {
    entries:  [
   {
       title: 'Ram Sharma',
       occupation: 'Student',
       profile: 'https://i.imgur.com/UYiroysl.jpg'
   },
   {
       title: 'Prithvi Narayan Shah',
       occupation: 'Plumber',
       profile: 'https://i.imgur.com/UPrs1EWl.jpg'
   },
   {
       title: 'Bhrikuti Maicha',
       occupation: 'Beautician',
       profile: 'https://i.imgur.com/MABUbpDl.jpg'
   },
   {
       title: 'Niroj Shrestha',
       occupation: 'Graphic Designer',
       profile: 'https://i.imgur.com/KZsmUi2l.jpg'
   }

]

}

componentDidMount(){
    this.fetchUsers();
}


fetchUsers(){
    const db = firebase.firestore();
    
    let citiesRef = db.collection('users]');
    let query = citiesRef.orderBy('firstname','desc').limit(8).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }  
      const users=[];
      snapshot.forEach(doc => {
        
        console.log(doc.id, '=>', doc.data());
      
            
             
            users.push({
                    key:doc.id,
                    firstname:doc.data().firstname,
                    lastname:doc.data().lastname,
                    occupation:doc.data().occupation,
                    email:doc.data().email,
                    profile:doc.data().profile
                  });
      })
       
      
      
      this.setState({
          entries:users,
          loading:false,
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
        Alert.alert('error');
      });
  
  }
  

sampleFunction()  {
    this.props.UserClickHandler();
  }

 _renderItem () {
    
    return (
        <ScrollView horizontal >

        { this.state.entries.map((item,key) => (
        <View  key={key} style={styles.viewStyle}>
            
           <Thumbnail large source={{uri: item.profile}} />
            <Text style={styles.title}>{ item.firstname+' '+item.lastname }</Text>
            
            <Text style={styles.occupation}>{ item.occupation }</Text>
            <Button full primary style={ styles.buttonStyle}
                onPress={()=>this.sampleFunction()}
            >
            <Text style={{color:"#fff",fontFamily:'times'}}> Connect </Text></Button>
        </View>
        ))}
         
    </ScrollView>
    );
}


  render(){
  return (
     <View>
        <Card>
            {this._renderItem()}
        </Card>
        
     </View>    
  );
};
};

const styles = {
  
  viewStyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom:0,
    paddingTop: 15,
    height:200,
    paddingLeft:0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 2,
    margin:10,
    position: 'relative'
  },
  buttonStyle:{
    marginTop:10,
  },
  title: {
    padding: 10,
    marginTop:10,
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
},
occupation: {
    marginTop: 5,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    color: 'gray',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center'
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
};

// Make the component available to other parts of the app
export default HorizontalSlider;