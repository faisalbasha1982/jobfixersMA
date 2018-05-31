import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Dimensions } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import { colors } from '../Themes/Colors';
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import LanguageSettings from '../Containers/LanguageSettingsNew';

const viewPortWidth = Dimensions.get('window').width;
const viewPortHeight = Dimensions.get('window').height;

let clanguage = '';

export default class ButtonValidation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validationText: '',
      language:'',
      backgroundColor: '',
    };
  }

  componentWillReceiveProps(nextProps)
  {

    if (nextProps.objectParams !== this.props.objectParams) {
      this.setState({
        validationText: nextProps.objectParams.btnText,
        language: nextProps.objectParams.language,
        backgroundColor: nextProps.objectParams.backgroundColor
      });

      clanguage = this.props.objectParams.language;
    }

  }

  componentDidMount()
  {
    console.log("received props from NewScreen ="+this.props.objectParams);
    console.log("received props from NewScreen language ="+this.props.objectParams.language);
    console.log("received props from NewScreen backgroundColor ="+this.props.objectParams.backgroundColor);
    clanguage = this.props.objectParams.language;

    this.setState({ 
                    validationText: this.props.objectParams.btnText, 
                    language: this.props.objectParams.language,
                    backgroundColor: this.props.objectParams.backgroundColor
                });
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
        onPress={() => this.somethingElse() }
          activeOpacity={0.5}
          style={{
            width: 284,
            height: 71,
            marginBottom: 17,
            marginLeft: 8,
            borderRadius: 8,
            backgroundColor: (this.state.backgroundColor==='normal')?'#d0021b':'transparent',
            marginTop: viewPortHeight / 80,            
        }}>
        <Text
            style={{
                fontSize: 16,
                width: 290,
                height: 38,
                fontFamily: 'WorkSans-Thin',
                fontWeight: '300',
                fontStyle: 'normal',
                color: '#ffffff',
                marginTop: 20,                
                letterSpacing: 0,
                textAlign: 'center'}}
        > {this.state.validationText}</Text>
        </TouchableOpacity>
      );
  }
}

ButtonValidation.propTypes = {
    objectParams: PropTypes.object.isRequired
}

