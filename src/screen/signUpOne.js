import React, { Component } from "react";

import {signUpOneAction} from '../actions/signUp'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Header, Left, Right, Icon } from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

class signUpOne extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    firstNameText: "",
    userEnteredText: "",
    lastNameText: ""
  };

  firstNameInput = value => {
    this.setState({
      firstNameText: value
    });
  };
  lastNameInput = value => {
    this.setState({
      lastNameText: value
    });
  };

  goToSignUpTwo = () => {
    if (this.state.firstNameText === "") {
      alert("Please fill out firstname");
    } else if (this.state.lastNameText === "") {
      alert("Please fill out lastname");
    } else {
      this.setState({
        firstNameText: "",
        lastNameText: ""
      });
      this.props.addFirstLastName(
        this.state.firstNameText,
        this.state.lastNameText
      );
      this.props.navigation.navigate("SignUpTwo");
    }

    //  alert(this.state.lastNameText)
  };
  Back = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: "#00A795" }}>
          <Left style={{ marginRight: "80%" }}>
            
            <Icon name="ios-arrow-back" onPress={this.Back} />
          </Left>
        </Header>
        <View style={styles.MainContainer}>
          <View style={styles.secondContainer}>
            <Text style={styles.textDesign}>What is your name?</Text>
          </View>

          <Text style={{ marginRight: "57%", color: "white", marginTop: 15 }}>
            FIRST NAME
          </Text>

          <TextInput
            style={styles.textInputDesign}
            onChangeText={text => this.firstNameInput(text)}
            value={this.state.firstNameText}
            placeholder="Enter first name"
            underlineColorAndroid="white"
          />
          <Text style={{ marginRight: "57%", color: "white", marginTop: 15 }}>
            LAST NAME
          </Text>

          <TextInput
            style={styles.textInputDesign}
            onChangeText={text => this.lastNameInput(text)}
            value={this.state.lastNameText}
            placeholder="Enter last name"
            underlineColorAndroid="white"
          />

          <TouchableOpacity
            style={{ marginLeft: "75%" }}
            onPress={this.goToSignUpTwo}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00A795"
  },
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00A795"
  },
  secondContainer: {
    marginRight: "28%"
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

const mapDispatchToProps = dispatch => {
  return {
    addFirstLastName: (fname, lname) => dispatch(signUpOneAction(fname, lname))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(signUpOne);
