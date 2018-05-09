import React, { Component } from 'react';
import { ImageBackground, Image, Dimensions, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';

const bannerImage = require('../Images/rsz_logo_75.png');
const comapnyLogo = require('../Images/Logo-jobfixers-CMYK-01.png');

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const companyBannerHeight = (viewPortHeight / 14) + (viewPortHeight / 59);
const iconWidth = (viewPortWidth * 52) / 250;

export default class CompanyBanner extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <View animation="fadeInRight" delay={250} duration={700} style={{ flex: 1, marginTop: viewPortHeight / 10 }}>
        <ImageBackground
          source={bannerImage}
          style={companyBannerStyle.background}
        >
        </ImageBackground>
      </View>
    );
  }
}

const companyBannerStyle = StyleSheet.create({
  background: {
    width:  viewPortWidth,
    height: companyBannerHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newIcon: {
    width: (viewPortWidth * 52) / 250
  },
});