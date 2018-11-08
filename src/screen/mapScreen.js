import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapRender from '../../src/screenWillRender/maps'
class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <MapRender/>
      </View>
    );
  }
}

export default MapScreen;
