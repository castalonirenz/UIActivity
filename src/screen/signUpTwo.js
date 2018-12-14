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

import { signUpTwoAction, tryAuth } from "../actions/signUp";
import { connect } from "react-redux";

// const { navigation } = this.props;
// const firstname = navigation.getParam('firstname', 'No Firstname');
// const lastname = navigation.getParam('lastname', 'No Lastname')

class signUpTwo extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    emailText: "",
    passText:"",

    isSwitchOn: false
  };

  emailInput = value => {
    
    this.setState({
      emailText: value
    });
  };
  passInput = value => {
    this.setState({
      passText: value
    });
  };

  Back = () => {
    this.props.navigation.goBack();
  };

  goToSignUpThree = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (this.state.emailText === "") {
      alert("Please Enter your email");
    } 
    if (reg.test(this.state.emailText)=== false) {
      alert("Invalid Email");
    }else {
      this.setState({
        emailText: "",
        passText: ""
      });
      this.props.navigation.navigate("SignUpLast");
      
      // const signUpData ={
      //   email: this.state.emailText,
      //   password: this.state.passText
      
      // }

      // this.props.onSignUp(signUpData);
     this.props.addEmail(this.state.emailText, this.state.passText);
    }
  };

  

  render() {




    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: "#88cbea" }}>
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
          {/* <Text>{firstname}</Text> */}

          <TextInput
            style={styles.textInputDesign}
            onChangeText={text => this.emailInput(text)}
            value={this.state.emailText}
            placeholder="Enter email address"
            keyboardType="email-address"
            underlineColorAndroid="white"
          />

          <TextInput
            style={styles.textInputDesign}
            onChangeText={text => this.passInput(text)}
            value={this.state.passText}
            placeholder="Enter password"
            underlineColorAndroid="white"
            secureTextEntry={true}
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
              value={this.state.isSwitchOn}
              onTintColor="yellow"
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

const mapToDispatchToProps = dispatch => {
  return {
    addEmail: (email,pass) => dispatch(signUpTwoAction(email,pass)),
   // onSignUp: signUpData => dispatch(tryAuth(signUpData))
  };
};
export default connect(
  null,
  mapToDispatchToProps
)(signUpTwo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#88cbea"
  },
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#88cbea"
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
