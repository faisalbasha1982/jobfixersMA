import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import { colors } from '../Themes/Colors';
import WelcomeScreen from '../Containers/WelcomeScreen';
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';

const viewPortWidth = Dimensions.get('window').width;
const viewPortHeight = Dimensions.get('window').height;

class LanguageButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languageText: '',
    };
  }

  setlanguage = () => {

    // navigate('WelcomeScreen', {language: this.props.language})
  }

  //         width: (viewPortWidth * 41) / 46,
  // height: viewPortHeight / 11,

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        onPress={() => { this.setlanguage }}
        activeOpacity={0.5}
        style={{
          height: "20.5%",
          width: "92.1%",
          marginBottom: 17,
          marginLeft: 15,
          backgroundColor: '#E73D50',
          marginTop: viewPortHeight / 80,
        }}
      >
        {this.props.language !== "NEDERLANDS" ?
          <Text
            style={{
              fontSize: 16,
              width: 375,
              height: 19,
              fontFamily: 'Worksans-Medium',
              fontWeight: '500',
              fontStyle: 'normal',
              color: '#ffffff',
              letterSpacing: 0,
              marginLeft: 110,
              textAlign: 'left'
            }}
          > {this.props.language}
          </Text> :
          <Text
            style={{
              fontSize: 16,
              width: 375,
              height: 19,
              fontFamily: 'Worksans-Medium',
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

LanguageButton.propTypes = {
  language: PropTypes.string.isRequired
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

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageButton);