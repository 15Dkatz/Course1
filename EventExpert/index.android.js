import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import Main from './src/main';

class EventExpert extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('EventExpert', () => EventExpert);