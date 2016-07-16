//Should I teach the ListView component or save it until a later section?

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

module.exports = React.createClass({
  getInitialState() {
    // for the purpose of this app, we will call things to-do, tasks
      // fake data that we will change later depending on input
    return {
      tasks: ['Take out the trash', 'Get groceries', 'Send mail'],
      // for textInput
      task: ''
    }
  },

  renderList(tasks) {
    return (
        this.state.tasks.map((task, index) => {
          return (
            <View key={task} style={styles.task}>
              <Text>
                {task}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.deleteTask(task, index);
                }}
              >
                <Text style={styles.checkMark}>
                  &#10003;
                </Text>
              </TouchableOpacity>
            </View>
          );
        })
    )
  },

  deleteTask(task, index) {
    let tasks = this.state.tasks.splice(index, 1);
    this.setState(tasks);
  },

  addTask() {
    // goal of addTask is to add the current task to this.state.tasks
    let tasks = this.state.tasks.concat([this.state.task]);
    this.setState({
      tasks
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder='Add a task...'
          style={styles.taskInput}
          onChangeText={(text) => {
            this.setState({
              task: text
            })
            console.log(this.state.task);
          }}
          onEndEditing={
            () => {
              this.addTask()
            }
          }
        />
        {this.renderList(this.state.tasks)}
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // styling to center overall content,
  },
  task: {
    // flex: 1,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 20
  },
  taskInput: {
    height: 50,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 5,
    margin: 30,
    marginBottom: 0,
  },
  checkMark: {
    fontSize: 20
  }

})
