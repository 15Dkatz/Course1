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
                  this.completeTask(index);
                }}
              >
                <Text style={styles.icon}>
                  &#10003;
                </Text>
              </TouchableOpacity>
            </View>
          );
        })
    )
  },


  completeTask(index) {
    let completedTask = this.state.tasks[index];
    let completedTasks = this.state.completedTasks.concat([completedTask]);
    let tasks = this.state.tasks;
    tasks = tasks.slice(0, index).concat(tasks.slice(index+1));
    this.setState({
      tasks,
      completedTasks
    });
  },


  renderCompleted(tasks) {
    return (
      tasks.map((task, index) => {
        return (
          <View key={task} style={styles.task} >
            <Text style={styles.completedTask}>
              {task}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.deleteTask(index);
              }}
            >
              <Text style={styles.icon}>
                &#10005;
              </Text>
            </TouchableOpacity>
          </View>
        )
      })
    )
  },

  deleteTask(index) {
    let tasks = this.state.completedTasks;
    let completedTasks = tasks.slice(0, index).concat(tasks.slice(index+1));
    this.setState({
      completedTasks
    })
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
        <View style={styles.header}>
          <Text style={styles.headerText}>To-Do Master</Text>
        </View>
        <TextInput
          placeholder='Add a task...'
          style={styles.taskInput}
          onChangeText={(text) => {
            this.setState({
              task: text
            })
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
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20
  },
  task: {
    // flex: 1,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 20,
  },
  taskInput: {
    height: 50,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 5,
    margin: 15,
    marginBottom: 0,
    fontSize: 16
  },
  icon: {
    fontSize: 20
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#555'
  }

})
