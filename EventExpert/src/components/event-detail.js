import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

module.exports = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text> Event Details </Text>
        <Text> {this.props.title} </Text>
      </View>
    );
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
