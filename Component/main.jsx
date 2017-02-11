import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router';
import ScreenLogin from './ScreenLogin.jsx';
import Bar from './Bar.jsx';

ReactDom.render(
    <Bar/>, document.getElementById('bar'));

ReactDom.render(
    <ScreenLogin socket={socket}/>, document.getElementById('root'));
