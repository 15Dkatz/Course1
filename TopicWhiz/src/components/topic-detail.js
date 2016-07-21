import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';

import styles from '../styles';

module.exports = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={()=>this.props.navigator.pop()}
        >
          <Text>
            Back
          </Text>
        </TouchableOpacity>

        <Text>
          Topic Detail
        </Text>
        <Text>
          {this.props.title}
        </Text>
        <Text>
          by {this.props.author}
        </Text>
      </View>
    )
  }
});




// needs an input field for writing a comment
