import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ListView
} from 'react-native';

import globalStyles from '../styles';
import Firebase from 'firebase';
import {FIREBASE_URL} from './auth/authenticate';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

module.exports = React.createClass({
  getInitialState() {
    return ({
      userName: '',
      title: '',
      dataSource: ds.cloneWithRows([''])
    })
  },

  componentWillMount() {
    this.setState({
      userName: this.props.email.match(/(.+)@/)[1]
    })

    this.loadTopics();
  },

  loadTopics() {
    const ref = new Firebase(FIREBASE_URL);
    ref.once('value', (snapshot)=> {
      let topics = snapshot.val()['topics'];
      // convert this js Object into an array
      let topicsArr = [];
      for (var x in topics) {
        topicsArr.push(topics[x]);
      }
      this.setState({
        dataSource: ds.cloneWithRows(topicsArr)
      })
    })
  },

  renderRow(rowData) {
    return (
      <View style={styles.row}>
        <Text>
          {rowData.title}
        </Text>
        <Text>
          {rowData.author}
        </Text>
      </View>
    )
  },

  addTopic() {
    // add a topic to the firebase reference
    let topic = {
      title: this.state.title,
      author: this.state.userName,
      timeStamp: Date.now()
    }

    const topicsRef = new Firebase(FIREBASE_URL+'topics/');
    topicsRef.push(topic);

    this.loadTopics();
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={()=>this.props.navigator.pop()}
          >
            <Text style={styles.link}>
              Log out
            </Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {this.state.userName}
          </Text>
        </View>
        <View style={styles.body}>
          <TextInput
            placeholder='Something on your mind?'
            style={globalStyles.input}
            onChangeText={(text)=>this.setState({title: text})}
            onEndEditing={()=>this.addTopic()}
          />
          <ListView
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderRow(rowData)}
          />
        </View>
      </View>
    );
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    marginTop: 20,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  body: {
    flex: 24,
    paddingRight: 20,
    paddingLeft: 20
  },
  list: {
    flex: 1
  },
  row: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 16
  },

  link: {
    color: 'blue'
  }
})
