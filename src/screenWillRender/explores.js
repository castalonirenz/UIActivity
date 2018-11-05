import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image
} from "react-native";
import { explores } from "../myArray/image";
class dataSamplesRender extends Component {
  state = {
    exploresImage: explores
  };

  render() {
    return (
      <View style={{ height: 180 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.imageView}>
            <ImageBackground
              source={{
                uri: this.state.exploresImage[0].img
              }}
              style={{ width: 150, height: 150 }}
            />
            <Text>{this.state.exploresImage[0].name}</Text>
          </View>

          <View style={styles.imageView}>
            <Image
              source={{
                uri: this.state.exploresImage[1].img
              }}
              style={{ width: 150, height: 150 }}
            />
            <Text>{this.state.exploresImage[1].name}</Text>
          </View>

          <View style={styles.imageView}>
            <Image
              source={{
                uri: this.state.exploresImage[2].img
              }}
              style={{ width: 150, height: 150 }}
            />
            <Text>{this.state.exploresImage[2].name}</Text>
          </View>

          <View style={styles.imageView}>
            <Image
              source={{
                uri: this.state.exploresImage[3].img
              }}
              style={{ width: 150, height: 150 }}
            />
            <Text>{this.state.exploresImage[3].name}</Text>
          </View>

          <View style={styles.imageView}>
            <Image
              source={{
                uri: this.state.exploresImage[4].img
              }}
              style={{ width: 150, height: 150 }}
            />
            <Text>{this.state.exploresImage[4].name}</Text>
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
  imageView: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "gray",
    marginLeft: 15
  }
});

export default dataSamplesRender;
