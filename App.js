import login from './screens/login';
import chat from './screens/chat';
import home from './screens/home';
import settings from './screens/settings';
import authLoading from './screens/authLoading';
import signup from './screens/signup';
import forgot from './screens/forgot';
import compose from './screens/compose.js';

import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

// App stack: the chat and home page
const appStack = createStackNavigator(
  {
  home: home,
  chat: chat,
  }
);

// root stack: the base of the app
// settings and compose screens are modals not real pages
const rootStack = createStackNavigator(
  {
  appStack: {screen: appStack, navigationOptions: {header: null}},
  settings: settings,
  compose: compose,
  },
  {
    mode: 'modal',
    headerMode: 'screen', 
  }
);

// auth stack goes thru authloading screen to pass this or 
// to login 
const authStack = createStackNavigator({
  login: login,
  signup: signup,
  forgot: forgot,
})

// using react-navigation to move between the pages 
export default createAppContainer( createSwitchNavigator(
  {
  authLoading: authLoading,
  app: rootStack,
  auth: authStack,
  },
  {
    // using AsyncStorage to store if user is already logged in
    initalRouteName: 'authLoading',
  }
));