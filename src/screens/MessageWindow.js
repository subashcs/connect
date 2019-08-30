import React from 'react';
import {View ,Dimensions ,KeyboardAvoidingView } from 'react-native';

import {Card , Header ,CardItem ,Item, Left ,Input , Button ,Right ,Body ,Content ,H3,Text, Icon,Container} from 'native-base';

var {Dheight,width} = Dimensions.get('window');

class MessageWindow extends React.Component {

constructor(props){

  super(props);
  
}
static navigationOptions = {
    header:null,
  };

state = {
  messages: [],
  receiver:'Undefined User',
}
 componentDidMount(){
   this.getReceiver();
 }
  componentWillMount() {
    
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }


  getReceiver(){
    const receiver = this.props.navigation.getParam('userId','User');
    this.setState({
      receiver:receiver,
    })
  }

  _renderReceiver=()=>{
    return(
      
      <H3>{this.state.receiver}</H3>
    )
  }

  getMessage(){

  }
  putMessage(){

  }
  //i need to set bottom to up flow

  render() {
    return (
     <Container>
         <Header transparent>
                          <Left>
                              <Button light
                              onPress={() => {
                                this.props.navigation.navigate('Messaging')
                              }}>
                              <Icon name="arrow-round-back" type="Ionicons"/>
                            
                            </Button>
                          </Left>
                          <Body/>
                          <Right>
                            {this._renderReceiver()}
                          </Right>
                        </Header>

      
            <Card style={{justifyContent:'flex-end',height:'95%',}}>
              
              <CardItem >
                <Left >
                  <Text style={styles.MessageLeftStyle}>
                    {"Message in the Left"}
                  </Text>
                </Left>
                <Right>
                </Right>
                
              </CardItem>

              <CardItem>
                <Left>
                </Left>
            
                
                <Right >
                  <Text style={styles.MessageRightStyle}>
                    {"hello in the right" }
                  </Text>
                </Right>
              </CardItem>

              <CardItem>
                <Left>
                  <Text  style={styles.MessageLeftStyle}>
                    {"Message in the Left"}
                  </Text>
                </Left>
                <Right/>
                
              </CardItem>
              
            
            <KeyboardAvoidingView style={{paddingBottom:10,}}  behavior="padding" enabled>
              <CardItem style={{height:150,postion:'relative',
                            bottom:20,backgroundColor:'#fff',
                    }}>
              

              <Item rounded>
                <Input placeholder='Rounded Textbox'/>
              </Item>
              </CardItem>
                   
            </KeyboardAvoidingView>
            </Card>
        </Container>
        
    )
  }
}

const styles= {
  MessageLeftStyle:{
    color:'#fff',
    backgroundColor:'#673ab7',
    borderWidth:1,
    borderColor:'#000',
    padding:10,
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
    borderBottomLeftRadius:10,
    padding:10,
    margin:10,
  },
  MessageRightStyle:{
    color:'#fff',
    backgroundColor:'#673ab7',
    borderWidth:1,
    padding:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderTopLeftRadius:10,
    margin:5,
    borderColor:'#9e9e9ef7',
  }
};

export default MessageWindow;

