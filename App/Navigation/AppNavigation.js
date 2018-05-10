import { StackNavigator } from 'react-navigation';
import PizzaLocationListScreen from '../Containers/PizzaLocationListScreen';
import LaunchScreen from '../Containers/LaunchScreen';
import LanguageScreen from '../Containers/LanguageScreen';
import NewScreen from '../Containers/NewScreen';
import WelcomeScreen from '../Containers/WelcomeScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  PizzaLocationListScreen: { screen: PizzaLocationListScreen },
  LaunchScreen: { screen: LaunchScreen },
  LanguageScreen: { screen: LanguageScreen },
  NewScreen: { screen: NewScreen },
  WelcomeScreen: { screen: WelcomeScreen },

}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'WelcomeScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
