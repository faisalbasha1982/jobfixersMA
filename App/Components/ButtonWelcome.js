import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Dimensions } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import { colors } from '../Themes/Colors';
import LanguageSettings from '../Containers/LanguageSettingsNew';

const viewPortWidth = Dimensions.get('window').width;
const viewPortHeight = Dimensions.get('window').height;

export default class ButtonWelcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  componentDidMount()
  {
    console.log("received prop="+this.props.text);
    this.setState({ text: this.props.text });
  }

  setlanguage = () => {
  }

  somethingElse = () => {

  }

 // width: (viewPortWidth * 41) / 46,
 // height: viewPortHeight / 11,
 
  render() {
      return (
        <TouchableOpacity
          onPress={() => this.somethingElse()}
          activeOpacity={0.5}
          style={{
            width: 333,
            height: 57,
            marginBottom: 17,
            marginLeft: 8,
            borderRadius: 8,
            backgroundColor: '#E73D50',
            marginTop: viewPortHeight / 80,            
        }}>
        <Text
            style={{
                fontSize: 17,
                width: 333,
                height: 19,
                fontFamily: 'WorkSans-Regular',
                fontWeight: '500',
                fontStyle: 'normal',
                color: '#ffffff',
                marginTop: 20,                
                letterSpacing: 0.67,
                textAlign: 'center'}}
        > {this.state.text.toUpperCase()}</Text>
        </TouchableOpacity>
      );
  }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
}