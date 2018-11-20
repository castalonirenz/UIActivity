import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class homeScreen extends Component {
  login = () => {
    this.props.navigation.navigate("Login");
  };
  signUp = () => {
    this.props.navigation.navigate("SignUpOne");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <Text style={styles.textDesign}>Welcome to Ting</Text>
        </View>
        <TouchableOpacity style={styles.customButton} onPress={this.login}>
          <Text style={{ color: "#00A795" }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.customButton} onPress={this.signUp}>
          <Text style={{ color: "#00A795" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#313837"
  },
  secondContainer: {
    marginRight: "35%"
  },
  textDesign: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black"
  },
  customButton: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderRadius: 25,
    backgroundColor: "white",
    width: "70%",
    height: 40,
    marginTop: 10
  }
});

export default homeScreen;
