import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from './styles';
import {signUp} from './authenticate';

module.exports = React.createClass({
  getInitialState() {
    return ({
      firstName: null,
      lastName: null,
      email: null,
      password: null
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          placeholder='First Name'
          style={styles.input}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <TextInput
          placeholder='Last Name'
          style={styles.input}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
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
          onPress={()=>signUp(this.state.email, this.state.password, this.state.firstName, this.state.lastName, this.props.navigator)}
        >
          <Text style={styles.button}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigator.push( {
              name: 'signIn'
            })
          }}
        >
          <Text style={styles.link}>
            Already signed up? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
});
