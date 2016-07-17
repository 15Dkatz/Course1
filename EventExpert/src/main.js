// grab an api key from EventBrite and use the fetch method to list data
// key is inputted by user
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const API_KEY='Bearer SZRBEN2CGEUPT57YVMXP';
const ROOT_URL = 'https://www.eventbriteapi.com/v3/events/search/';

module.exports = React.createClass({
  componentDidMount() {
    this.searchEvents('hackathon', 'San Francisco');
  },

  searchEvents(category, city) {

    const FETCH_URL = `${ROOT_URL}?q=${category}&venue.city=${city}/`;

    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        'Authorization': API_KEY
      }
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log('responseJSON', responseJSON);
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
