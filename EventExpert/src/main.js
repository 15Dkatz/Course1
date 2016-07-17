// grab an api key from EventBrite and use the fetch method to list data
// key is inputted by user
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

module.exports = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
