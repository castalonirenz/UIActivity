import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {messageDetails} from '../myArray/message'
class messageList extends Component {
    state = {
        msgDetails:messageDetails
     }
     alertItemName = (item) => {
        alert(item.name+": " + "\n" + item.msg)
     }

  render() {
    return (
        <View style={styles.viewContainer}>
        {
           this.state.msgDetails.map((item, index) => (
            
              <TouchableOpacity
                 key = {item.id}
                 style = {styles.container}
                 onPress = {() => this.alertItemName(item)}>

                <View style={{flex: 1, flexDirection:"row", }}>
                <Image source={{
                    uri: item.img
                }}
                style={styles.imageDesign}>
                </Image>
               
                <View style={{flex: 1, flexDirection:"column"}}>   

                <View style={styles.nameDateAlignment}>

                <Text style = {styles.textName}>
                    {item.name} 
                 </Text>

                  <Text>
                    {item.date}
                 </Text>

                   </View> 
                  <Text style = {styles.textMsg}>
                    {item.msg}
                 </Text>
                
                 </View>
                 </View>
                
              </TouchableOpacity>
              
           ))
        }
     </View>
    );
  }
}
const styles = StyleSheet.create ({
    container: {
       padding: 10,
       marginTop: 3,
       backgroundColor: 'white',
       width: "90%",
        borderRadius: 25,
    },
    viewContainer:{
        alignItems: "center",
        
    },
    textMsg: {
       color: '#4f603c',
       marginLeft: "5%"
    },
    textName: {
        color: '#4f603c',
        marginLeft: "5%",
        fontWeight:"bold"
     },
    nameDateAlignment:{
        flex: 1, 
        flexDirection:"row", 
        justifyContent:"space-between"
    },
    imageDesign:{
        width: 50, 
        height: 50, 
        borderRadius: 25
    }
 })

export default messageList;
