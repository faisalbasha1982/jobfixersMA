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
import ButtonWelcome from '../Components/ButtonWelcome';
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

import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/logojobfixersNew.png';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

// Styles

export default class WelcomeScreen extends Component {

    constructor(props)
    {
        super(props);        
    }

    state = {
        language: 'NEDERLANDS',
        workText: '',
        moreText: '',
        randomText: '',
        buttonText: '',
    };

    componentWillReceiveProps(props) {
        if (this.state.language !== this.props.language) {
            this.setState({ language: this.props.language });
            this.setText();
        }
    }

    componentDidMount() {
        console.log("language="+this.state.language);
        this.setState({ language: this.props.language });
        this.setText();
    }

    setText = () => {

        if (this.state.language === 'NEDERLANDS') {
            this.setState({
                workText: LanguageSettings.dutch.welcomeTextRed,
                moreText: LanguageSettings.dutch.welcomeTextMore,
                randomText: LanguageSettings.dutch.welcomeTextGray,
                buttonText: LanguageSettings.dutch.buttonText
            });
        }
        else
            if (this.state.language === 'ENGLISH') {
                this.setState({
                    workText: LanguageSettings.english.welcomeTextRed,
                    moreText: LanguageSettings.dutch.welcomeTextMore,
                    randomText: LanguageSettings.english.welcomeTextGray,
                    buttonText: LanguageSettings.english.buttonText
                });
            }
            else
                this.setState({
                    workText: LanguageSettings.french.welcomeTextRed,
                    moreText: LanguageSettings.dutch.welcomeTextMore,
                    randomText: LanguageSettings.french.welcomeTextGray,
                    buttonText: LanguageSettings.french.buttonText
                });
    }

    render() {
        return (
            <View style={newStyle.container}>

                <View style={newStyle.headerImage}>
                    <Image source={logoNew} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .45 }} />
                </View>

                <View style={newStyle.logoContainer}>
                    <Image source={logoHeader} resizeMode="contain" style={{ width: viewPortWidth * 0.532, height: viewPortHeight * 0.06 }} />
                </View>

                <View style={newStyle.workingText}>
                    <Text style={newStyle.languageText}>{this.state.workText +'\n' + this.state.moreText}</Text>
                </View>

                <View style={newStyle.randomText}>
                    <Text style={newStyle.rText}> {this.state.randomText}</Text>
                </View>

                <View style={newStyle.buttons}>
                    <ButtonWelcome language={this.state.language} />
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

    headerImage: {
        width: viewPortWidth,
        height: viewPortHeight * 0.45,
        flex: 29,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoContainer: {
        width: viewPortWidth,
        height: 50,
        flex: 8,
        padding: 20,
        paddingBottom: 10,
        marginTop: 25,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    languageTextContainer: {
        width: viewPortWidth,
        height: 50,
        flex: 2,
        backgroundColor: 'white',
        justifyContent: 'flex-end'
    },

    workingText: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 5,
        flexDirection: 'column',
        height: viewPortHeight * 0.40,
        width: viewPortWidth,
        padding: 17,
        margin: 50,
    },

    languageText: {
        width: 316,
        height: 68,
        fontFamily: 'WorkSans-Regular',
        fontSize: 28,
        fontWeight: '500',
        color: '#e73d50',
        fontStyle: 'normal',
        lineHeight: 34,
        letterSpacing: 0,
        textAlign: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginLeft: 15,
        marginRight: 15,
    },

    randomText: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        flex: 8,
        flexDirection: 'column',
        marginTop: 10,
    },

    rText: {
        width: 276,
        height: 57,
        fontFamily: 'WorkSans-Medium',
        fontSize: 16,
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'center',
    },


    buttons: {
        width: viewPortWidth,
        height: 157,
        flex: 10,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 25,
        marginTop: 35,        
        marginBottom:  10,
        paddingTop: 20,
    },

});

WelcomeScreen.propTypes = {
    language: PropTypes.string.isRequired
}