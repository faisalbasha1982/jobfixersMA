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
import { NavigationActions } from "react-navigation";
import LanguageButton from '../Components/LanguageButton';
import { Dropdown } from 'react-native-material-dropdown';
import Spinner from "react-native-loading-spinner-overlay";
import DeviceInfo from 'react-native-device-info'
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import CompanyBanner from '../Components/CompanyBanner';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CountryPicker, { getAllCountries} from 'react-native-country-picker-modal';
import { CountryCodes } from './CountryCodes';
import CryptoJS from 'crypto-js';
import utf8 from 'utf8';
import Api from './Api';

import { Colors } from "../Themes";
import { Images } from '../Themes';

import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/logojobfixersNew.png';
import PopupMenu from './PopupMenu';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

let userLocaleCountryCode = DeviceInfo.getDeviceCountry();

let NORTH_AMERICA = ['CA', 'MX', 'US', "BE","AO","AD","US","AE"];

const userCountryData = getAllCountries()
      .filter(country => NORTH_AMERICA.includes(country.cca2))
      .filter(country => country.cca2 === userLocaleCountryCode)
      .pop();

let callingCode = null;
let cca2 = userLocaleCountryCode;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// Styles

class FormTwo extends Component {

    constructor(props)
    {
        super(props);        

        if (!cca2 || !userCountryData) {
            cca2 = 'US'
            callingCode = '1'
          } 
          else {
            callingCode = userCountryData.callingCode
          }
        
        this.state = {
            language: 'NEDERLANDS',
            workText: '',
            postalCode: '',
            policyText: '',
            buttonText: '',
            checked: false,
            cca2:'',
            callingCode:'',
            country:'',
            message: '',
            language: 'en',
            time: '',
            selected:'',
            eAuthData:'',
            data: [
                {
                  value: 'Construction Worker',
                },
                {
                  value: 'Worker',
                },
                {
                  value: 'Clerk',
                }
              ],
        };
    
    }

    randomStringIV = () => {

        let c = Math.random()*62;
        let rString = chars.substr(c,1);
     
          for(i=0;i<15;i++)
             rString = rString + chars.substr(Math.random()*62,1);
     
       return rString;
     }
     
     aes  = (authenticationData) => {
     
       const ivRandom = this.randomStringIV();
     
       // var key = CryptoJS.enc.Utf8.parse('VyhoMoGxi25xn/Tc');
       var key = CryptoJS.enc.Utf8.parse(Api.securityKey);
       var iv = CryptoJS.enc.Utf8.parse(ivRandom.toString());
       const ivFirstPart = ivRandom.substr(0,8);
       const ivLastPart = ivRandom.substring(8);
       console.log('first part='+ivFirstPart+ " Last part="+ivLastPart);
     
       var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(authenticationData), key,
           {
               keySize: 256 / 8,
               iv: iv,
               mode: CryptoJS.mode.CBC,
               padding: CryptoJS.pad.Pkcs7
           });
     
