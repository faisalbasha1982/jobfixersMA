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

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth  = Dimensions.get('window').width;

// Styles

export default class NewScreen extends Component {

    render()
    {
        return(
                <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                  }}>
                <View style={{width: viewPortWidth, height: 50, flex: 1, backgroundColor: 'powderblue'}} />
                <View style={{width: viewPortWidth, height: 50, flex: 1, backgroundColor: 'skyblue'}} />
                <View style={{width: viewPortWidth, height: 50, flex: 1, backgroundColor: 'steelblue'}} />
                <View style={{width: viewPortWidth, height: 50, flex: 1, backgroundColor: 'powderblue'}} />
              </View>
        );
    }

}