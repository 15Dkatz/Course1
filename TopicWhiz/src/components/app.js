// accessible after authentication

import React, { Component } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import styles from '../styles';

module.exports = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Authenticated
        </Text>
        <Text>
          {this.props.uid}
        </Text>
        <TouchableOpacity
          onPress={()=>this.props.navigator.pop()}
        >
          <Text style={styles.link}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
})
