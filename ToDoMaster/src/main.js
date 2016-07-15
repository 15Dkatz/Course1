//Should I teach the ListView component or save it until a later section?

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

module.exports = React.createClass({
  getInitialState() {
    // for the purpose of this app, we will call things to-do, tasks
      // fake data that we will change later depending on input
    return {
      tasks: ['Take out the trash', 'Get groceries', 'Send mail']
    }
  },

  renderList(tasks) {
    return (
      <View>
        {
          this.state.tasks.map((task) => {
            return (
              <Text key={task}>
                {task}
              </Text>
            );
          })
        }
      </View>
    )
  },

  render() {
    return (
      <View style={styles.container}>
        {this.renderList(this.state.tasks)}
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // styling to center overall content
    justifyContent: 'center',
    alignItems: 'center'
  }
})
