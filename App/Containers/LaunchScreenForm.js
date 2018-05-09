import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  PixelRatio,
  Alert
} from 'react-native';
import { connect } from "react-redux";
import {RSA, RSAKeychain} from 'react-native-rsa-native';
import PropTypes from "prop-types";
import Spinner from "react-native-loading-spinner-overlay";
import DeviceInfo from 'react-native-device-info'
import { StyleSheet } from 'react-native';
import Aes from 'react-native-aes-crypto';
import CryptoJS from 'crypto-js';
import utf8 from 'utf8';
import randomstringPromise from 'randomstring-promise';

import { Colors } from "../Themes";
import { Images } from '../Themes'
import MyForm from '../Components/MyForm';
import { Dropdown } from 'react-native-material-dropdown';

import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal';

// Styles
import styles from './Styles/LaunchScreenStyles';
import { CountryCodes } from './CountryCodes';
import Api from './Api';
import AesCrypto from 'react-native-aes-kit';

const generateKey = (password, salt) => Aes.pbkdf2(password, salt);

const encrypt = (text, keyBase64) => {
    var ivBase64 = 'JOBFIXERS@WLNOB%AES#09876';    
    return Aes.encrypt(text, keyBase64, ivBase64).then(cipher => ({ cipher, iv: ivBase64 }));
};
const decrypt = (encryptedData, key) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv);

let userLocaleCountryCode = DeviceInfo.getDeviceCountry();
let NORTH_AMERICA = ['CA', 'MX', 'US', "BE","AO","AD","US","AE"];
const userCountryData = getAllCountries()
      .filter(country => NORTH_AMERICA.includes(country.cca2))
      .filter(country => country.cca2 === userLocaleCountryCode)
      .pop();
let callingCode = null;
let cca2 = userLocaleCountryCode;


const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 

