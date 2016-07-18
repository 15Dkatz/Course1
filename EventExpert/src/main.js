// keys are typed by user
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Navigator
} from 'react-native';

import Events from './components/events';
import EventDetail from './components/event-detail'

let routes = {
  events: Events,
  eventDetail: EventDetail
}

module.exports = React.createClass({
  render() {
    return (
      <Navigator
        initialRoute={{name: 'events'}}
        renderScene={this.renderScene}
      />
    );
  },

  //this function needs the route and navigator parameters
  renderScene(route, navigator) {
    let Component = routes[route.name];
    return (
      <Component
        navigator={navigator}
        title={route.title}
      />
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
