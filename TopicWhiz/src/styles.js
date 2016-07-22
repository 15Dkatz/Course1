import React from 'react';
import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#fff'
  },
  flexContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  list: {
    flex: 1
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 2,
    textAlign: 'center'
  },
  button: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 2,
    textAlign: 'center',
    color: 'blue'
  },
  feedback: {
    textAlign: 'center'
  },
  link: {
    color: 'blue',
    textAlign: 'center'
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
  row: {
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    margin: 2,
    padding: 10
  },
  title: {
    fontSize: 16
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
