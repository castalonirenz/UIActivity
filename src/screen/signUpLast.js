import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { Header, Left, Right, Icon, DatePicker } from "native-base";
import {connect} from 'react-redux'
import Ionicons from "react-native-vector-icons/Ionicons";
import { signUpLastAction } from "../actions/signUp";
class signUpLast extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    firstNameText: "",
    lastNameText: "",
    emailText: ""
  };
  Back = () => {
    this.props.navigation.goBack();
  };

  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  goToLogin = () => {
     alert("Registration Complete, Proceeding to Login");
     this.props.navigation.navigate("Login");

    this.props.addBirthday(this.state.firstNameText,this.state.lastNameText,
      this.state.emailText,this.state.chosenDate.toString().substr(4, 12));
  };

  render() {
    const { navigation } = this.props;
    const firstname = navigation.getParam('firstname', 'No Firstname');
    const lastname = navigation.getParam('lastname', 'No Lastname')
    const email = navigation.getParam('email', 'No email')

    this.state.firstNameText = firstname
    this.state.lastNameText = lastname
    this.state.emailText = email

    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: "#00A795" }}>
          <Left style={{ marginRight: "80%" }}>
            <Icon name="ios-arrow-back" onPress={this.Back} />
          </Left>
        </Header>
        <View style={styles.MainContainer}>
          <View style={styles.secondContainer}>
            <Text style={styles.textDesign}>When is your Birthday?</Text>
          </View>

          <Text style={{ color: "white", marginTop: 15, marginRight: "10%" }}>
            You must be at least 18 years old to use Ting.
          </Text>

          <Text style={{ color: "white", marginRight: "25%" }}>
            Other People won't see your Birthday.
          </Text>

          <Text style={{ marginRight: "67%", color: "white", marginTop: 15 }}>
            Birthday
          </Text>
          
          <View style={{borderBottomWidth: 1, borderBottomColor: "white", width:"90%"}}>
          <DatePicker 
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(1950, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            
            timeZoneOffsetInMinutes={false}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"calendar"}
            placeHolderText="Select date"
            textStyle={{ color: "white" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate}
          />
           <Text>Date: {this.state.chosenDate.toString().substr(4, 12)}</Text>
          </View>
         
          
          <TouchableOpacity
            style={{ marginLeft: "75%" }}
            onPress={this.goToLogin}
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
    backgroundColor: "#00A795",
    
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
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginRight: "1%"
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

const mapDispatchToProps = dispatch=>{
  return{
    addBirthday: (fname,lname,email,birthday) => dispatch(signUpLastAction(fname,lname,email,birthday))
  }
}

export default connect(null,mapDispatchToProps) (signUpLast);
