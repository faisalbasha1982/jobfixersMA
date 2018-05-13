import { StackNavigator } from 'react-navigation';
import PizzaLocationListScreen from '../Containers/PizzaLocationListScreen';
import LaunchScreen from '../Containers/LaunchScreen';
import LanguageScreen from '../Containers/LanguageScreen';
import NewScreen from '../Containers/NewScreen';
import WelcomeScreen from '../Containers/WelcomeScreen';
import FormOne from '../Containers/FormOne';
import FormTwo from '../Containers/FormTwo';
import ThankYouScreen from '../Containers/ThankYouScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  PizzaLocationListScreen: { screen: PizzaLocationListScreen },
  LaunchScreen: { screen: LaunchScreen },
  LanguageScreen: { screen: LanguageScreen },
  NewScreen: { screen: NewScreen },
  WelcomeScreen: { screen: WelcomeScreen },
  FormOne: { screen: FormOne },
  FormTwo: { screen: FormTwo },
  ThankYouScreen : { screen: ThankYouScreen }

}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'NewScreen',
  mode: "card",
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav;
