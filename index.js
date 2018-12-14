import { AppRegistry } from 'react-native';
import App from './App';
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);
import { Provider } from 'react-redux'
import configureStore from './src/configureStore'
import React from 'react'


const store = configureStore();
const RNRedux = () =>(
  <Provider store={store}>
  <App/>
  </Provider>
)


AppRegistry.registerComponent('NewActivity', () => RNRedux);
