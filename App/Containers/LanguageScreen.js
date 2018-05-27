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
  Alert,
  Platform
} from 'react-native';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "react-native-loading-spinner-overlay";
import DeviceInfo from 'react-native-device-info'
import * as Animatable from 'react-native-animatable';
import LanguageButton from '../Components/LanguageButton';
import CompanyBanner from '../Components/CompanyBanner';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from "../Themes";
import { Images } from '../Themes';
// Styles
import styles from './Styles/LanguageScreenStyles';

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

        <Text style={styles.selectText}> Choose your language! </Text>

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
            language={<Text style={{ fontFamily: 'worksans_light'}}>{LanguageSettings.dutch.languageText}</Text>}
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


