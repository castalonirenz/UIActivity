import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch
} from "react-native";
import { Header, Left, Right, Icon } from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";

import {signUpTwoAction} from '../actions/signUp'
import {connect} from 'react-redux'
class signUpTwo extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    emailText: "",
    isSwitchOn: false
  };

  emailInput = value => {
    this.setState({
      emailText: value
    });
  };

  Back = () => {
    this.props.navigation.goBack();
  };

  goToSignUpThree = () => {
    if (this.state.emailText === "") {
      alert("Please Enter your email");
    } else {
      this.setState({
        emailText: ""
      });
      this.props.navigation.navigate("SignUpLast");
      
      this.props.addEmail(this.state.emailText)
    }

    
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
            <Text style={styles.textDesign}>And, your email?</Text>
          </View>

          <Text style={{ marginRight: "67%", color: "white", marginTop: 15 }}>
            EMAIL
          </Text>

          <TextInput
            style={styles.textInputDesign}
            onChangeText={text => this.emailInput(text)}
            value={this.state.emailText}
            placeholder="Enter email address"
            underlineColorAndroid="white"
          />

          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "white" }}>
              I'd like to receive marketing and policy {"\n"}
              communications from Ting and its
              {"\n"}
              partners
            </Text>

            <Switch
              onValueChange={isSwitchOn => this.setState({ isSwitchOn })}
              value={this.state.isSwitchOn} onTintColor="yellow"
            />
          </View>

          <TouchableOpacity
            style={{ marginLeft: "75%" }}
            onPress={this.goToSignUpThree}
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

const mapToDispatchToProps = dispatch =>{
  return{
    addEmail:(email) => dispatch(signUpTwoAction(email))
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
export default connect(null, mapToDispatchToProps)(signUpTwo);
