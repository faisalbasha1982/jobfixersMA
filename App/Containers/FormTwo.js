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
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Feather';
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

export default class FormTwo extends Component {

    constructor(props)
    {
        super(props);        

        this.state = {
            language: 'NEDERLANDS',
            workText: '',
            postalCode: '',
            policyText: '',
            buttonText: '',
            checked: false,
        };
    
    }

    somethingElse = () => {

    }

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
                workText:  LanguageSettings.dutch.workText,
                postalCode: LanguageSettings.dutch.postalCodeText,
                policyText: LanguageSettings.dutch.policyText,
                buttonText: LanguageSettings.dutch.buttonTextJob
            });
        }
        else
            if (this.state.language === 'ENGLISH') {
                console.log("setting in English");
                this.setState({
                    workText:  LanguageSettings.english.workText,
                    postalCode: LanguageSettings.english.postalCodeText,
                    policyText: LanguageSettings.english.policyText,
                    buttonText: LanguageSettings.english.buttonTextJob
                    });
            }
            else
              {
                console.log("setting in French");
                this.setState({
                    workText:  LanguageSettings.french.workText,
                    postalCode: LanguageSettings.french.postalCodeText,
                    policyText: LanguageSettings.french.policyText,
                    buttonText: LanguageSettings.french.buttonTextJob
                    });
            }
    
       
    }

    render() {
        const myIcon = (<Icon name="angle-left" size={30} color="#900" />);
        var bt = LanguageSettings.dutch.buttonTextJob;
        return (
            <View style={newStyle.container}>

                <View style={newStyle.headerImage}>
                    <Image source={logoNew} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .45 }} />
                </View>

                <View style={newStyle.inputContainer}>
                    <Text style={newStyle.firstName}>{this.state.workText}</Text>
                    <View style= {newStyle.firstInputsBox}>
                        <TextInput
                            style={ newStyle.firstInput}
                            placeholder=''
                            onChangeText= { (firstNameInput) => this.setState({firstNameInput}) }
                        />
                        <TouchableOpacity onPress={() => this.somethingElse()}
                            activeOpacity={0.5}
                            style={newStyle.iconStyleNew}>
                            <Icon
                                containerStyle={newStyle.iconImageStyle}                               
                                name='angle-down'
                                type='font-awesome'
                                color='#000'
                                size = {40}
                                onPress={() => console.log('hello')} /> 

                        </TouchableOpacity>
                    </View>
                    

                    <Text style={newStyle.postalName}>{this.state.postalCode}</Text>
                    <TextInput
                        style={ newStyle.nameInput}
                        placeholder=''
                        onChangeText= { (lastNameInput) => this.setState({lastNameInput}) }
                    />

                    <View style={newStyle.policyStyle}> 
                    <CheckBox  
                                title=''  
                                checked={this.state.checked}
                                checkedColor='red'
                                containerStyle={newStyle.checkBoxStyle}
                                onPress={() => this.setState({checked: !this.state.checked})}
                                />
                        <Text style={newStyle.policyTextStyle}>
                            {this.state.policyText}
                        </Text>                    
                    </View>
                </View>

                <View style={newStyle.buttons}>
                    <TouchableOpacity onPress={() => this.somethingElse()}
                        activeOpacity={0.5}
                        style={newStyle.iconStyle}>
                            <Icon
                                containerStyle={newStyle.iconImageStyle}                               
                                name='angle-left'
                                type='font-awesome'
                                color='#fff'
                                size = {40}
                                onPress={() => console.log('hello')} /> 
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.somethingElse()}
                        activeOpacity={0.5}
                        style={newStyle.buttonStyle}>
                        <Text style={newStyle.buttonTextStyle}>
                                {LanguageSettings.dutch.buttonTextJob.toUpperCase()}
                        </Text>
                    </TouchableOpacity>

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
        flex: 13,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    firstInputsBox: {
        width: viewPortWidth,
        height: 70,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',                
        marginBottom: 10,        
    },

    inputContainer: {
        backgroundColor: 'white',
        marginTop: 20,
        padding: 15,
        paddingTop: 15,
        flex: 18,
        height: 200,
    },

    iconStyle: {
        width: 57,
        height: 57,
        borderRadius: 8,
        backgroundColor: '#fad704',
        marginTop: viewPortHeight / 80,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconStyleNew: {
        width: 57,
        height: 57,
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconStyleText: {
        width: 14,
        height: 34,
        fontFamily: 'FontAwesome',
        fontSize: 34,
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: '#ffffff',
        letterSpacing: 1.42,
        textAlign: 'center'
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
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 15,
    },

    postalName:{
        width: 159,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginLeft: 15,
        marginBottom: 10,
    },

    firstInput: {
        width: 270,
        height: 57,
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        padding: 10,
    },

    nameInput: {
        width: 334,
        height: 57,
        borderRadius: 8,
        backgroundColor: '#f6f6f6',
        marginBottom: 15,
        padding: 10,
        marginLeft: 15,
    },

    buttons: {
        width: viewPortWidth,
        height: 50,
        flex: 8,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',        
    },

    buttonStyle: {
        width: 266,
        height: 57,
        borderRadius: 8,
        backgroundColor: '#e73d50',
        marginTop: viewPortHeight / 80,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonTextStyle: {
        width: 266,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        color: '#ffffff',
        letterSpacing: 0.67,
        textAlign: 'center'
    },

    checkBoxStyle: {
        width: 25,
        height: 30,
        backgroundColor: 'white',
        borderColor: 'white',
        padding: 0,

    },

    policyStyle: {
        width: viewPortWidth,
        height: 105,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 10,
        paddingLeft: 5
        
    },

     policyTextStyle: {
         width: 310,
         height: 85,
         fontFamily: 'WorkSans-Regular',
         fontSize: 16,
         fontWeight: 'normal',
         fontStyle: 'normal',
         letterSpacing: 0,
         textAlign: 'left',
         marginTop: 5,
         padding: 0,
     },

     iconImageStyle:{
         backgroundColor: 'black',
         width: 50,
         height: 50
     }

});

FormTwo.propTypes = {
    language: PropTypes.string.isRequired
}