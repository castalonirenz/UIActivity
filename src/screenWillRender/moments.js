import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { getPlaces, deletePlace } from "../actions/addPlace";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import MapView from "react-native-maps";


class Saved extends Component {
  state = {
    myArray: []
  };
  alertItemName = item => {
    alert(item.message + ": " + "\n" + item.lattitude + " " + item.key);
  };

  placeDeletedHandler = item => {
    this.props.onDeletePlace(item.key);
    //alert(item.key)
  };

  render() {
    let marker = null;
    // const focusedLocation = {
    //   latitude: 14.5548,
    //   longitude: 121.0476,
    //   latitudeDelta: 0.00122,
    //   longitudeDelta: 0.0122
     
    // }
   // marker = <MapView.Marker coordinate={focusedLocation}  />;
    return (
      <View style={styles.viewContainer}>
        {this.props.PlacesFromFireBase.map((item, index) => (
         
          <TouchableOpacity
            key={index}
            style={styles.container}
            onPress={() => this.alertItemName(item)}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{
                  uri: item.image
                }}
                style={styles.imageDesign}
              />

              <MapView
                showsTraffic={true}
                showsBuildings={true}
                scrollEnabled={false}
                initialRegion={{
                  latitude : item.lattitude,
                  longitude :item.longtitude,
                  latitudeDelta: 0.00122,
                 longitudeDelta: 0.0122
                  
                }}
                style={styles.map}
                onPress={this.pickLocationHandler}
                ref={ref => (this.map = ref)}
                >
               <MapView.Marker coordinate={{
                 latitude:item.lattitude,
                 longitude: item.longtitude,
                 latitudeDelta: 0.00122,
                 longitudeDelta: 0.0122
                  }}/>
                </MapView> 
              </View>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text>Location Details:</Text>
                <Text>Lattitude: {" " + item.lattitude}</Text>
                <Text>Longtitude: {" " + item.longtitude}</Text>
                <Text style={styles.textMsg} numberOfLines={1}>
                Your Experience:
                  {" " + item.message}
                </Text>

                <View style={{ width: 20 }}>
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.placeDeletedHandler(item)}
                  >
                    <Icon name="md-trash" color="red" size={30} />
                  </TouchableOpacity>
                </View>
              </View>
           
          </TouchableOpacity>
        ))}
      </View>
    );
  }
  componentDidMount() {
    this.props.onLoadPlaces();
  }
  componentDidUpdate() {
    this.props.onLoadPlaces();
    // this.props.onDeletePlace();
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces()),
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};

const mapStateToProps = state => {
  return {
    PlacesFromFireBase: state.selectPlace.places,
    isLoading: state.ui.isLoading
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Saved);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: "white",
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "#D8D8D8"
  },
  viewContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  map: {
    width: 200,
    height: 100
  },
  textMsg: {
    color: "#4f603c",
    marginLeft: "5%"
  },
  textName: {
    color: "#4f603c",
    marginLeft: "5%",
    fontWeight: "bold"
  },
  nameDateAlignment: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  imageDesign: {
    width: 100,
    height: 100
  }
});
