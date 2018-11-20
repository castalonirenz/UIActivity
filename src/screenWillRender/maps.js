import React, { Component } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
//import PickImage from './selectImage'

import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { addPlace } from "../actions/Places";
import Icon from "react-native-vector-icons/Ionicons";
import MapView from "react-native-maps";
import Heart from "react-native-vector-icons/Ionicons";

class PickLocation extends Component {
  state = {
    placeText: "",
    pickedImaged: null,
    heartCount: 0,

    controls: {
      image: {
        value: null,
        valid: false
      },
      location: {
        value: null,
        valid: false
      }
    },

    focusedLocation: {
      latitude: 14.5548,
      longitude: 121.0476,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get("window").width / Dimensions.get("window").height) *
        0.0522
    },
    locationChosen: false
  };

  sharePlace = () => {
    if(!this.state.controls.image.valid){
      alert("Please Select/Capture an image")
    }
    else{
    this.props.addAll(
      this.state.focusedLocation.latitude,
      this.state.focusedLocation.longitude,
      this.state.controls.image.value,
      this.state.placeText,
      this.state.heartCount
    );
    }
  };

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
  };

  pickImageHandler = () => {
    ImagePicker.showImagePicker({ title: "Pick an Image" }, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImaged: { uri: res.uri }
        });
        this.imagePickedHandler({ uri: res.uri, base64: res.data });
      }
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
    navigator.geolocation.getCurrentPosition(
      pos => {
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
      }
    );
  };

  HeartCount = (rating) =>{
    this.setState({
      heartCount: rating
    })
  }

  Ratings = () => {
    const hearts = [];
    let i = 0;
    do {
      i < this.state.heartCount
        ? hearts.push(
          <TouchableOpacity key={i} onPress={this.HeartCount.bind(this,i)}>
              <Heart
                name="md-heart"
                size={30}
                color="red"
                key={i}
                style={{ paddingLeft: 5 }}
              />
            </TouchableOpacity>
          )
        : hearts.push(
            <TouchableOpacity key={i} onPress={this.HeartCount.bind(this,i+1)}>
              <Heart
                name="md-heart-outline"
                size={30}
                color="red"
                key={i}
                style={{ paddingLeft: 5 }}
              />
           </TouchableOpacity>
          );

      i += 1;
    } while (i < 5);
    return hearts;
  };

  componentDidUpdate() {}
  render() {
    let marker = null;
    let addPlaceDetails = (
      <TouchableOpacity onPress={this.sharePlace}>
        <Icon name="md-share-alt" size={30} color="blue" />
      </TouchableOpacity>
    );

    if (this.props.isLoading) {
      addPlaceDetails = <ActivityIndicator size={30} color="red" />;
    }

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }

    return (
      <View style={styles.container}>
        <MapView style={{borderRadius: 10}}
          showsTraffic={true}
          showsBuildings={true}
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => (this.map = ref)}
          
        >
          {marker}
        </MapView>
        <TouchableOpacity onPress={this.getLocationHandler}>
            <Icon name="md-locate" size={30} color="black" />
          </TouchableOpacity>
          <Text style={{ color: "black" }}>Locate Me</Text>
        {/* <PickImage/> */}
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImaged} style={styles.previewImage} />
        </View>
        <TouchableOpacity onPress={this.pickImageHandler}>
          <Icon name="ios-camera-outline" size ={50}/>
          </TouchableOpacity>
        <View style={styles.button}>
          <View style={{ flexDirection: "row" }}>
          
          <Text>Rate your experience:</Text>
          {this.Ratings()}
        
          </View>
         
        </View>

    
        <View style={{flexDirection:"row", alignItems:"center", paddingBottom: 10}}>
        <TextInput
          style={styles.textInputDesign}
          onChangeText={text => this.placeInput(text)}
          value={this.state.placeText}
          placeholder="Tell me your experience"
          underlineColorAndroid="transparent"
        />
            {addPlaceDetails}

      </View>

    
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAll: (latLocation, longLocation, image, message, heartCount) =>
      dispatch(addPlace(latLocation, longLocation, image, message,heartCount))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickLocation);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  placeholder: {
    alignItems:"center",
    justifyContent:"center",
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
    
    backgroundColor:"#b5bfce",
    borderRadius: 25,
    
  },
  map: {
    width: "100%",
    height: 250
  },
  button: {
    alignItems: "center",
    margin: 8
  },
  textDesign: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16
  }
});
