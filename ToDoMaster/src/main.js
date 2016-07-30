import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from 'react-native';

module.exports = React.createClass({
  getInitialState() {
    // for the purpose of this app, we will call things to-do, tasks
      // fake data that we will change later depending on input
    return {
      tasks: null,
      // for textInput
      task: '',
      completedTasks: null
    }
  },

  componentWillMount() {
    // grab the tasks and completedTasks local arrays
    AsyncStorage.getItem('tasks')
      .then((response) => {
        this.setState({tasks: JSON.parse(response)})
      });
    AsyncStorage.getItem('completedTasks')
      .then((response) => {
        this.setState({completedTasks: JSON.parse(response)})
      });
  },

  setStorage() {
    // set the tasks and completedTasks as the asyncStorage arrays
    console.log('this.state.tasks', this.state.tasks, 'stringified', JSON.stringify(this.state.tasks));
    AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    AsyncStorage.setItem('completedTasks', JSON.stringify(this.state.completedTasks));
  },

  renderList(tasks) {
    if (tasks) {
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
    }
  },


  renderCompleted(tasks) {
    if (tasks) {
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
    }
  },

  deleteTask(index) {
    let tasks = this.state.completedTasks;
    let completedTasks = tasks.slice(0, index).concat(tasks.slice(index+1));
    this.setState({
      completedTasks
    })
    this.setStorage();
  },

  completeTask(index) {
    let completedTask = this.state.tasks[index];
    let completedTasks = this.state.completedTasks;
    // here we can take advantage of es6 and use the spread operator make a our concatenation more neat
    completedTasks = completedTasks == null ? [completedTask] : [completedTask, ...completedTasks];
    let tasks = this.state.tasks;
    tasks = tasks.slice(0, index).concat(tasks.slice(index+1));
    this.setState({
      tasks,
      completedTasks
    });
    this.setStorage();
  },

  addTask() {
    // goal of addTask is to add the current task to this.state.tasks
    let tasks = this.state.tasks;
    let newTask = this.state.task;
    // switch placement of newTask and tasks around concat to insert at end instead of beginning
    tasks = tasks == null ? [newTask] : [newTask, ...tasks];
    this.setState({
      tasks
    });
    this.setStorage();
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
        {/*just use regular View until the end*/}
        <ScrollView>
          {this.renderList(this.state.tasks)}
          {this.renderCompleted(this.state.completedTasks)}
        </ScrollView>
      </View>
    )
  }
});

// don't teach fontFamily
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // styling to center overall content,
    backgroundColor: '#c8e6c9'
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Avenir'
  },
  task: {
    // flex: 1,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 20,
  },
  taskInput: {
    height: 50,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    margin: 15,
    marginBottom: 0,
    fontSize: 16,
    fontFamily: 'Avenir'
  },
  icon: {
    fontSize: 20,
    fontFamily: 'Avenir'
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#555',
    fontFamily: 'Avenir'
  }

})
