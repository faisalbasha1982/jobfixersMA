import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import { colors } from '../Themes/Colors';

const viewPortWidth = Dimensions.get('window').width;
const viewPortHeight = Dimensions.get('window').height;

export default class LanguageButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languageText: '',
    };
  }

  setlanguage = (language) => {
      
  }

  //         width: (viewPortWidth * 41) / 46,
 // height: viewPortHeight / 11,
 

  render() {
      return (
        <Button
          onPress={this.setlanguage}
          activeOpacity={0.5}
          style={{
            height: "8.5%",
            width: "92.1%",
            backgroundColor: '#E73D50',
            marginTop: viewPortHeight / 80,            
        }}
        >
         {this.props.language !== "NEDERLANDS"?
                   <Text
                   style={{
                   fontSize: 16,
                   width: 375,
                   height: 19,
                   fontFamily: 'Helvetica',
                   fontWeight: '500',
                   fontStyle: 'normal',
                   color: '#ffffff',
                   letterSpacing: 0,
                   marginLeft: 110,
                   textAlign: 'left'
                 }}
                 > {this.props.language}
                 </Text>:
            <Text
            style={{
            fontSize: 16,
            width: 375,
            height: 19,
            fontFamily: 'Helvetica',
            fontWeight: '500',
            fontStyle: 'normal',
            color: '#ffffff',
            letterSpacing: 0,
            marginLeft: 95,
            textAlign: 'left'
          }}
          > {this.props.language}
          </Text>}
        </Button>
      );
  }
}

LanguageButton.PropTypes = {
    language: PropTypes.string.isRequired
}