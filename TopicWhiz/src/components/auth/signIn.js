import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import styles from '../../styles';
import { ref } from './authenticate';

module.exports = React.createClass({
  getInitialState() {
    return({
      email: '',
      password: '',
      result: ''
    })
  },

  signIn() {
    console.log('attempting a sign in');
    ref.authWithPassword({
      email: this.state.email,
      password: this.state.password
    }, (error, userData) => {
      if (error) {
        console.log('Login failed', error);
        this.setState({result: `${error}`.substring(7)});
      } else {
        console.log('Authenticated successfully', userData);
        this.props.navigator.push({
          name: 'app',
          uid: userData.uid,
          email: this.state.email
        })
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
          onPress={() => this.signIn()}
        >
          <Text style={styles.button}>Sign In</Text>
        </TouchableOpacity>
        <View style={localStyles.links}>
          <TouchableOpacity
            onPress={()=>{
              this.props.navigator.push({
                name: 'forgotPassword'
              })
            }}
          >
            <Text style={styles.link}>Forgot your password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{
              this.props.navigator.push({
                name: 'signUp'
              })
            }}
          >
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

const localStyles = StyleSheet.create({
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
