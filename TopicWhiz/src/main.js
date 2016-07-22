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
import Topics from './components/topics';
import TopicDetail from './components/topic-detail';

let routes = {
  signIn: SignIn,
  signUp: SignUp,
  forgotPassword: ForgotPassword,
  topics: Topics,
  topicDetail: TopicDetail
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
        email={route.email}

        // for topic-detail
        userName={route.userName}
        title={route.title}
        author={route.author}
        uid={route.uid}
      />
    )
  }

});
