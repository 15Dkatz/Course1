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
  getInitialState() {
    return ({
      userName: ''
    })
  },

  componentWillMount() {
    // creating a userName with regex
    this.setState({userName: this.props.email.match(/(.+)@/)[1]})
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Authenticated
        </Text>
        <Text>
          {this.props.uid}
        </Text>
        <Text>
          {this.state.userName}
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
