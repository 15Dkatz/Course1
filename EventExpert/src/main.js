// keys are typed by user
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native';

const API_KEY='Bearer SZRBEN2CGEUPT57YVMXP';
const ROOT_URL = 'https://www.eventbriteapi.com/v3/events/search/';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

module.exports = React.createClass({
  getInitialState() {
    return {
      dataSource: ds.cloneWithRows([
        // {
        //   name: {
        //     text: 'Loading...'
        //   },
        // },
        // {
        //   name: {
        //     text: 'Event 2'
        //   },
        //   url: 'www.eventtwo.com'
        // }
        ''
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
      // console.log('responseJSON', responseJSON);
      this.setState({
        dataSource: ds.cloneWithRows(responseJSON.events)
      })
    })
  },

  details(rowData) {
    console.log('open a detail page for', rowData);
  },

  renderRow(rowData) {
    console.log('rowData', rowData);
    // let startTime = rowData.start.local;
    if (rowData=='') {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    const img = rowData.logo.url;

    return (
      <View style={styles.row}>
        <Image
          style={styles.rowLogo}
          source={{uri: img}}
        />
        <View style={styles.rowDetails}>
          <Text style={styles.title}>
            {rowData.name.text}
          </Text>
          <TouchableOpacity
            onPress={this.details(rowData)}
          >
            <Text style={styles.link}>
              More Details
            </Text>
          </TouchableOpacity>
        </View>
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
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    padding: 15,
    flexDirection: 'row'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  link: {
    color: 'blue'
  },

  rowLogo: {
    flex: 1,
    width: 50,
    height: 50,
    borderColor: '#000',
    borderWidth: 1
  },
  rowDetails: {
    flex: 4,
    alignItems: 'center'
  }
});
