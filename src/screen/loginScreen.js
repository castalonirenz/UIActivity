import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Header, Left, Right, Icon } from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";
class loginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    emailtext: "",
    userEnteredText: "",
    passwordText: "",

    showPass: true
  };

  emailInput = value => {
    this.setState({
      emailtext: value
    });
  };
  PassInput = value => {
    this.setState({
      passwordText: value
    });
  };

  showPassword = () => {
    this.setState({
      showPass: !this.state.showPass
    });
  };

  Back = () => {
    this.props.navigation.goBack();
  };
  loggedOn = () => {
    if (this.state.emailtext === "") {
      alert("Please fill out email");
    } else if (this.state.passwordText === "") {
      alert("Please fill out password");
    } else {
      this.setState({
        emailtext: "",
        passwordText: ""
      });
      this.props.navigation.navigate("Tab");
    }
  };

  render() {
    console.log("the app started")
    return (
      
      <View style={styles.container}>
        <Header style={{ backgroundColor: "#00A795" }}>
          <Left style={{ marginRight: "80%" }}>
            <Icon name="ios-arrow-back" onPress={this.Back} />
          </Left>
        </Header>
        
        <View style={styles.MainContainer}>
          <View style={styles.secondContainer}>
         
            <Text style={styles.textDesign}>Login</Text>
          </View>
          <Text style={{ marginRight: "67%", color: "white", marginTop: 15 }}>
            EMAIL
          </Text>
          <TextInput
            style={styles.textInputDesign}
            onChangeText={text => this.emailInput(text)}
            value={this.state.emailtext}
            placeholder="Enter Email Address"
            underlineColorAndroid="white"
          />
          <Text style={{ marginRight: "57%", color: "white", marginTop: 15 }}>
            PASSWORD
          </Text>

          <TouchableOpacity onPress={this.showPassword}>
            <Text style={{ marginLeft: "67%", color: "white" }}>SHOW</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.textInputDesign}
            onChangeText={text => this.PassInput(text)}
            value={this.state.passwordText}
            placeholder="Enter password"
            underlineColorAndroid="white"
            secureTextEntry={this.state.showPass}
          />

          <TouchableOpacity
            style={{ marginLeft: "75%" }}
            onPress={this.loggedOn}
          >
            <Ionicons
              name="ios-arrow-dropright-circle"
              color="white"
              size={50}
            />
          </TouchableOpacity>
        </View>
        
      </View>
      
    );
  }
  componentDidMount(){
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00A795",
   
  },
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00A795"
  },
  secondContainer: {
    marginRight: "75%"
  },
  textDesign: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white"
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
  },
  textInputDesign: {
    width: "80%"
  }
});

export default loginScreen;
