import React, { Component } from 'react';
import { View, Text,Platform } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {createBottomTabNavigator } from "react-navigation";
import exploreScreen from '../screen/exploreScreen';


class tabNavigator extends Component {
   

  render() {
    return (
      <View>
        <Text> Tab </Text>
      </View>
    );
  }
}
export const TabStack = createBottomTabNavigator({
    Explore: {
            screen: exploreScreen,
      
            navigationOptions: {
              tabBarLabel: "Explore",
              
      
              tabBarIcon: ({ tintColor }) => (
                <Icon name="md-search" color={tintColor} size={24} />
              )
            }
          },
          Saved: {
            screen: exploreScreen,
      
            navigationOptions: {
              tabBarLabel: "Saved",
      
              tabBarIcon: ({ tintColor }) => (
                <Icon name="md-heart" color={tintColor} size={24} />
              )
            }
          },
          Trips: {
            screen: exploreScreen,
      
            navigationOptions: {
              tabBarLabel: "Trips",
      
              tabBarIcon: ({ tintColor }) => (
                <Icon name="md-plane" color={tintColor} size={24} />
              )
            }
          },
          Inbox: {
            screen: exploreScreen,
      
            navigationOptions: {
              tabBarLabel: "Inbox",
      
              tabBarIcon: ({ tintColor }) => (
                <Icon name="md-chatbubbles" color={tintColor} size={24} />
              )
            }
          },
          Profile: {
            screen: exploreScreen,
      
            navigationOptions: {
              tabBarLabel: "Profile",
      
              tabBarIcon: ({ tintColor }) => (
                <Icon name="md-contact" color={tintColor} size={24} />
              )
            }
          }
  },
  {
    initialRouteName: "Explore",
    tabBarPosition: "bottom",
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: "orange",
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "#f2f2f2",
        borderTopWidth: 0.5,
        borderTopColor: "grey",
        height: 60
      },
      indicatorStyle: {
        height: 0
      },
      showIcon: true
    }
  }
  )
export default tabNavigator;
