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
    ActivityIndicator,
    Alert
} from 'react-native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
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
import DropdownMenu from './DropDownMenu';
import Validation from '../Components/ButtonValidation';

import { Colors } from "../Themes";
import { Images } from '../Themes';

import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/logojobfixersNew.png';
import PopupMenu from './PopupMenu';
import languageSettings from '../Containers/LanguageSettingsNew';

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
            firstname: '',
            lastname: '',
            phonenumber: '',
            dropDownItem: '',            
            postalCodeInput: '',
            postalCodeError: true,
            policyText: '',
            policyTextColor: '#000',
            buttonText: '',
            checked: false,
            cca2:'',
            callingCode:'',
            country:'',
            isLoading:false,
            message: '',
            language: 'en',
            time: '',
            selected:'',
            eAuthData:'',
            construct:'',
            office:'',
            industry:'',

            // data: [
            //     {
            //       value: 'Construction Worker',
            //     },
            //     {
            //       value: 'Worker',
            //     },
            //     {
            //       value: 'Clerk',
            //     }
            //   ],
        };
    
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.navigation.state.params.objectParams !== nextProps.objectParams) {
            this.setState({ 
                language: this.props.navigation.state.params.objectParams.language,
                firstname: this.props.navigation.state.params.objectParams.firstName,
                lastname: this.props.navigation.state.params.objectParams.lastName,
                phonenumber: this.props.navigation.state.params.objectParams.phoneNumber,                
            });
            this.setText();
        }
    }

    componentDidMount() {
        console.log("default language="+this.props.navigation.state.params.objectParams.language);
        this.setState({ 
            language: this.props.navigation.state.params.objectParams.language,
            firstname: this.props.navigation.state.params.objectParams.firstName,
            lastname: this.props.navigation.state.params.objectParams.lastName,
            phonenumber: this.props.navigation.state.params.objectParams.phoneNumber,                
        });
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
                buttonText: LanguageSettings.dutch.buttonTextJob,
                industry: LanguageSettings.dutch.industry,
                construct: LanguageSettings.dutch.construct,
                office: LanguageSettings.dutch.office,
            });
        }
        else
            if (this.props.navigation.state.params.objectParams.language === 'ENGLISH') {
                console.log("setting in English");
                this.setState({
                    workText:  LanguageSettings.english.workText,
                    postalCode: LanguageSettings.english.postalCodeText,
                    policyText: LanguageSettings.english.policyText,
                    buttonText: LanguageSettings.english.buttonTextJob,
                    industry: LanguageSettings.english.industry,
                    construct: LanguageSettings.english.construct,
                    office: LanguageSettings.english.office,    
                    });
            }
            else
              {
                console.log("setting in French");
                this.setState({
                    workText:  LanguageSettings.french.workText,
                    postalCode: LanguageSettings.french.postalCodeText,
                    policyText: LanguageSettings.french.policyText,
                    buttonText: LanguageSettings.french.buttonTextJob,
                    industry: LanguageSettings.french.industry,
                    construct: LanguageSettings.french.construct,
                    office: LanguageSettings.french.office,    
                    });
            }
    
       
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
        // <View style={{ flex:1, flexDirection: 'row',
        // justifyContent: 'space-around',
        //     padding: 10 }}>
        //         <ActivityIndicator size="large" color="#0000ff" />
        // </View>        

        this.setState({isLoading: true});

        let phone = this.state.phonenumber;
        let fName = this.state.firstname;
        let lName = this.state.lastname;
        let postalCode = this.state.postalCodeInput;
        let Nieche = '';

        if(this.state.dropDownItem === 'Construction Worker' 
            || this.state.dropDownItem === 'Bouwvakker'
            || this.state.dropDownItem === 'Travailleur de construction')
            Nieche = 'Construct';

        if(this.state.dropDownItem === 'Worker'
            || this.state.dropDownItem === 'Arbeider'
            || this.state.dropDownItem === 'Travailleur')
            Nieche = 'Industry';

        if(this.state.dropDownItem === 'Clerk'
            || this.state.dropDownItem === 'Bediende'
            || this.state.dropDownItem === 'Employé')
            Nieche = 'Office';
            

        console.log("values found in login, phone = "+this.state.phonenumber);
        console.log("values found in login, fName = "+this.state.firstname);
        console.log("values found in login, lName = "+this.state.lastname);
        console.log("values found in login, postalcode = "+this.state.postalCodeInput);

        if(phone === '' || fName === '' || lName === '' || postalCode ==='' || this.state.checked === false )
            {
                
            }
        else
           {
            //   let names = this.state.fullName.split(' ').toString();
              // Alert.alert('Names:', names);
              // Alert.alert('Nieche:', this.state.selected );
              let cAuthenticationData = "{'Lang':"+" '"+this.state.language+"',"+"  'AuthID': 'JS#236734', 'Data':'FormSignUp', 'D' :"+" '"+this.getUTCDate()+"'"+","+  " 'R' : 'er3rss'}";
              console.log("AuthenticationData:",cAuthenticationData);
    
            //   Alert.alert('Authentication Data:', cAuthenticationData);
              //"AuthenticationData": "{'Lang': 'fr',  'AuthID': 'JS#236734','Data':'FormSignUp','D' : '2018-04-30 11:30:12' ,'R' : 'er3rss'}",
    
              var encrypted = this.aes(cAuthenticationData);
              console.log('loginfunction Encrypted :' + encrypted);
    
              fetch(Api.signUpURLP, {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({      
                    "AuthenticationData": encrypted.toString(),
                    "firstname": fName,
                    "lastname": lName,
                    "phonenumber": this.state.phonenumber,
                    "postalcode": parseInt(this.state.postalCodeInput),
                    "niche": Nieche,
                }),
              }).then(response => response.json())
                .then((res) => {
                  console.log('Success:', res);
                  if (typeof (res.message) !== 'undefined') {
                    this.setState({ message: res.Message_en });
                    // Alert.alert('Welcome', this.state.message);
                    this.setState({ isLogin: false, canLogin: false });
                    this.props.onButtonPress(this.state.language);
                    //this.props.clear();
                  } else {
                    console.log("message=",res.Message_en);
                    this.setState({ message: res.Message_en })
                    // Alert.alert('Welcome', this.state.message);
                    this.props.onButtonPress(this.state.language);
                  }
                }).catch((error) => { console.error(error); });
            }
    }

    validateCheckBox = (checked) => {        

            if(checked === false)
                this.setState({ CheckBoxError: true, ErrorText: 'CheckBox is Clicked', policyTextColor: '#e73d50' });
            else
                this.setState({ CheckBoxError: false, ErrorText: '', policyTextColor: '#000' });

    }   

    validationPostalCode = (pcode) => {
        let reg = /^[0-9]{4}$/;

        if(pcode==='')
            this.setState({ postalCodeError: true, ErrorText: 'Postal Code is Required!' });
        else
        {
            if (reg.exec(pcode))
                this.setState({ postalCodeError: false, postalCodeInput: pcode });
            else
                this.setState({ postalCodeError: true,  ErrorText: 'Postal Code is not Valid' });
        }    
    }

    renderValidation = () => {
        
        if(this.state.postalCodeError === true)
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
     
    //   Alert.alert('Day & Time UTC', currentDate+' '+fullTime);
  
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
    

    callLogin = async () =>
    {
        this.login();
        //this.props.onButtonPress(this.state.language);
    }

    render() {
        const myIcon = (<Icon name="angle-left" size={30} color="#900" />);
        var bt = LanguageSettings.dutch.buttonTextJob;
        const lbl = '';
        var data = [[this.state.construct, this.state.industry, this.state.office,]];

        return (
           <View style={newStyle.container}>

            {/* <View style={newStyle.container}> */}

                <View style={newStyle.headerImage}>
                    <Image source={logoNew} resizeMode="contain" style={{ width: viewPortWidth, height: viewPortHeight * .45 }} />
                    {
                        this.renderValidation()
                    }
                </View>

                <View style={newStyle.inputContainer}>
                <KeyboardAwareScrollView
                        style={{ backgroundColor: '#ffffff' }}
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        contentContainerStyle={newStyle.keyboardScrollViewContainer}
                        scrollEnabled={true}
                    >
                    <Text style={newStyle.firstName}>{this.state.workText}</Text>
                    <View style= {newStyle.dropDownStyle}>

                            {/* valueExtractor = {({value}) => value}
                            onChangeText={(value)=> { this.onChangeTextPress(value) }} */}

                        <DropdownMenu
                                style={{
                                flex: 1, 
                                marginTop: 0,
                                flexDirection: 'row', 
                                borderRadius: 8, 
                                }}
                                bgColor={'transparent'}
                                tintColor={'#666666'}
                                activityTintColor={'green'}
                                // arrowImg={}      
                                // checkImage={}   
                                // optionTextStyle={{color: '#333333'}}
                                // titleStyle={{color: '#333333'}} 
                                maxHeight={200} 
                                handler={(selection, row) => this.setState({dropDownItem: data[selection][row]})}
                                data={data}> 
                        </DropdownMenu>
                    </View>
                    

                    {
                        this.state.isLoading===true?
                        <View style = {{position: 'absolute' , zIndex:999, left: 40, top: 40, right: 0, bottom: 0}}>
                        <BallIndicator color='#e73d50' />
                        </View>:''
                    }


                    <Text style={newStyle.postalName}>{this.state.postalCode}</Text>
                    <TextInput
                        style={ newStyle.nameInput}
                        keyboardType= "numeric"
                        placeholder=''
                        onChangeText= { (postalCodeInput) => this.validationPostalCode(postalCodeInput) }
                    />

                    <View style={newStyle.policyStyle}> 
                    <CheckBox  
                                title=''  
                                checked={this.state.checked}
                                checkedColor='red'
                                containerStyle={newStyle.checkBoxStyle}
                                onPress={() => this.setState({checked: !this.state.checked})}
                                />
                    {
                        <Text style={[newStyle.policyTextStyle,{color: this.state.checked?'#000':'#e73d50'}]}>
                            {this.state.policyText}
                        </Text>                    
                    }
                    </View>
                    </KeyboardAwareScrollView>

                </View>

                <View style={newStyle.buttons}>
                    <TouchableOpacity onPress={() => this.props.navigateBack()}
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

                    <TouchableOpacity onPress={() => 
                    {
                        if(this.state.checked===true && this.state.postalCodeError===false)
                                this.login();

                        //this.props.onButtonPress(this.state.language);                        
                    }
                    }
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

    keyboardScrollViewContainer: {
        backgroundColor: 'transparent',
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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
        flex: 2,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-start',                
        zIndex: 999,
    },

    inputContainer: {
        backgroundColor: 'white',
        marginTop: 15,
        padding: 10,
        paddingTop: 10,
        flex: 18,
        height: 150,
        backgroundColor: 'white'
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
        zIndex: 1,
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
        marginTop: 0,
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
     },

     validationStyle:{
        position: 'absolute',
        top: 62,
        left: 35,
        width: 60,
        height: 60,    
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