       var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
           keySize: 256 / 8,
           iv: iv,
           mode: CryptoJS.mode.CBC,
           padding: CryptoJS.pad.Pkcs7
       });
     
       console.log('Encrypted :' + encrypted);
       console.log('Key :' + encrypted.key);
       console.log('Salt :' + encrypted.salt);
       console.log('iv :' + encrypted.iv);
       console.log('Decrypted : ' + decrypted);
       console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));
     
       return ivFirstPart + encrypted.toString() + ivLastPart;
    }
    
    login = async () => 
    {

        if(this.phone === '' || this.fullName === '' || this.phone === '' || this.postalCode==='' )
            {
              
            }
        else
           {
              let names = this.state.fullName.split(' ').toString();
              // Alert.alert('Names:', names);
              // Alert.alert('Nieche:', this.state.selected );
              let cAuthenticationData = "{'Lang':"+" '"+this.state.language+"',"+"  'AuthID': 'JS#236734', 'Data':'FormSignUp', 'D' :"+" '"+this.getUTCDate()+"'"+","+  " 'R' : 'er3rss'}";
              console.log("AuthenticationData:",cAuthenticationData);
    
              Alert.alert('Authentication Data:', cAuthenticationData);
              //"AuthenticationData": "{'Lang': 'fr',  'AuthID': 'JS#236734','Data':'FormSignUp','D' : '2018-04-30 11:30:12' ,'R' : 'er3rss'}",
    
              var encrypted = this.aes(cAuthenticationData);
              console.log('loginfunction Encrypted :' + encrypted);
    
              fetch(Api.signUpURL, {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({      
                    "AuthenticationData": encrypted.toString(),
                    "firstname": names[0],
                    "lastname": names[1],
                    "phonenumber": parseInt(this.state.phone),
                    "postalcode": parseInt(this.state.postalCode),
                    "niche": this.state.selected,
                }),
              }).then(response => response.json())
                .then((res) => {
                  console.log('Success:', res);
                  if (typeof (res.message) !== 'undefined') {
                    this.setState({ message: res.Message_en });
                    Alert.alert('Welcome', this.state.message);
                    this.setState({ isLogin: false, canLogin: false });
                    this.props.clear();
                  } else {
                    console.log("message=",res.Message_en);
                    this.setState({ message: res.Message_en })
                    Alert.alert('Welcome', this.state.message);
                  }
                }).catch((error) => { console.error(error); });
            }
    }

    validationName = (name) => {
        let reg = /^[a-zA-Z\s]+$/;
    
        if (reg.exec(name))
        {
          this.setState({ nameError: false, fullName: name });
        }
        else
          this.setState({ nameError: true });      
    
    }

      validationPostalCode = (pcode) => {
        let reg = /^[0-9]{4}$/;
    
        if (reg.exec(pcode))
          this.setState({ postalCodeError: false,postalCode: pcode });
        else
          this.setState({ postalCodeError: true });
    
    }
    
      validatePhone = (phone) => {
        console.log('validation phone=', phone);
    
        let reg = /^[0-9]{10}$/;
    
        // home phone number belgium
        let homePhone = /^((\+|00)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/;
        // mobile phone number belgium
        let mPhone = /^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/;
    
        this.phoneText = this.state.country;
    
        if (reg.exec(phone))
          this.setState({ phoneError: false, phone: phone });
        else
          this.setState({ phoneError: true });
    
        // if (homePhone.exec(phone))
        //   this.setState({ phoneError: false, phone: phone });
        // else
        //   this.setState({ phoneError: true });
    
    }
    
    getUTCDate = () => {
      //2018-04-30 11:30:12
  
      var date, day, month, year;
      var today = new Date();
  
      day = parseInt(today.getUTCDate())>10?today.getUTCDate():('0'+today.getUTCDate().toString());
      month = parseInt(today.getUTCMonth()+1)>10?parseInt(today.getUTCMonth()+1):('0'+parseInt(today.getUTCMonth()+1));
      year = today.getUTCFullYear().toString();
  
      // let currentDate = year + '-' + month>10?month:('0'+month) + '-' + day>10?day:('0'+day);
      let currentDate = year + '-'+month+'-'+ day;
  
      // Creating variables to hold time.
      var date, TimeType, hour, minutes, seconds, fullTime;
      
      // Getting current hour from Date object.
      hour = today.getUTCHours(); 
  
      if(hour < 10)
        hour = '0' + today.getUTCHours();
  
      // Getting the current minutes from date object.
      minutes = today.getUTCMinutes();
   
      // // Checking if the minutes value is less then 10 then add 0 before minutes.
      if(minutes < 10)
        minutes = '0' + minutes.toString();
   
      //Getting current seconds from date object.
      seconds = today.getUTCSeconds();
   
      // // If seconds value is less than 10 then add 0 before seconds.
      if(seconds < 10)
        seconds = '0' + seconds.toString();
   
      // Adding all the variables in fullTime variable.
      fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString();
  
      //var utcDate = new Date(Date.UTC(year,month-1,day,hour,minutes,seconds));
     
      Alert.alert('Day & Time UTC', currentDate+' '+fullTime);
  
      return currentDate+' '+fullTime;
    }
  
    getTimeData = () => {
      //2018-04-30 11:30:12
  
      var date, day, month, year;
      var today = new Date();
  
      day = parseInt(today.getDate())>10?today.getDate():('0'+today.getDate().toString());
      month = parseInt(today.getMonth()+1)>10?parseInt(today.getMonth()+1):('0'+parseInt(today.getMonth()+1));
      year = today.getFullYear().toString();
  
      // let currentDate = year + '-' + month>10?month:('0'+month) + '-' + day>10?day:('0'+day);
      let currentDate = year + '-'+month+'-'+ day;
  
      // Creating variables to hold time.
      var date, TimeType, hour, minutes, seconds, fullTime;
      
      // Getting current hour from Date object.
      hour = today.getHours(); 
  
      if(hour < 10)
        hour = '0' + today.getHours();
  
      // Getting the current minutes from date object.
      minutes = today.getMinutes();
   
      // // Checking if the minutes value is less then 10 then add 0 before minutes.
      if(minutes < 10)
        minutes = '0' + minutes.toString();
   
      //Getting current seconds from date object.
      seconds = today.getSeconds();
   
      // // If seconds value is less than 10 then add 0 before seconds.
      if(seconds < 10)
        seconds = '0' + seconds.toString();
   
      // Adding all the variables in fullTime variable.
      fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString();
  
      //var utcDate = new Date(Date.UTC(year,month-1,day,hour,minutes,seconds));
     
      Alert.alert('Day & Time', currentDate+' '+fullTime);
  
      return currentDate+' '+fullTime;
    }

    onChangeTextPress = (value) => {
        this.setState({ selected: value});
     }
   
     
    somethingElse = () => {

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.navigation.state.params.objectParams !== nextProps.objectParams) {
            this.setState({ language: this.props.navigation.state.params.objectParams.language });
            this.setText();
        }
    }

    componentDidMount() {
        console.log("default language="+this.props.navigation.state.params.objectParams.language);
        this.setState({ language: this.props.navigation.state.params.objectParams.language });
        console.log("language="+this.state.language);
        this.setText();
        console.log("this.state.firstName="+this.state.firstName);
        console.log("this.state.buttonText="+this.state.buttonText);
    }

    setText = () => {

        console.log("this.state.language="+this.state.language);

        if (this.props.navigation.state.params.objectParams.language === 'NEDERLANDS') {
            console.log("setting in Nederlands");
            this.setState({
                workText:  LanguageSettings.dutch.workText,
                postalCode: LanguageSettings.dutch.postalCodeText,
                policyText: LanguageSettings.dutch.policyText,
                buttonText: LanguageSettings.dutch.buttonTextJob
            });
        }
        else
            if (this.props.navigation.state.params.objectParams.language === 'ENGLISH') {
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
        const lbl = '';
        return (
            <View style={newStyle.container}>

                <View style={newStyle.headerImage}>
                    <Image source={logoNew} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .45 }} />
                </View>

                <View style={newStyle.inputContainer}>
                    <Text style={newStyle.firstName}>{this.state.workText}</Text>
                    <View style= {newStyle.dropDownStyle}>

                            {/* valueExtractor = {({value}) => value}
                            onChangeText={(value)=> { this.onChangeTextPress(value) }} */}

                        {/* <Dropdown
                            containerStyle= {newStyle.dropDownS}                         
                            data={this.state.data} ref={this.nicheRef}
                        /> */}

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
                            /> 

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

                    <TouchableOpacity onPress={() => this.props.onButtonPress(this.state.language)}
                        activeOpacity={0.5}
                        style={newStyle.buttonStyle}>
                        <Text style={newStyle.buttonTextStyle}>
                                {this.state.buttonText.toUpperCase()}
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

    dropDownStyle: {
        width: viewPortWidth,
        height: 110,
        flex: 3,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',                
        marginBottom: 10,        
    },

    dropDownS:{
        width: 150,
        height: 110,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'powderblue',
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

const mapStateToProps = state => {
    return {
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
  
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => dispatch(NavigationActions.back()),
      onButtonPress: (language) => dispatch(NavigationActions.navigate({routeName: 'ThankYouScreen', params:{language: language}})),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FormTwo);