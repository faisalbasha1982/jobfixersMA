import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  PixelRatio,
  Alert
} from 'react-native';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "react-native-loading-spinner-overlay";
import DeviceInfo from 'react-native-device-info'
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import LanguageButton from '../Components/LanguageButton';
import CompanyBanner from '../Components/CompanyBanner';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from "../Themes";
import { Images } from '../Themes';
// Styles
import styles from './Styles/LaunchScreenStyles';

const viewPortHeight = Dimensions.get('window').height;

export default class LanguageScreen extends Component 
{
    constructor(props){
        super(props);
    }

    state = {

    }

    render()
    {

        return(

        <KeyboardAwareScrollView
        ref={(ref) => { this.keyboardAvoidView = ref; }}>
        
        <CompanyBanner />

        <Text style={{            
             width: "89.1%",
             height: "6.9%",
             flex: 6,
             height: 46,
             fontSize: 30,
             fontWeight: '500',
             color: 'black',
             fontStyle: 'normal',
             lineHeight: 46,
             letterSpacing: 0,
             textAlign: 'center'
        }}> 
        Choose your language! 
        </Text>

        <Animatable.View
          animation="fadeIn"
          delay={1900}
          duration={1000}
          style={{ flex: 7, 
                   marginLeft: 20,
                   flexDirection: 'column', 
                   alignItems: 'flex-start', 
                   justifyContent: 'center', 
                   height: viewPortHeight, 
                }}>

          <LanguageButton
            language={LanguageSettings.dutch.languageText}
          />

          <LanguageButton
            language={LanguageSettings.french.languageText}
          />

          <LanguageButton
            language={LanguageSettings.english.languageText}
          />



        </Animatable.View>
      </KeyboardAwareScrollView>
      );
    }
}