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
import { Container, Header, Content, Input, Item } from 'native-base';
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

export default class FormOne extends Component {

    constructor(props)
    {
        super(props);        
    }

    state = {
        language: 'NEDERLANDS',
        firstName:'',
        name:'',
        phoneNumber:'',
        firstNameInput:'',
        lastNameInput:'',
        phoneNumberInput:'',
        buttonText: '',
    };

    componentWillReceiveProps(props) {
        if (this.state.language !== this.props.language) {
            this.setState({ language: this.props.language });
            this.setText();
        }
    }

    componentDidMount() {
        console.log("default language="+this.state.language);
        this.setState({ language: this.props.language });
        console.log("language="+this.state.language);
        this.setText();
        console.log("this.state.firstName="+this.state.firstName);
        console.log("this.state.buttonText="+this.state.buttonText);
    }

    setText = async () => {

        console.log("this.state.language="+this.state.language);

        if (this.state.language === 'NEDERLANDS') {
            console.log("setting in Nederlands");
            this.setState({
                firstName:  LanguageSettings.dutch.firstNameText,
                name:       LanguageSettings.dutch.lastNameText,
                phoneNumber: LanguageSettings.dutch.telephoneNumberText,
                buttonText: LanguageSettings.dutch.buttonNextText
            });
        }
        else
            if (this.state.language === 'ENGLISH') {
                console.log("setting in English");
                this.setState({
                    firstName:  LanguageSettings.english.firstNameText,
                    name: LanguageSettings.english.lastNameText,
                    phoneNumber: LanguageSettings.english.telephoneNumberText,
                    buttonText: LanguageSettings.english.buttonNextText
                });
            }
            else
              {
                console.log("setting in French");
                this.setState({
                    firstName:  LanguageSettings.french.firstNameText,
                    name: LanguageSettings.french.lastNameText,
                    phoneNumber: LanguageSettings.french.telephoneNumberText,
                    buttonText: LanguageSettings.french.buttonNextText
                });
            }
    
       
    }

    render() {
        return (
            <View style={newStyle.container}>

                <View style={newStyle.headerImage}>
                    <Image source={logoNew} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .45 }} />
                </View>

                <View style={newStyle.inputContainer}>

                    <Text style={newStyle.firstName}>{this.state.firstName}</Text>
                    <TextInput
                        style={ newStyle.nameInput}
                        placeholder=''
                        onChangeText= { (firstNameInput) => this.setState({firstNameInput}) }
                    />

                    <Text style={newStyle.firstName}>{this.state.name}</Text>
                    <TextInput
                        style={ newStyle.nameInput}
                        placeholder=''
                        onChangeText= { (lastNameInput) => this.setState({lastNameInput}) }
                    />

                    <Text style={newStyle.firstName}>{this.state.phoneNumber}</Text>
                    <TextInput
                        style={ newStyle.nameInput}
                        placeholder=''
                        onChangeText= { (phoneNumberInput) => this.setState({phoneNumberInput}) }
                    />                

                </View>

                <View style={newStyle.buttons}>
                    <ButtonWelcome text={LanguageSettings.dutch.buttonNextText} />
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
        height: viewPortHeight * 0.50,
        flex: 8,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        backgroundColor: 'white',
        marginTop: 25,
        padding: 20,
        flex: 12
    },

    firstName: {
        width: 159,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: 15
    },

    nameInput: {
        width: 334,
        height: 57,
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        marginBottom: 15,
        padding: 10,
    },

    buttons: {
        width: viewPortWidth,
        height: 20,
        flex: 2,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 25,
        marginBottom:  10,
        marginTop: 10,
    },

});

FormOne.propTypes = {
    language: PropTypes.string.isRequired
}