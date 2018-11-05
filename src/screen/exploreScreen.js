import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import ExploreRender from "../screenWillRender/explores";
import DataSamplesRender from "../screenWillRender/data_samples";
import SavedListRender from "../screenWillRender/saved_list";
class exploreScreen extends Component {
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 30 }}>
            {" "}
            Explore
          </Text>

          <ExploreRender />

          <Text style={{ color: "black", fontWeight: "bold", fontSize: 30 }}>
            {" "}
            Zurich
          </Text>

          <DataSamplesRender />
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 30 }}>
            {" "}
            Stockholm
          </Text>

          <SavedListRender />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white"
  }
});

export default exploreScreen;
