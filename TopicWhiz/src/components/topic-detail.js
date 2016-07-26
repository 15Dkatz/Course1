// attempt to place the firebase references to the state
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
      dataSource: ds.cloneWithRows(''),
      topic_url: ''
    })
  },

  componentWillMount() {
    this.setState({topic_url: `${FIREBASE_URL}/topics/${this.props.row_uid}`})
  },

  componentDidMount() {
    this.loadComments();
  },

  loadComments() {
    const topicRef = new Firebase(this.state.topic_url);
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
    const commentsRef = new Firebase(`${this.state.topic_url}/comments/`);
    let newComment = {
      author: this.props.userName,
      comment: this.state.comment,
      timeStamp: Date.now()
    }
    commentsRef.push(newComment);
    this.loadComments();
  },

  contains(array, val) {
    return (array.indexOf(val)>-1);
  },

  // don't teach this one.
  flag() {
    // access the reference for this topic
    const flagsRef = new Firebase(`${this.state.topic_url}/flaggers/`);
    const ref = new Firebase(this.state.topic_url);
    // add this user's uid to the array of 'flaggers' if not already there
      // check if the array of flaggers has the uid
      // if yes, do nothing
    ref.once('value', (snapshot) => {
      let flaggers = snapshot.val()['flaggers'];
      // console.log('flaggers', flaggers);
      // console.log('flaggers.length', flaggers.length);
      if (flaggers) {
        if (Object.keys(flaggers).length > 2) {
          // if the list of flaggers exceeds two, hence three users have flagged the content, then it gets deleted
          // removes the entire topicRef
          let topicRef = new Firebase(this.state.topic_url);
          topicRef.remove();
          // if topic deleted, reset to the topics page
          let {uid, email} = this.props;
          this.props.navigator.push({
            name: 'topics',
            uid,
            email
          });
        }

        let uids = [];
        for (var key in flaggers) {
          uids.push(flaggers[key]);
        }
        if (!this.contains(uids, this.props.uid)) {
          flagsRef.push(this.props.uid);
        }
      } else {
        // initial flagger
        flagsRef.push(this.props.uid);
      }

    })
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
          <TouchableOpacity
            onPress={()=>this.flag()}
          >
            <Text style={styles.link}>
              Flag
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
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Avenir'
  },
  comment: {
    color: '#777',
    fontFamily: 'Avenir'
  }
})



// needs an input field for writing a comment
