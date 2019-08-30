import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';


class ListItem extends Component {
  

  render() {
   console.log(this.props.library.title);

    return (
        <View>
          <CardSection>
              {this.props.library.description}
            
          </CardSection>
        </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 22,
    paddingLeft: 15,
    justifyContent: 'center',
    backgroundColor: 'blue',
  
  },
  descriptionStyle: {
    paddingLeft: 10,
    paddingRight: 10
  }
};

export default ListItem;