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
import LanguageButton from '../Components/LanguageButton';
import Spinner from "react-native-loading-spinner-overlay";
import DeviceInfo from 'react-native-device-info'
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import CompanyBanner from '../Components/CompanyBanner';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from "../Themes";
import { Images } from '../Themes';
import logo from '../Images/logoheader.png';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth  = Dimensions.get('window').width;

// Styles

export default class NewScreen extends Component {

    render()
    {
        return(
                <View style={newStyle.container}>
                    <View style={newStyle.logoContainer}>
                      <Image source={logo} resizeMode="contain" style={{ width:334, height: 66.7 }} />
                    </View>
                <View style={newStyle.languageTextContainer}>
                    <Text style={newStyle.languageText}> Choose your language!</Text>
                </View>
                <View style={newStyle.buttons}>
                      <LanguageButton language={LanguageSettings.dutch.languageText} />
                      <LanguageButton language={LanguageSettings.french.languageText} />
                      <LanguageButton language={LanguageSettings.english.languageText} />
                </View>
              </View>
        );
    }

}

const newStyle = StyleSheet.create({

    container: {
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
    },

    logoContainer: {
                width: viewPortWidth, 
                height: 50, 
                flex: 4, 
                backgroundColor: 'white', 
                justifyContent: 'center', 
                alignItems: 'center',
                marginTop: "18.6%"
    },

    languageTextContainer: {
                width: viewPortWidth, 
                height: 50, 
                flex: 2, 
                backgroundColor: 'white',
                justifyContent: 'flex-end'
    },
    languageText: {
                width: viewPortWidth,
                height: 46,
                fontFamily: 'worksans',
                fontSize: 30,
                fontWeight: "400",
                fontStyle: 'normal',
                lineHeight: 46,
                letterSpacing: 0,
                textAlign: Platform.os === 'ios'?'center':'left',
                marginLeft: Platform.os === 'ios'?15:5,
                marginTop: 15
    },

    buttons: {
                width: viewPortWidth * 0.98, 
                height: 87, 
                flex: 7, 
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 25,
                marginRight: 25,
                marginBottom: viewPortHeight * 0.10,
    },

});