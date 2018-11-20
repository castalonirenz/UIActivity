import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Header, Left, Right, Icon } from "native-base";
import {loginAction} from '../actions/login'
import Ionicons from "react-native-vector-icons/Ionicons";
import {connect} from 'react-redux'
  
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

  componentDidUpdate(){
    if(this.props.isSuccessSign === true){
      this.props.navigation.navigate("Tab");
      
    }
    
  }
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
    this.props.loginScreen(this.state.emailtext,this.state.passwordText)
   
    }

  
  };
  
  render() {
    console.log("log screen in starter")
    let signInSubmit = (
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
    )

    if (this.props.isLoading) {
      signInSubmit = <ActivityIndicator size={30} color="gray"/>;
    }

    return (
      
      <View style={styles.container}>
        <Header style={{ backgroundColor: "#313837" }}>
          <Left style={{ marginRight: "80%" }}>
            <Icon name="ios-arrow-back"  onPress={this.Back} />
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
            underlineColorAndroid="transparent"
          />

          <View style={{flexDirection:"row", alignItems:"center", marginTop:20}}>
          <Text style={{ marginRight: "50%", color: "white"}}>
            PASSWORD
          </Text>

          <TouchableOpacity onPress={this.showPassword}>
          <Ionicons name="md-eye" size={30} color="white"/>
          </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textInputDesign}
            onChangeText={text => this.PassInput(text)}
            value={this.state.passwordText}
            placeholder="Enter password"
            underlineColorAndroid="transparent"
            secureTextEntry={this.state.showPass}
          />

          {signInSubmit}
          
        </View>
        
      </View>
      
    );
  }

}
const mapStateToProps = state =>{
  return{
    isSuccessSign: state.auth.isSuccessSign,
    isLoading: state.ui.isLoading,
  }
  
}
const mapDispatchToProps = dispatch=>{
  return{
    loginScreen: (email,pass) => dispatch(loginAction(email,pass))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (loginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313837",
   
  },
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#313837"
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
    width: "80%",
    backgroundColor:"white",
    borderRadius: 25,
    textAlign: "center",
    height: 60
  
  }
});


