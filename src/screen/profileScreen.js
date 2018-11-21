import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { connect } from "react-redux";
import { logout } from '../actions/login';

class ProfileScreen extends Component {


SignOut = () =>{
Alert.alert(
    'Sign Out',
    'Do you really want to Sign out?',[
        {text: "No", style:'cancel'},
        {text: "Yes", onPress:() =>
        this.props.onLogout() +
        this.props.navigation.navigate("Auth")
    }
    ]
)

}

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.customButton} onPress={this.SignOut}>
        <Text> Logout </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:"center",
        backgroundColor:"#313837"
    },
    customButton:{
        borderRadius: 25,
        backgroundColor:"white"

    }

})

const mapDispatchToProps = dispatch =>{
    return{
        onLogout: () => dispatch(logout())
    }

}
export default connect(null, mapDispatchToProps)(ProfileScreen)


