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
      languageText: LanguageSettings.dutch.buttonText,
    };
  }

  componentDidMount()
  {
    if(this.props.language === 'NEDERLANDS')    
       this.setState({ languageText: LanguageSettings.dutch.buttonText });
  else
      if(this.props.language === 'ENGLISH')    
        this.setState({ languageText: LanguageSettings.english.buttonText });
      else
        this.setState({ languageText: LanguageSettings.french.buttonText });
  }

  setlanguage = () => {

    console.log("language=",this.props.language);


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
        > {this.state.languageText.toUpperCase()}</Text>
        </TouchableOpacity>
      );
  }
}

Button.propTypes = {
    language: PropTypes.string.isRequired
}