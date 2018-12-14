import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "react-navigation";
import exploreScreen from "../screen/exploreScreen";
import MommentScreen from '../screen/momentScreen'

import messageScreen from "../screen/messageScreen";
import MapScreen from "../screen/mapScreen";
import profileScreen from '../screen/profileScreen'

class tabNavigator extends Component {
  render() {
    return (
      <View>
        <Text> Tab </Text>
      </View>
    );
  }
}
export const TabStack = createBottomTabNavigator(
  {
    Explore: {
      screen: exploreScreen,

      navigationOptions: {
        tabBarLabel: "Explore",

        tabBarIcon: ({ tintColor }) => (
          <Icon
            name={Platform.OS === "android" ? "md-search" : "ios-search"}
            color={tintColor}
            size={24}
          />
        )
      }
    },
    Saved: {
      screen: MommentScreen,

      navigationOptions: {
        tabBarLabel: "Saved",

        tabBarIcon: ({ tintColor }) => (
          <Icon
            name={
              Platform.OS === "android"
                ? "md-heart-outline"
                : "ios-heart-outline"
            }
            color={tintColor}
            size={24}
          />
        )
      }
    },
    Trips: {
      screen: MapScreen,

      navigationOptions: {
        tabBarLabel: "Trips",

        tabBarIcon: ({ tintColor }) => (
          <Icon
            name={Platform.OS === "android" ? "md-plane" : "ios-plane"}
            color={tintColor}
            size={24}
          />
        )
      }
    },
    Inbox: {
      screen: messageScreen,

      navigationOptions: {
        tabBarLabel: "Inbox",

        tabBarIcon: ({ tintColor }) => (
          <Icon
            name={
              Platform.OS === "android" ? "md-chatbubbles" : "ios-chatbubbles"
            }
            color={tintColor}
            size={24}
          />
        )
      }
    },
    Profile: {
      screen: profileScreen,

      navigationOptions: {
        tabBarLabel: "Profile",

        tabBarIcon: ({ tintColor }) => (
          <Icon
            name={Platform.OS === "android" ? "md-contact" : "ios-contact"}
            color={tintColor}
            size={24}
          />
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
);
export default tabNavigator;
