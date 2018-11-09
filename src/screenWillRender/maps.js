import React, { Component } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity
} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons'
import MapView from "react-native-maps";

class PickLocation extends Component {
  state = {
    place: "",

    focusedLocation: {
      latitude: 14.5548 ,
      longitude: 121.0476,
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get("window").width /
        Dimensions.get("window").height *
        0.0122
    },
    locationChosen: false
  };

  sharePlace = () =>{
   // alert(this.state.place+"\n"+this.state.focusedLocation.latitude + "\n "+ this.state.focusedLocation.longitude)
  }

  placeInput = value => {
    this.setState({
      place: value
    });
  };

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
  };

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    },
  err => {
    console.log(err);
    alert("Fetching the Position failed, please pick one manually!");
  })
  }

  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }

    return (
      <View style={styles.container}>
        <MapView
          showsTraffic={true}
          showsBuildings = {true}
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => this.map = ref}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={this.getLocationHandler} />
        </View>

         <TextInput
            style={styles.textInputDesign}
            onChangeText={text => this.placeInput(text)}
            value={this.state.place}
            placeholder="What's in your mind?"
            underlineColorAndroid="white"
          />

          <Text style={styles.textDesign}>Share your location</Text>

          <TouchableOpacity onPress={this.sharePlace}>
            <Icon name="md-share-alt" size={30} color ="blue"></Icon>
          </TouchableOpacity>




      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  textInputDesign: {
    width: "80%",
    borderColor:"blue",
    borderWidth: 0.5
  },
  map: {
    width: "100%",
    height: 250
  },
  button: {
    margin: 8
  },
  textDesign:{
    color: "black",
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default PickLocation;
