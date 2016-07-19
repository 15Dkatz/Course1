import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import styles from './styles';
import { signIn } from './authenticate';

module.exports = React.createClass({
  getInitialState() {
    return({
      email: null,
      password: null
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          placeholder='Email'
          style={styles.input}
          onChangeText={(text)=>{
            this.setState({
              email: text
            })
          }}
        />
        <TextInput
          placeholder='Password'
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
        <TouchableOpacity
          onPress={()=>signIn(this.state.email, this.state.password, this.props.navigator)}
        >
          <Text style={styles.button}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{
            this.props.navigator.push({
              name: 'signUp'
            })
          }}
        >
          <Text style={styles.link}>Sign Up</Text>
          <Text style={styles.link}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    );
  }
});
