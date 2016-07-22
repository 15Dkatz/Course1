// Change that post button

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ListView
} from 'react-native';

import styles from '../styles';
import { FIREBASE_URL } from './auth/authenticate';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

module.exports = React.createClass({
  getInitialState() {
    return ({
      comment: null,
      comments: null,
      dataSource: ds.cloneWithRows('')
    })
  },

  componentDidMount() {
    this.loadComments();
  },

  loadComments() {
    const topicRef = new Firebase(`${FIREBASE_URL}/topics/${this.props.uid}`);
    topicRef.once('value', (snapshot) => {
      let comments = snapshot.val()['comments'];
      if (!comments) {
        comments = [];
      }
      console.log('comments', comments);
      this.setState({
        dataSource: ds.cloneWithRows(comments)
      })
    })
  },

  postComment() {
    const commentsRef = new Firebase(`${FIREBASE_URL}/topics/${this.props.uid}/comments/`);
    let newComment = {
      author: this.props.userName,
      comment: this.state.comment,
      timeStamp: Date.now()
    }
    commentsRef.push(newComment);
    this.loadComments();
  },

  renderRow(rowData) {
    console.log('rowData', rowData);
    return(
      <View style={styles.row}>
        <Text style={localStyles.comment}>
          {rowData.comment}
        </Text>
        <Text>
          by {rowData.author}
        </Text>
      </View>
    )
  },

  render() {
    return (
      <View style={styles.flexContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={()=>this.props.navigator.pop()}
          >
            <Text style={styles.link}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text style={localStyles.title}>
            {this.props.title}
          </Text>
          <Text style={localStyles.subtitle}>
            by {this.props.author}
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Add a comment...'
            onChangeText={(text) =>
              this.setState({comment: text})}
            onEndEditing={()=>this.postComment()}
          />
          {/*<TouchableOpacity
            onPress={()=>this.postComment()}
          >
            <Text style={styles.button}>Post</Text>
          </TouchableOpacity>*/}
          <ListView
            styles={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderRow(rowData)}
          />
        </View>
      </View>
    )
  }
});

const localStyles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14
  },
  comment: {
    color: '#777'
  }
})



// needs an input field for writing a comment
