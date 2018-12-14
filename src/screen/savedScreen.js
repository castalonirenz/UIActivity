import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { saved_list } from "../myArray/image";
class Saved extends Component {
  state = {
    SavedList: saved_list
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <Text style={styles.textStyle}> {this.state.SavedList[1].name}</Text>
        <View style={styles.container}>
          <Image
            source={{
              uri: this.state.SavedList[1].img
            }}
            style={styles.imageStyle}
          />
        </View>

        <Text style={styles.textStyle}> {this.state.SavedList[2].name}</Text>
        <View style={styles.container}>
          <Image
            source={{
              uri: this.state.SavedList[2].img
            }}
            style={styles.imageStyle}
          />
        </View>

        <Text style={styles.textStyle}> {this.state.SavedList[3].name}</Text>
        <View style={styles.container}>
          <Image
            source={{
              uri: this.state.SavedList[3].img
            }}
            style={styles.imageStyle}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 20
  },
  imageStyle: {
    width: 300,
    height: 200
  }
});

export default Saved;
