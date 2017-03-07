/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Navigator,
  Dimensions
} from 'react-native';
import Login from'./Components/Login.js';
import Home from'./Components/Home.js';
var width = Dimensions
  .get('window')
  .width;
var height = Dimensions
  .get('window')
  .height;
const io = require('socket.io-client/dist/socket.io');
const socket = io('http://192.168.1.27:3000', {
  transports: ['websocket'] // you need to explicitly tell it to use websockets
});
socket.on('connect', () => {
  console.log('connect successfull!');
});
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  renderScene(route, navigator) {
    switch(route.name){
      case 'login':
        return (<Login navigator={navigator}/>);
      case 'home':
        return(<Home navigator={navigator}/>);
      default:
       return (<Login navigator={navigator}/>);
    }
  }
  render() {
    console.log('Render!');
    return (<Navigator
      initialRoute={{
      name: 'home'
    }}
      renderScene={this.renderScene}/>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10C390',
    paddingTop: 100,
    paddingHorizontal: 10
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    height: 0,
    width: 0
  },
  input: {
    color: '#ffffff',
    height: 50,
    width: width - 20
  },
  button: {
    height: 50,
    color: '#ffffff',
    width: width
  }
});

AppRegistry.registerComponent('kutamo', () => App);
