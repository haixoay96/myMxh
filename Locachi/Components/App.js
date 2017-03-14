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
import Login from './Screens/Login.js';
import Home from './Screens/Home.js';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
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
        console.log(route);
        switch (route.name) {
            case 'login':
                console.log('Go to login');
                return (<Login navigator={navigator}/>);
            case 'home':
                console.log('Go to home');
                return(<Home navigator={navigator}/>);
            default:
                return (<Login navigator={navigator}/>);
        }
    }
    render() {
        console.log('Render!');
        return (<Navigator
            initialRoute={{name: 'login'}} renderScene={this.renderScene}/>);
    }
}
AppRegistry.registerComponent('Locachi', () => App);
