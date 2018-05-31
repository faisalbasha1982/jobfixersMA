import {Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    selectText: {
      width: "100%",
      height: Platform.OS === 'ios' ? "6.9%" : 80,
      flex: 6,
      fontSize: 30,
      color: 'black', 
      fontFamily: 'WorkSans-Regular',
      lineHeight: 46,
      letterSpacing: 0,
      textAlign: 'center'
    }

});

export default styles;