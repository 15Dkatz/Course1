// keys are typed by user
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';

const API_KEY='Bearer SZRBEN2CGEUPT57YVMXP';
const ROOT_URL = 'https://www.eventbriteapi.com/v3/events/search/';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

module.exports = React.createClass({
  getInitialState() {
    return {
      eventType: '',
      city: '',
      dataSource: ds.cloneWithRows([
        // { name: { text: 'Loading...' }, }, { name: { text: 'Event 2' }, url: 'www.eventtwo.com' }
        ''
      ]),
      loading: false
    }
  },

  // componentDidMount() {
  //   this.searchEvents('food', 'San Francisco');
  // },

  searchEvents(category, city) {
    this.setState({loading: true})

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
        dataSource: ds.cloneWithRows(responseJSON.events),
        loading: false
      })
    })
  },

  details(rowData) {
    console.log('open a detail page for', rowData);
    this.props.navigator.push({
      name: 'eventDetail',
      title: rowData.name.text,
      description: rowData.description.text,
      url: rowData.url,
      img: rowData.logo.url
    })
  },

  renderRow(rowData) {
    if (rowData==''||rowData==null) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Search an event category and city</Text>
        </View>
      );
    }


    // we need to handle the case that the rowData.logo key is invalid because some events do not provide a picture
    const defaultImg = 'http://vignette3.wikia.nocookie.net/spore/images/6/6c/Question-mark.png/revision/latest?cb=20110427230528';
    let img = rowData.logo != null ? rowData.logo.url : defaultImg;

    return (
      <View style={styles.row}>
        <Image
          style={styles.rowLogo}
          source={{uri: img}}
        />
        <View style={styles.rowDetails}>
          <Text style={styles.title}>
            {rowData.name.text.length > 30 ? `${rowData.name.text.substring(0, 30)}...` : rowData.name.text}
          </Text>
          <TouchableOpacity
            onPress={()=>{this.details(rowData)}}
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
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Event type...'
            onChangeText={(text)=>{this.setState({eventType: text})}}
          />
          <TextInput
            style={styles.input}
            placeholder='City...'
            onChangeText={(text)=>{this.setState({city: text})}}
          />
          <TouchableOpacity style={styles.button}
            onPress={()=>{
              this.searchEvents(this.state.eventType, this.state.city);
            }}
          >
            <Text style={styles.buttonText}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        {
          this.state.loading ?
            <View
              style={styles.list}
              >
              <Text>
                Loading...
              </Text>
            </View>
          :
            <ListView
              style={styles.list}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => this.renderRow(rowData)}
            />
        }
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //necessary for clean transitions
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    textAlign: 'center',
    fontFamily: 'Avenir'
  },
  link: {
    color: 'blue',
    fontFamily: 'Avenir'
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
    alignItems: 'center',
    padding: 1
  },

  list: {
    flex: 6
  },

  inputContainer: {
    flex: 1,
    paddingTop: 15,
    height: 90
  },
  input: {
    flex: 1,
    borderColor: '#000',
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    paddingLeft: 10,
    fontFamily: 'Avenir'
  },

  button: {
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
    fontFamily: 'Avenir'
  }
});

// icon credits: http://www.flaticon.com/free-icon/annual-calendar-page_42314
