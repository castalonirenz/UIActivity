import React, { Component } from 'react';
import {ScrollView } from 'react-native';
import MapRender from '../../src/screenWillRender/maps'

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView style={{backgroundColor:"#313837"}} >
        <MapRender/>
        
        

      </ScrollView >
    );
  }
}

export default MapScreen;
