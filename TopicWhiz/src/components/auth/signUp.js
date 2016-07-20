import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from '../../styles';
import {ref} from './authenticate';

module.exports = React.createClass({
  getInitialState() {
    return ({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      result: ''
    })
  },

    signUp() {
    ref.createUser({
      email: this.state.email,
      password: this.state.password
    }, (error, userData) => {
      if (error) {
        switch (error.code) {
          case 'EMAIL_TAKEN':
            this.setState({result: 'The new account is already in use'});
            break;
          case 'INVALID_EMAIL':
            this.setState({result: 'The specified email is not a valid email'});
            break;
          default:
            this.setState({result: `Error creating user: ${error}`});
            break;
        }
      } else {
        navigator.push({
          name: 'app',
          uid: userData.uid,
          email: this.state.email
        })
      }
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.feedback}>{this.state.result}</Text>
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
          onPress={()=>this.signUp()}
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
