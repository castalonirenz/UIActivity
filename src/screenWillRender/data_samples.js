import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { data_samples } from "../myArray/image";
import Icon from "react-native-vector-icons/Ionicons";

class explores extends Component {
  state = {
    myImage: data_samples
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ marginLeft: 15, width: 150 }}>
            <ImageBackground
              source={{
                uri: this.state.myImage[0].img
              }}
              style={{ width: 150, height: 150 }}
            >
              <TouchableOpacity style={styles.iconTouchable}>
                <Icon
                  name={
                    Platform.OS === "android"
                      ? "md-heart-outline"
                      : "ios-heart-outline"
                  }
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </ImageBackground>

            <Text style={{ color: "black" }}>
              {this.state.myImage[0].room_size}
            </Text>
            <Text style={{ color: "black" }}>{this.state.myImage[0].name}</Text>

            <Text style={styles.textTitle}>
              {this.state.myImage[0].room_title}
            </Text>

            <Text style={{ color: "black", marginTop: 10 }}>
              {this.state.myImage[0].chf}
            </Text>
          </View>

          <View style={{ marginLeft: 15, width: 150 }}>
            <ImageBackground
              source={{
                uri: this.state.myImage[1].img
              }}
              style={{ width: 150, height: 150 }}
            >
              <TouchableOpacity style={styles.iconTouchable}>
                <Icon
                  name={
                    Platform.OS === "android"
                      ? "md-heart-outline"
                      : "ios-heart-outline"
                  }
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={{ color: "black" }}>
              {this.state.myImage[1].room_size}
            </Text>
            <Text style={{ color: "black" }}>{this.state.myImage[1].name}</Text>

            <Text style={styles.textTitle}>
              {this.state.myImage[1].room_title}
            </Text>

            <Text style={{ color: "black", marginTop: 10 }}>
              {this.state.myImage[1].chf}
            </Text>
          </View>

          <View style={{ marginLeft: 15, width: 150 }}>
            <ImageBackground
              source={{
                uri: this.state.myImage[2].img
              }}
              style={{ width: 150, height: 150 }}
            >
              <TouchableOpacity style={styles.iconTouchable}>
                <Icon
                  name={
                    Platform.OS === "android"
                      ? "md-heart-outline"
                      : "ios-heart-outline"
                  }
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={{ color: "black" }}>
              {this.state.myImage[2].room_size}
            </Text>
            <Text style={{ color: "black" }}>{this.state.myImage[2].name}</Text>
            <Text style={styles.textTitle}>
              {this.state.myImage[2].room_title}
            </Text>

            <Text style={{ color: "black", marginTop: 10 }}>
              {this.state.myImage[2].chf}
            </Text>
          </View>

          <View style={{ marginLeft: 15, width: 150 }}>
            <ImageBackground
              source={{
                uri: this.state.myImage[3].img
              }}
              style={{ width: 150, height: 150 }}
            >
              <TouchableOpacity style={styles.iconTouchable}>
                <Icon
                  name={
                    Platform.OS === "android"
                      ? "md-heart-outline"
                      : "ios-heart-outline"
                  }
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={{ color: "black" }}>
              {this.state.myImage[3].room_size}
            </Text>
            <Text style={{ color: "black" }}>{this.state.myImage[3].name}</Text>
            <Text style={styles.textTitle}>
              {this.state.myImage[3].room_title}
            </Text>
            <Text style={{ color: "black", marginTop: 10 }}>
              {this.state.myImage[3].chf}
            </Text>
          </View>

          <View style={{ marginLeft: 15, width: 150 }}>
            <ImageBackground
              source={{
                uri: this.state.myImage[4].img
              }}
              style={{ width: 150, height: 150 }}
            >
              <TouchableOpacity style={styles.iconTouchable}>
                <Icon
                  name={
                    Platform.OS === "android"
                      ? "md-heart-outline"
                      : "ios-heart-outline"
                  }
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={{ color: "black" }}>
              {this.state.myImage[4].room_size}
            </Text>
            <Text style={{ color: "black" }}>{this.state.myImage[4].name}</Text>
            <Text style={styles.textTitle}>
              {this.state.myImage[4].room_title}
            </Text>
            <Text style={{ color: "black", marginTop: 10 }}>
              {this.state.myImage[4].chf}
            </Text>
          </View>

          <View style={{ marginLeft: 15, width: 150 }}>
            <ImageBackground
              source={{
                uri: this.state.myImage[5].img
              }}
              style={{ width: 150, height: 150 }}
            >
              <TouchableOpacity style={styles.iconTouchable}>
                <Icon
                  name={
                    Platform.OS === "android"
                      ? "md-heart-outline"
                      : "ios-heart-outline"
                  }
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={{ color: "black" }}>
              {this.state.myImage[5].room_size}
            </Text>
            <Text style={{ color: "black" }}>{this.state.myImage[5].name}</Text>
            <Text style={styles.textTitle}>
              {this.state.myImage[5].room_title}
            </Text>
            <Text style={{ color: "black", marginTop: 10 }}>
              {this.state.myImage[5].chf}
            </Text>
          </View>

          <View style={{ marginLeft: 15, width: 150 }}>
            <ImageBackground
              source={{
                uri: this.state.myImage[6].img
              }}
              style={{ width: 150, height: 150 }}
            >
              <TouchableOpacity style={styles.iconTouchable}>
                <Icon
                  name={
                    Platform.OS === "android"
                      ? "md-heart-outline"
                      : "ios-heart-outline"
                  }
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={{ color: "black" }}>
              {this.state.myImage[6].room_size}
            </Text>
            <Text style={{ color: "black" }}>{this.state.myImage[6].name}</Text>
            <Text style={styles.textTitle}>
              {this.state.myImage[6].room_title}
            </Text>
            <Text style={{ color: "black", marginTop: 10 }}>
              {this.state.myImage[6].chf}
            </Text>
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
  },
  iconTouchable: {
    marginLeft: "75%",
    width: 25,
    height: 25,
    marginTop: 10
  },
  textTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10
  }
});

export default explores;
