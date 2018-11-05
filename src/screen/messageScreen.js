import React, { Component } from "react";
import { View, Text, ListView, StyleSheet, ScrollView } from "react-native";
import List from "../screenWillRender/messageList";

class messageScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.HeaderStyle}> INBOX</Text>
        <Text style={styles.messageRead}>You have no unread messages.</Text>

        <ScrollView>
          <List />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  HeaderStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 26,
    marginLeft: 10
  },
  messageRead: {
    marginTop: "10%",
    marginLeft: 20
  }
});

export default messageScreen;
