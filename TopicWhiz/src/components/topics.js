import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ListView
} from 'react-native';

import styles from '../styles';
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

    let ref = new Firebase(FIREBASE_URL);

    ref.on('child_changed', (childSnapshot, prevChildKey) => {
      console.log('childSnapshot', childSnapshot);
    })
//     firebaseRef.on('child_changed', function(childSnapshot, prevChildKey) {
//   // code to handle child data changes.
// });
  },

  loadTopics() {
    const ref = new Firebase(FIREBASE_URL);
    ref.once('value', (snapshot)=> {
      let topics = snapshot.val()['topics'];
      // convert this js Object into an array for listRendering
      let topicsArr = [];
      for (var x in topics) {
        let topicObj = topics[x];
        // create the uid as the uid
        topicObj.uid = x;
        topicsArr.push(topicObj);
      }

      // SORT the topics by timeStamp
      this.setState({
        dataSource: ds.cloneWithRows(topicsArr)
      })
    })
  },

  detail(data) {
    console.log('data', data);
    // pass title, and author
    this.props.navigator.push({
      name: 'topicDetail',
      userName: this.state.userName,
      title: data.title,
      author: data.author,
      uid: data.uid
    })
  },

  renderRow(rowData) {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => this.detail(rowData)}
      >
        <Text style={styles.rowTitle}>
          {rowData.title}
        </Text>
        <Text>
          by {rowData.author}
        </Text>
      </TouchableOpacity>
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
    this.setState({title: ''})
    this.loadTopics();
  },

  render() {
    return (
      <View style={styles.flexContainer}>
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
            style={styles.input}
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

const localStyles = StyleSheet.create({
})
