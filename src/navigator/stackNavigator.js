import React , {Component} from 'react'

import loginScreen from '../screen/loginScreen'
import signUpOne from '../screen/signUpOne';
import signUpTwo from '../screen/signUpTwo';
import signUpLast from '../screen/signUpLast';
import homeScreen from '../screen/homeScreen'



import { createStackNavigator, createSwitchNavigator} from "react-navigation";

import { TabStack } from './tabNavigator';

const RootStack = createStackNavigator(
    {
      Home: homeScreen,
      Login: loginScreen,
      SignUpOne: signUpOne,
      SignUpTwo: signUpTwo,
      SignUpLast: signUpLast,
   
   
      
    },
    {
      initialRouteName: "Home",
      navigationOptions:{
          header: null

      }
    }
  );
export default RootStack;
  