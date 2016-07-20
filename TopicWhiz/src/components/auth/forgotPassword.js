import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import styles from '../../styles';
import {ref} from './authenticate';

module.exports = React.createClass({
  getInitialState() {
    return ({
      email: '',
      result: ''
    })
  },

  changePassword() {
    ref.resetPassword({
      email: this.state.email
    }, error => {
      if (error) {
        switch(error.code) {
          case 'INVALID_USER':
            this.setState({result: 'Type in a registered email'});
            break;
          default:
            this.setState({result: 'Error resetting password.'});
            break;
        }
      } else {
        this.setState({result: 'Email to reset password sent successfully.'})
      }
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.feedback}>{this.state.result}</Text>
        <TextInput
          placeholder='Email'
          style={styles.input}
          onChangeText={(text)=>{
            this.setState({
              email: text
            })
          }}
        />
        <TouchableOpacity
          onPress={()=>this.changePassword()}
        >
          <Text style={styles.button}>
            Send Reset Email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>this.props.navigator.pop()}
        >
          <Text style={styles.link}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
})
