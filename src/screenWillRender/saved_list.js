import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import {saved_list} from '../myArray/image'
class SavedList extends Component {
  state = {
      mySavedList : saved_list
  }

  render() {
    return (
        <View style={{height:210}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        
        <View style={{marginLeft: 15}}>
          <Image
            source={{
              uri: this.state.mySavedList[0].img
            }}
            style={{ width: 150, height: 150 }}
          />
          <Text>{this.state.mySavedList[0].name}</Text>
          </View>

          <View style={{marginLeft: 15}}>
          <Image
            source={{
              uri: this.state.mySavedList[1].img
            }}
            style={{ width: 150, height: 150 }}
          />
          <Text>{this.state.mySavedList[1].name}</Text>
          </View>

          <View style={{marginLeft: 15}}>
          <Image
            source={{
              uri: this.state.mySavedList[2].img
            }}
            style={{ width: 150, height: 150 }}
          />
          <Text>{this.state.mySavedList[2].name}</Text>
          </View>

          <View style={{marginLeft: 15}}>
          <Image
            source={{
              uri: this.state.mySavedList[3].img
            }}
            style={{ width: 150, height: 150 }}
          />
          <Text>{this.state.mySavedList[3].name}</Text>
          </View>




        </ScrollView>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    imageView:{
      borderRadius: 5, 
      borderWidth: 2, 
      borderColor: "gray",
      marginLeft: 15
        
    }
  });
export default SavedList;