export default class LaunchScreen extends Component {
  constructor(props){
    super(props);
    if (!cca2 || !userCountryData) {
      cca2 = 'US'
      callingCode = '1'
    } else {
      callingCode = userCountryData.callingCode
    }
  }
  state = {
    phone: '',
    fullName: '',
    min: 1,
    max: 26,
    postalCode: '',
    phoneError: false,
    nameError: false,
    postalCodeError: false,
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

  static defaultProps = {
    isFetching: false
  };

rsa = () => {

//https://github.com/amitaymolko/react-native-rsa-native

RSA.generateKeys(4096) // set key size
  .then(keys => {
    console.log('4096 private:', keys.private) // the private key
    console.log('4096 public:', keys.public) // the public key
  })

RSA.generate() 
  .then(keys => {
    console.log(keys.private) // the private key
    console.log(keys.public) // the public key
    RSA.encrypt('1234', keys.public)
      .then(encodedMessage => {
        RSA.decrypt(encodedMessage, keys.private)
          .then(message => {
            console.log(message);
          })
        })

    RSA.sign(secret, keys.private)
      .then(signature => {
        console.log(signature);

        RSA.verify(signature, secret, keys.public)
          .then(valid => {
            console.log(valid);
          })
        })
  })

// Example utilizing the keychain for private key secure storage

let keyTag = 'com.domain.mykey';
let secret = "secret message";

RSAKeychain.generate(keyTag)
  .then(keys => {
    console.log(keys.public);
    console.log(secret);

    return RSAKeychain.encrypt(secret, keyTag)
      .then(encodedMessage => {
        console.log(encodedMessage);

        RSAKeychain.decrypt(encodedMessage, keyTag)
          .then(message => {
            console.log(message);
          })
        })
  })
  .then(() => {
  return RSAKeychain.sign(secret, keyTag)
    .then(signature => {
      console.log('signature', signature);

      RSAKeychain.verify(signature, secret, keyTag)
        .then(valid => {
          console.log('verified', valid);
        })
      })
  })
  .then(() => {
    RSAKeychain.deletePrivateKey(keyTag)
    .then( success => {
      console.log('delete success', success)
    })
  });  
}

randomStringKey = () => {

  let c = Math.random()*62;
  let rString = chars.substr(c,1);

    for(i=0;i<22;i++)
       rString = rString + chars.substr(Math.random()*62,1);

 return rString;

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

  login = async () => {

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
  };
  
  loginUser = () => {
    if (!this.state.isLogin) {
      if (!this.state.canLogin) {
      } else {
        this.setState({ isLogin: true });
        this.login();
        setTimeout(() => {
          this.setState({ isLogin: false, canLogin: false });
        }, 1000);
      }
    }
  };

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

  getUTCDate = () =>
  {
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

  getTimeData = () =>
  {
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

  render() {    
    let asterisk = <Text style={{ fontWeight: 'bold', marginTop: 20, color: 'red' }}>* </Text>;
    let lbl = 'I want to work if';

    return (
      <View style={{ flex: 10, flexDirection: 'column', justifyContent: 'center', marginTop: 40, }}>
        <View style={{ flex: 5, flexDirection: 'column', justifyContent: 'center', width: "80%", marginLeft: 35 }}>
          <Dropdown 
                  label={lbl} 
                  data={this.state.data} ref={this.nicheRef} 
                  valueExtractor = {({value}) => value}
                  onChangeText={(value)=> { this.onChangeTextPress(value) }}
          />
          <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Name</Text>
          {
            (!this.state.nameError)?
            <TextInput
             ref={(ref) => this.myTextInput = ref}
             style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
             onChangeText={(name) => this.validationName(name)}
            />
            :
            <TextInput
              ref={(ref) => this.myTextInput = ref}
              style={{ height: 40, borderColor: 'red', borderBottomWidth: 1 }}
              onChangeText={(name) => this.validationName(name)}
            />
          }
          
          <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Phone Number</Text>
          <View style={{ flexDirection: 'row', paddingBottom: 10, justifyContent: 'flex-start', marginTop: 10 }}>

          <CountryPicker
              style={{ maringTop: 10, borderBottomWidth: 1, borderColor: 'black', borderStyle: 'solid' }}
              countryList={NORTH_AMERICA}
              onChange={value => {
              this.setState({ cca2: value.cca2, callingCode: value.callingCode, country: value.callingCode })
            }}
              cca2={this.state.cca2}
              translation="eng"
          />
           {
             this.state.country? 
                 <Text style={nstyles.data}>
                 {this.state.country}                 
                 </Text>: 
                 <Text style={nstyles.data}>
                 {this.state.country}
                 </Text>                 
           }          

           {
            (!this.state.phoneError)?
            <TextInput
                ref={(ref) => this.phoneText = ref}
                style={{ height: 40, width: 180, borderColor: 'gray', borderBottomWidth: 1 }}
                onChangeText={(phone) => this.validatePhone(phone)}
            /> :
            <TextInput
                ref={(ref) => this.phoneText = ref}
                style={{ height: 40, width: 180,  borderColor: 'red', borderBottomWidth: 1, color: 'red' }}
                onChangeText={(phone) => this.validatePhone(phone)}
            />
          }
          </View>
          

          <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Postal Code</Text>
          {
            (!this.state.postalCodeError)?
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1 }}
                onChangeText={(postalCode) => this.validationPostalCode(postalCode)}
              />
              :
              <TextInput
                style={{ height: 40, borderColor: 'red', color: 'red', borderBottomWidth: 1 }}
                onChangeText={(postalCode) => this.validationPostalCode(postalCode)}
              />
          }


          <TouchableOpacity style={{ width: "20%", margin: 50, marginLeft: 100, borderColor: 'black', borderStyle: 'solid', borderWidth: 1 }} onPress={this.login}>
            <Text style={{ padding: 10, }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const nstyles = StyleSheet.create({

  data: {
    padding: 15,    
    width: 86,
    height: 50,
    textAlign: 'left',
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderBottomWidth: 1,
    color: '#777'
  },

  instructions: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginBottom: 5
  },

});