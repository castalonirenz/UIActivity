import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import {getPlaces,deletePlace} from '../actions/addPlace'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

class Saved extends Component {
 
  state ={
    myArray : []
  }
  alertItemName = item => {
    alert(item.message + ": " + "\n" + item.lattitude+ " " + item.key);
  };

  placeDeletedHandler = item => {
    this.props.onDeletePlace(item.key);
    //alert(item.key)
  };
 

  render(){
  

  

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

            <View style={{ flex: 1, flexDirection: "column" }}>
             <Text>Location Details:</Text>
              <Text>Lattitude: {" "+item.lattitude}</Text>
                <Text>Longtitude: {" "+item.longtitude}</Text>
              <Text style={styles.textMsg} numberOfLines={1}>
                Your Experience: 
                {" "+item.message}
              </Text>

              <View style={{width:20}}>
              
             
              <TouchableOpacity key={index} onPress={() => this.placeDeletedHandler(item)}>
             <Icon name="md-trash" color="red" size={30}/>
              </TouchableOpacity>
              
              </View>
              
            </View>
          </View>
        </TouchableOpacity>
        
      ))}
   
    </View>
    );
  }
  componentDidMount(){
    this.props.onLoadPlaces();
  }
  componentDidUpdate(){
    this.props.onLoadPlaces();
   // this.props.onDeletePlace();
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces()),
    onDeletePlace: (key) => dispatch(deletePlace(key))
  };
};

const mapStateToProps = state => {
  return {
    PlacesFromFireBase: state.selectPlace.places,
    isLoading: state.ui.isLoading
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Saved)
// const mapDispatchToProps = dispatch => {
//   return {
//     addAll: (latLocation,longLocation,image,message) => 
//     dispatch(addPlace(latLocation,longLocation, image,  message))
//   }
// }


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
    flex:1,
    alignItems: "center",
    backgroundColor: "white",
   
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
    height: 100,
    
  }
});