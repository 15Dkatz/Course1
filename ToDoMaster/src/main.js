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
      task: '',
      completedTasks: []
    }
  },

  renderList(tasks) {
    return (
        tasks.map((task, index) => {
          return (
            <View key={task} style={styles.task}>
              <Text>
                {task}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.completeTask(task, index);
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

  renderCompleted(tasks) {
    return (
      tasks.map((task) => {
        return (
          <View style={styles.task} key={task}>
            <Text style={styles.completedTask}>
              {task} - completed
            </Text>
          </View>
        )
      })
    )
  },

  completeTask(task, index) {
    let completedTask = this.state.tasks[index];
    let completedTasks = this.state.completedTasks.concat([completedTask]);
    let tasks = this.state.tasks;
    tasks = tasks.slice(0, index).concat(tasks.slice(index+1));
    this.setState({
      tasks,
      completedTasks
    });
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
          onEndEditing={(text) => {
            this.addTask()
          }}
        />
        {this.renderList(this.state.tasks)}
        {this.renderCompleted(this.state.completedTasks)}
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
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#555'
  }

})
