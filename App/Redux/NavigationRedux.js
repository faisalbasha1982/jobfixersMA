import AppNavigation from '../Navigation/AppNavigation';
import NavigationActions from 'react-navigation';

export const reducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}
