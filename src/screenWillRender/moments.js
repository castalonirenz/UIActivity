import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  SafeAreaView
} from "react-native";
import { getPlaces, deletePlace, updatePlace } from "../actions/Places";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import Heart from "react-native-vector-icons/Ionicons";
import MapView from "react-native-maps";

class Saved extends Component {
  state = {
    myArray: [],
   
    modalVisible: false,

    itemDetails: {
      itemData: null,
      itemImg: null,
      itemText: null,
      itemLat: 14.520445,
      itemLong: 121.053886,
      textEdit: null,
      itemKey: null
    }
  };

  letsSee(visible, item) {
    this.setModalVisible(visible);
    this.PassParams(item);
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    });
  }

  PassParams(item) {
    this.setState(prevState => {
      return {
        ...prevState,
        itemDetails: {
          ...prevState.itemDetails,
          itemKey: item.key,
          itemText: item.message,
          itemImg: item.image,
          itemLat: item.lattitude,
          itemLong: item.longtitude
        }
      };
    });
  }
  alertItemName = item => {
    alert(item.message + ": " + "\n" + item.lattitude + " " + item.key);
  };

  placeDeletedHandler = item => {
    this.props.onDeletePlace(item.key);
  };

  placeEditHandler = () => {
    this.props.onEditPlace(this.state.itemDetails);
    // alert(this.state.itemKey)
    this.setModalVisible(false);
    console.log(this.state.itemKey, this.state.textEdit);
  };

  editText = val => {
    this.setState(prevState => {
      return {
        ...prevState,
        itemDetails: {
          ...prevState.itemDetails,
          textEdit: val
        }
      };
    });
  };

  renderHeart = val => {
    const hearts = [];
    let i = 0;
    do {
      i < val
        ? hearts.push(<Heart name="md-heart" size={30} color="red" key={i} style={{paddingLeft: 5}}/>)
        : hearts.push(
            <Heart name="md-heart-outline" size={30} color="red" key={i} style={{paddingLeft: 5}}/>
          );

      i += 1;
    } while (i < 5);
    return hearts;
  };
  render() {
    let update = (
      <TouchableOpacity onPress={this.placeEditHandler}>
        <Icon name="md-checkmark-circle-outline" size={30} />
        {/* //<Icon name="md-trash" color="red" size={30} /> */}
      </TouchableOpacity>
    );
    if (this.props.isLoading) {
      update = <ActivityIndicator size={30} color="red" />;
    }

    return (
      <View style={styles.viewContainer}>
        <SafeAreaView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <ScrollView style={{ backgroundColor: "#FFE4E1" }}>
              <View style={styles.modalContainer}>
                <Text
                  style={{ fontSize: 23, fontWeight: "bold", color: "black" }}
                >
                  EDIT THIS ITEM
                </Text>

                <Image
                  source={{
                    uri: this.state.itemDetails.itemImg
                  }}
                  style={{ width: 150, height: 150 }}
                />

                <MapView
                  showsTraffic={true}
                  showsBuildings={true}
                
                  initialRegion={{
                    latitude: this.state.itemDetails.itemLat,
                    longitude: this.state.itemDetails.itemLong,
                    latitudeDelta: 0.00122,
                    longitudeDelta: 0.0122
                  }}
                  style={{ width: "80%", height: 250, marginTop: 20 }}
                  onPress={this.pickLocationHandler}
                  ref={ref => (this.map = ref)}
                >
                  <MapView.Marker
                    coordinate={{
                      latitude: this.state.itemDetails.itemLat,
                      longitude: this.state.itemDetails.itemLong,
                      latitudeDelta: 0.00122,
                      longitudeDelta: 0.0122
                    }}
                  />
                </MapView>

                <Text style={styles.textMsg}>
                  Your Caption: {this.state.itemDetails.itemText}
                </Text>
                <TextInput
                  style={styles.txtInput}
                  onChangeText={val => this.editText(val)}
                  value={this.state.itemDetails.textEdit}
                  placeholder="Enter something to edit your caption"
                  underlineColorAndroid="white"
                />

                {update}

                <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                  <Text>Close this modal</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Modal>
        </SafeAreaView>
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
                  latitude: item.lattitude,
                  longitude: item.longtitude,
                  latitudeDelta: 0.00122,
                  longitudeDelta: 0.0122
                }}
                style={styles.map}
                onPress={this.pickLocationHandler}
                ref={ref => (this.map = ref)}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: item.lattitude,
                    longitude: item.longtitude,
                    latitudeDelta: 0.00122,
                    longitudeDelta: 0.0122
                  }}
                />
              </MapView>
            </View>
            <View style={{ flex: 1, flexDirection: "column" }}>

             <View style={{flexDirection:"row"}}>
              {this.renderHeart(item.rating)}
              </View>
              <Text>Location Details:</Text>
              <Text>Lattitude: {" " + item.lattitude}</Text>
              <Text>Longtitude: {" " + item.longtitude}</Text>
              <Text style={styles.textMsg} numberOfLines={1}>
                Your Experience:
                {" " + item.message}
              </Text>

              <View style={{ flex: 1, flexDirection: "row" }}>
                <View>
                  <View style={{ width: 20 }}>
                    <TouchableOpacity
                      key={index}
                      onPress={() => this.placeDeletedHandler(item)}
                    >
                      <Icon name="md-trash" color="red" size={30} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ paddingLeft: 10 }}>
                  <View style={{ width: 23 }}>
                    <TouchableOpacity
                      key={index}
                      onPress={() => this.letsSee(true, item)}
                    >
                      <Icon name="md-create" color="blue" size={30} />
                    </TouchableOpacity>
                  </View>
                </View>
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
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces()),
    onDeletePlace: key => dispatch(deletePlace(key)),
    onEditPlace: itemDetails => dispatch(updatePlace(itemDetails))
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
  txtInput: {
    width: "80%"
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFE4E1"
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
