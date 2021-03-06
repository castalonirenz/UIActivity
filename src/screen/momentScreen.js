import React, { Component } from "react";
import { View, Text, ListView, StyleSheet, ScrollView } from "react-native";
import Moments from "../screenWillRender/moments";

class messageScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.HeaderStyle}> Moments</Text>
        

        <ScrollView style={{backgroundColor:"#313837"}}>
          <Moments />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313837"
  },
  HeaderStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 26,
    marginLeft: 10
  },
  messageRead: {
    marginTop: "10%",
    marginLeft: 20
  }
});

export default messageScreen;
