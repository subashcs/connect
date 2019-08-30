import React, {Component}  from 'react';
import { ScrollView,Modal, Text, TouchableHighlight, View, Alert} from 'react-native';

import { CheckBox } from 'react-native-elements';
import { CardItem,Header,Content,Button , Body, Right , Left , H3  ,Icon , } from 'native-base';


export default class SelectBusiness extends React.Component{
    constructor(props){
        super(props);
    }

    state={
        modalVisible:false,
        checked:true,
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    
      render(){
        return(
            <View style={{marginTop: 22}}>
                 
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Business Selected.');
                }}>

                <View>
                        <Header transparent>
                            
                        <Left>
                        <Button transparent primary  onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                            }}>

                        <Icon name='arrow-back' type='Ionicons' />
                            
                        </Button>

                        </Left>
                            
                        <Right>
                        <H3>{'Choose Business'}</H3>
                        </Right>
                        </Header>
                    <ScrollView >
                        
                        
                        <CheckBox
                        center
                        title='IT Glance Pvt. Ltd.'  
                        checked={this.state.checked}
                        />
                        <CheckBox
                        center
                        title='Gayatri Hardwares'    
                        checked={this.state.checked}
                        />
                        <CheckBox
                        center
                        title='Mahesh Electronics'   
                        checked={this.state.checked}
                        />
                        <CheckBox
                        center
                        title='Ghar Architects'      
                        checked={this.state.checked}
                        />

                        <CheckBox
                        center
                        title='Mango Fresh Juice center'      
                        checked={this.state.checked}
                        />
                        <CheckBox
                        center
                        title='Sunrise Bank'      
                        checked={this.state.checked}
                        />
                        <CheckBox
                        center
                        title='Kumari Bank'      
                        checked={this.state.checked}
                        />
                     </ScrollView>

                    
                </View>

                </Modal>

                <Button full light
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text style={{padding:10,color:'#000'}}>Select Business</Text>
                </Button>
            </View>
                   
    );
}
}