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

class ButtonNext extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      language:'',
      firstName:'',
      lastName: '',
      phoneNumber:'',
      firstNameError: false,
      lastNameError: false,
      phoneNumberError: false,
      firstNameEmpty: false,
      lastNameEmpty: false,
      phoneNumberEmpty: false,      
    };
  }

  componentWillReceiveProps(nextProps)
  {

    if (nextProps.objectParams !== this.props.objectParams) {
      this.setState({
        text: nextProps.objectParams.btnText,
        language: nextProps.objectParams.language,
        firstName: nextProps.objectParams.firstName,
        lastName: nextProps.objectParams.lastName,
        phoneNumber: nextProps.objectParams.phoneNumber,
        firstNameError: nextProps.objectParams.firstNameError,
        lastNameError: nextProps.objectParams.lastNameError,
        phoneNumberError: nextProps.objectParams.phoneNumberError,
        firstNameEmpty: this.props.objectParams.firstNameEmpty,
        lastNameEmpty: this.props.objectParams.lastNameEmpty,
        phoneNumberEmpty: this.props.objectParams.phoneNumberEmpty
      });

      clanguage = this.props.objectParams.language;
    }

  }

  componentDidMount()
  {
    console.log("received props from NewScreen ="+this.props.objectParams);
    console.log("received props from NewScreen language ="+this.props.objectParams.language);
    clanguage = this.props.objectParams.language;

    this.setState({ 
        text: this.props.objectParams.btnText, 
        language: this.props.objectParams.language,
        firstName: this.props.objectParams.firstName,
        lastName: this.props.objectParams.lastName,
        phoneNumber: this.props.objectParams.phoneNumber, 
        firstNameError: this.props.objectParams.firstNameError,
        lastNameError: this.props.objectParams.lastNameError,
        phoneNumberError: this.props.objectParams.phoneNumberError,
        firstNameEmpty: this.props.objectParams.firstNameEmpty,
        lastNameEmpty: this.props.objectParams.lastNameEmpty,
        phoneNumberEmpty: this.props.objectParams.phoneNumberEmpty            
    });
  }

  setlanguage = () => {
  }

  somethingElse = () => {

    if(this.state.language === 'ENGLISH')
        this.props.func(true,LanguageSettings.english.EmptyErrorText);
    else
      if(this.state.language === 'NEDERLANDS')
          this.props.func(true,LanguageSettings.dutch.EmptyErrorText);
      else
          this.props.func(true,LanguageSettings.french.EmptyErrorText);
           
    console.log("firstNameError:"+this.state.firstNameError);
    console.log("lastNameError:"+this.state.lastNameError);
    console.log("phoneNameError:"+this.state.phoneNumberError);

  }

 // width: (viewPortWidth * 41) / 46,
 // height: viewPortHeight / 11,
 
  render() {
      return (
        <TouchableOpacity
        onPress={() => 
          (!this.state.firstNameError && 
          !this.state.lastNameError && 
          !this.state.phoneNumberError)?this.props.onButtonPress(this.state.text,clanguage,this.state.firstName,this.state.lastName,this.state.phoneNumber):this.somethingElse() }
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

ButtonNext.propTypes = {
    text: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {

    resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
    navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
    navigateBack: () => dispatch(NavigationActions.back()),
    onButtonPress: (text,language,firstName,lastName,phoneNumber) => dispatch(NavigationActions.navigate({routeName: 'FormTwo',params: {objectParams: {
        text: text,
        language: language,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,      
    } }})),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonNext);