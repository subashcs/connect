// Import libraries for making a component
import React from 'react';
import { Alert, ScrollView ,Text, View ,ImageBackground, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Card ,Content, Button } from 'native-base';
import BusinessProfile from '../../screens/BusinessProfile';
import firebase from 'firebase';
 
// Make a component
const screenWidth = Math.round(Dimensions.get('window').width);
const SLIDER_1_FIRST_ITEM = 1;
class RecommendedBusinessSlider extends React.Component  {
 constructor(props){
    super(props);
 }

 
 state = {
    entries:  [
   {
       title: 'Beautiful and dramatic Antelope Canyon',
       address: 'Student',
       cover: 'https://i.imgur.com/UYiroysl.jpg'
   },
   {
       title: 'Earlier this morning, NYC',
       address: 'Architect Engineer',
       cover: 'https://i.imgur.com/UPrs1EWl.jpg'
   },
   {
       title: 'White Pocket Sunset Hello World',
       address: 'Pilot ',
       cover: 'https://i.imgur.com/MABUbpDl.jpg'
   },
   {
       title: 'Acrocorinth, Greece',
       address: 'Plumber',
       cover: 'https://i.imgur.com/KZsmUi2l.jpg'
   },
   {
       title: 'The lone tree, majestic landscape of New Zealand',
       address: 'Cleaner',
       cover: 'https://i.imgur.com/2nCt3Sbl.jpg'
   },
   {
       title: 'Middle Earth, Germany',
       address: 'Doctor',
       cover: 'https://i.imgur.com/lceHsT6l.jpg'
   }
]
};

componentDidMount(){
  this.fetchBusinesses();
}

fetchBusinesses(){
  const db = firebase.firestore();
  
  let citiesRef = db.collection('business');
  let query = citiesRef.orderBy('title','desc').limit(8).get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
    const businesses=[];
    snapshot.forEach(doc => {
      
      console.log(doc.id, '=>', doc.data());
    
          
           
          businesses.push({
                  key:doc.id,
                  title:doc.data().title,
                  owner:doc.data().owner,
                  phone:doc.data().phone,
                  cover:doc.data().cover,
                  address:doc.data().address
                });
    })
     
    
    
    this.setState({
        entries:businesses,
        loading:false,
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
      Alert.alert('error');
    });

}

sampleFunction()  {
  this.props.BusinessClickHandler();
}

 _renderItem () {
          
    return (
      <ScrollView horizontal >

      { this.state.entries.map((item,key) => (
         <View key={key} style={styles.viewStyle}>
           

         <ImageBackground source={{uri : item.cover}} style={styles.imageBackground}>
           <Content style ={styles.wrapText}>
                
                <Text style={styles.title}>{ item.title }</Text>
                
                <Text style={styles.address}>{ item.address }</Text>
                <Button full primary 
                        style={styles.buttonStyle}
                        onPress={()=>this.sampleFunction()} >
                          
                    <Text style={{color:"#fff",fontFamily:'times'}}> Details </Text>
                </Button>
          </Content>
         </ImageBackground>
        
        </View>
      ))}
         
    </ScrollView>
          
    );
}


  render(){
  return (
      <View>
        <Card>
            {this._renderItem(this.state.entries)}
        </Card>
        
     </View>      
  );
};
};

const styles = {
  imageBackground:{
    height:'100%',
    width:'100%',
  },
  viewStyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom:0,
    paddingTop: 15,
    height:180,
    width:250,
    paddingLeft:10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  wrapText:{
    backgroundColor:'#2196f352',
  },
  title: {
    padding: 10,
    marginTop:10,
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
},
address: {
    marginTop: 5,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center'
},
buttonStyle:{
  marginTop:10,
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
    shadowOpacity: 0.4,
    elevation: 2,
    justifyContent: 'flex-start',
    overflow: 'visible' // for custom animations
},
};

// Make the component available to other parts of the app
export default RecommendedBusinessSlider;