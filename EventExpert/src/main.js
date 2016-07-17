// keys are typed by user
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

const API_KEY='Bearer SZRBEN2CGEUPT57YVMXP';
const ROOT_URL = 'https://www.eventbriteapi.com/v3/events/search/';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

module.exports = React.createClass({
  getInitialState() {
    return {
      dataSource: ds.cloneWithRows([
        {
          name: {
            text: 'Event 1'
          },
          url: 'www.eventone.com'
        },
        {
          name: {
            text: 'Event 2'
          },
          url: 'www.eventtwo.com'
        }
      ])
    }
  },

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
      this.setState({
        dataSource: ds.cloneWithRows(responseJSON.events)
      })
    })
  },

  renderRow(rowData) {
    return (
      <View style={styles.row}>
        <Text style={styles.rowText}>
          {rowData.name.text}
        </Text>
        <Text>
          {rowData.url}
        </Text>
      </View>
    )
  },

  render() {
    return (
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
        />

    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  list: {
    flex: 1,
    borderColor: '#000',
    borderWidth: 1
  },

  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ff0000',
    borderWidth: 1
  },
});
