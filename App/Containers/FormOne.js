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
    findNodeHandle,
} from 'react-native';
import { Container, Header, Content, Input, Item } from 'native-base';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ButtonNext from '../Components/ButtonNext';
import ButtonWelcome from '../Components/ButtonWelcome';
import LanguageButton from '../Components/LanguageButton';
import Spinner from "react-native-loading-spinner-overlay";
import DeviceInfo from 'react-native-device-info'
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import CompanyBanner from '../Components/CompanyBanner';
import Validation from '../Components/ButtonValidation';
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

let cLanguage = '';

export default class FormOne extends Component {

    static propTypes = {
        language: PropTypes.string.isRequired
    }

    constructor(props)
    {
        super(props);             

        this.state = {
            language: 'NEDERLANDS',
            firstName:'',
            name:'',
            phoneNumber:'',
            validation: false,
            firstNameInput:'',
            lastNameInput:'',
            phoneNumberInput:'',
            buttonText: '',
            firstNameError:true,
            lastNameError:true,
            phoneNumberError:true,
            ErrorText:'All Fields are Required!'
        };
    
    }

    validationLastName = (name) => {

        let reg = /^[a-zA-Z\s]+$/;

        console.log("last name="+name);

        if(name === '')
            this.setState({ lastNameError: true, ErrorText: 'Last Name is Required' });
        else
        {
            if(reg.exec(name))
            {
              this.setState({ lastNameError: false, lastNameInput: name });
            }
            else
            {
              if(this.state.language === 'NEDERLANDS')
                  this.setState({ lastNameError: true, ErrorText: LanguageSettings.dutch.LNameErrorText });
              else
                  if(this.state.language === 'ENGLISH')
                      this.setState({ lastNameError: true, ErrorText: LanguageSettings.english.LNameErrorText });
                  else
                      this.setState({ lastNameError: true, ErrorText: LanguageSettings.french.LNameErrorText });
            }
    
        }    
    } 

    validationFirstName = (name) => {

        let reg = /^[a-zA-Z\s]+$/;

        if(name === '')
        {
            this.setState({ firstNameError: true, ErrorText: 'First Name is Required' });
        }
        else
        {

            if(reg.exec(name))
            {
              this.setState({ firstNameError: false, firstNameInput: name });
            }
            else
            {
              if(this.state.language === 'NEDERLANDS')
                  this.setState({ firstNameError: true, ErrorText: LanguageSettings.dutch.FNameErrorText });
              else
                  if(this.state.language === 'ENGLISH')
                      this.setState({ firstNameError: true, ErrorText: LanguageSettings.english.FNameErrorText });
                  else
                      this.setState({ firstNameError: true, ErrorText: LanguageSettings.french.FNameErrorText });
            }
   
        }        
    }

    validatePhone = (phone) => {

        let reg = /^[0-9]{10}$/;

        if(phone === '')
        {
            this.setState({ phone: true, ErrorText: 'Phone Number is Required' });
        }
        else
        {
            // home phone number belgium
            let homePhone = /^((\+|00)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/;
            // mobile phone number belgium
            let mPhone = /^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/;
    
            this.phoneText = this.state.country;
    
            if (reg.exec(phone))
              this.setState({ phoneNumberError: false, phoneNumberInput: phone });
            else
                if(this.state.language === 'NEDERLANDS')
                    this.setState({ phoneNumberError: true, ErrorText: LanguageSettings.dutch.TelephoneNumberError });
                else
                    if(this.state.language === 'ENGLISH')
                        this.setState({ phoneNumberError: true, ErrorText: LanguageSettings.english.TelephoneNumberError });
                    else
                        this.setState({ phoneNumberError: true, ErrorText: LanguageSettings.french.TelephoneNumberError });
        }
    
        // if (homePhone.exec(phone))
        //   this.setState({ phoneError: false, phone: phone });
        // else
        //   this.setState({ phoneError: true });
    
    }

    componentWillReceiveProps(nextProps) {
        console.log("in Form One screen language received="+nextProps.language);
        if (this.prpps.language !== nextProps.language) {
            this.setState({ language: nextProps.language });
            this.setText();
        }
    }

    componentDidMount() {
        console.log("language from props="+this.props.navigation.state.params.language);
        console.log("default language="+this.state.language);
        cLanguage = this.props.navigation.state.params.language;
        this.setState({ language: cLanguage });
        console.log("language="+this.state.language);
        this.setText();
        console.log("this.state.firstName="+this.state.firstName);
        console.log("this.state.buttonText="+this.state.buttonText);
    }

    setText =  () => {

        console.log("this.state.language="+this.state.language);

        if (this.props.navigation.state.params.language === 'NEDERLANDS') {
            console.log("setting in Nederlands");
            this.setState({
                firstName:  LanguageSettings.dutch.firstNameText,
                name:       LanguageSettings.dutch.lastNameText,
                phoneNumber: LanguageSettings.dutch.telephoneNumberText,
                buttonText: LanguageSettings.dutch.buttonNextText
            });
        }
        else
            if (this.props.navigation.state.params.language === 'ENGLISH') {
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

    renderValidation = () => {
        
        if(this.state.firstNameError === true || this.state.lastNameError === true || this.state.phoneNumberError === true)
            return (                        
                <View style={newStyle.validationStyle}> 
                        <Validation
                            objectParams = 
                            {{
                                'btnText': this.state.ErrorText, 
                                'language': this.props.navigation.state.params.language
                            }}
                        />
                </View>
            );
        
        return;

    }

    render() {
        return (
            
            <View style={newStyle.container}>
            
                <View style={newStyle.headerImage}>
                    <Image source={logoNew} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .45 }} />
                    {
                        this.renderValidation()
                    }
                </View>

                <View style={newStyle.inputContainer}>

                    <Text style={newStyle.firstName}>{this.state.firstName}</Text>
                    <TextInput
                                style={ newStyle.nameInput }
                                placeholder=''
                                onChangeText={(firstNameInput) => this.validationFirstName(firstNameInput)}
                    />
                            

                    <Text style={newStyle.firstName}>{this.state.name}</Text>
                    <TextInput
                        style={ newStyle.nameInput}
                        placeholder=''
                        onChangeText= { (lastNameInput) => this.validationLastName(lastNameInput) }
                    />

                    <Text style={newStyle.phoneNumberStyle}>{this.state.phoneNumber}</Text>
                    <TextInput
                        keyboardType= "numeric"
                        style={ newStyle.nameInput}
                        placeholder=''
                        onChangeText= { (phoneNumberInput) => this.validatePhone(phoneNumberInput) }
                    />                

                </View>

                <View style={newStyle.buttons}>
                    <ButtonNext objectParams=
                                {{
                                    btnText: this.state.buttonText, 
                                    language: this.props.navigation.state.params.language,
                                    firstName: this.state.firstNameInput,
                                    lastName: this.state.lastNameInput,
                                    phoneNumber: this.state.phoneNumberInput,
                                    firstNameError: this.state.firstNameError,
                                    lastNameError: this.state.lastNameError,
                                    phoneNumberError: this.state.phoneNumberError
                                }}/>
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

    scrollStyle: {
        flex:1,
        margin:0,
        padding:0,
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

    phoneNumberStyle: {
        width: 190,
        height: 22,
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

    validationStyle:{
        position: 'absolute',
        top: 62,
        left: 35,
        width: 60,
        height: 60,    
    }

});

