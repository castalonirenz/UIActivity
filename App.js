
import React, { Component } from 'react';
import {createSwitchNavigator} from "react-navigation";
import RootStack from './src/navigator/stackNavigator'
import { TabStack } from './src/navigator/tabNavigator';

export default class App extends Component{
 
  render() {
      return <AppNavigator />;
  }
}

export const AppNavigator = createSwitchNavigator({
  Auth: RootStack,
  Tab: TabStack
 
});




