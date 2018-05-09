import { StackNavigator } from 'react-navigation'
import PizzaLocationListScreen from '../Containers/PizzaLocationListScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import LanguageScreen from '../Containers/LanguageScreen'
import NewScreen from '../Containers/NewScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  PizzaLocationListScreen: { screen: PizzaLocationListScreen },
  LaunchScreen: { screen: LaunchScreen },
  LanguageScreen: { screen: LanguageScreen },
  NewScreen: { screen: NewScreen }

}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'NewScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
