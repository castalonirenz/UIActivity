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
//import PickImage from './selectImage'

import ImagePicker from "react-native-image-picker";
import {connect} from 'react-redux'
import {addPlace} from '../actions/addPlace'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView from "react-native-maps";

class PickLocation extends Component {
  state = {
    placeText: "",
    pickedImaged: null,

    controls:{
      image :{
        value: null,
        valid: false,
      }
    },
  

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
   alert(this.state.placeText+"\n"+this.state.focusedLocation.latitude + "\n "+ 
   this.state.focusedLocation.longitude + "\n"+ this.state.controls.image.value)

   // this.props.addAll(this.props.firstname,this.props.lastname)
  }

  placeInput = value => {
    this.setState({
      placeText: value
    });
  };

   imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      };
    });
  }
  
  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Pick an Image"}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImaged: { uri: res.uri }
        });
        this.imagePickedHandler({uri: res.uri, base64: res.data});
      
      }
    });
  }

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

         {/* <PickImage/> */}
         <View style={styles.placeholder}>
          <Image source={this.state.pickedImaged} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.pickImageHandler} />
        </View>


         <TextInput
            style={styles.textInputDesign}
            onChangeText={text => this.placeInput(text)}
            value={this.state.placeText}
            placeholder="Tell me your experience"
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

const mapDispatchToProps = dispatch =>{
  return{
    addLocation:(location,image,text) => dispatch(addPlace(location,image,text))
  }
}
export default connect(null,mapDispatchToProps) (PickLocation);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  previewImage: {
            width: "100%",
            height: "100%"
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


