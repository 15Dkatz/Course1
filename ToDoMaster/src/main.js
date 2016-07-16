//Should I teach the ListView component or save it until a later section?

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
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
        this.state.tasks.map((task) => {
          return (
            <View key={task} style={styles.task}>
              <Text>
                {task}
              </Text>
            </View>
          );
        })
    )
  },

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder='add a task'
          style={styles.taskInput}
        />
        {this.renderList(this.state.tasks)}
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // styling to center overall content
  },
  task: {
    // flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1
  },
  taskInput: {
    height: 50
  }

})
