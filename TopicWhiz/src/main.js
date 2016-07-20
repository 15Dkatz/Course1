import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Navigator
} from 'react-native';

import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import ForgotPassword from './components/auth/forgotPassword';
import App from './components/app';

let routes = {
  signIn: SignIn,
  signUp: SignUp,
  app: App,
  forgotPassword: ForgotPassword
}

module.exports = React.createClass({
  render() {
    return (
      <Navigator
        initialRoute={{name: 'signIn'}}
        renderScene={this.renderScene}
        configureScene={() => {return Navigator.SceneConfigs.FloatFromRight}}
      />
    )
  },

  renderScene(route, navigator) {
    let Component = routes[route.name];
    return (
      <Component
        navigator={navigator}
        uid={route.uid}
      />
    )
  }

});
