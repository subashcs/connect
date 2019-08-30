import React, {Component} from 'react';
import { 
        Platform,
        StyleSheet, 
        View,
        ScrollView
      } from 'react-native';
      

import firebase from 'firebase';

import { Content ,Left, Right, Card , CardItem ,Body ,Text } from 'native-base';

class Details extends React.Component{
    constructor (props) {
        super(props);
        
      }
    _renderItem() {
     
      switch (this.props.forwhom) {
        case 'business':

          return (
            <CardItem style={{borderBottomWidth:1,borderBottomColor:'#000',backgroundColor:'transparent'}} >
                   <Left>
                   <Content >
                   <Text style ={{textAlign:'left',fontSize:14,}}>Address for {this.props.id}:  </Text>
                  
                   </Content>
                    
                </Left>
                <Right>
                   <Content>
                   <Text style = {{textAlign:'left',fontSize:13}}> Ram Shah Path, Putalisadak Kathmandu</Text>
                  
                   </Content>
                   
                </Right>
            </CardItem> 
           );

        case 'user':
            const items = this.props.skills.map(function(item,index){
              return (
                <Text style ={styles.skillStyle} key={index}> {item} </Text>
            
    
              );
            });
          return(
            <View>
            <CardItem style={{borderBottomWidth:1,borderBottomColor:'#000',backgroundColor:'transparent'}} >
              
             <Left>
                   <Content >
                   <Text style ={{textAlign:'left',fontSize:14,}}> Address :  </Text>
                  
                   </Content>
                    
                </Left>
                <Right>
                   <Content>
                   <Text style = {{textAlign:'left',fontSize:14}}>{this.props.address}</Text>
                  
                   </Content>
                   
                </Right>

          </CardItem>
          <CardItem style={{borderBottomWidth:1,borderBottomColor:'#000',backgroundColor:'transparent'}} >
              
            <Left>
                <Text style ={{textAlign:'left',fontSize:19,}}>Skills :  </Text>
             </Left>
             <Right>
                
             </Right>
           
         </CardItem>
         <CardItem>
           <ScrollView horizontal>
            {items}
            </ScrollView>
         </CardItem>
         <CardItem style={{borderBottomWidth:1,backgroundColor:'transparent'}}>
               
               <Left>
                   <Content >
                   <Text style ={{textAlign:'left',fontSize:14,}}>Occupation :  </Text>
                  
                   </Content>
                    
                </Left>

                <Right>
                   <Content>
                   <Text style = {{textAlign:'left',fontSize:14,}}> {this.props.occupation}</Text>
                  
                   </Content>
                   
                </Right>

        </CardItem>
           
    
         </View> 
          );
        default:
          return (<View><Text>{'Default'}</Text></View>);  
      }

    }
    
    render(){
        
        return(
            
            <Content style={{paddingLeft:40,paddingRight:20, backgroundColor:'#f2f2f2'}}>
              
                {this._renderItem()}

             <CardItem style={{borderBottomWidth:1,backgroundColor:'transparent'}}>
               
               <Left>
                   <Content >
                   <Text style ={{textAlign:'left',fontSize:14,}}>Phone :  </Text>
                  
                   </Content>
                    
                </Left>

                <Right>
                   <Content>
                   <Text style = {{textAlign:'left',fontSize:14,}}> {this.props.phone[0]}</Text>
                  
                   </Content>
                   
                </Right>

              </CardItem>
              

                </Content>
            
          
        );
    }
}

const styles= StyleSheet.create({
  skillStyle:{
    textAlign:'center',
    fontSize:14,
    alignSelf:'center',
    borderWidth:1,
    borderRadius:10,
    padding:5,
    margin:5,
    borderColor:'blue'
  }
})

export default Details;