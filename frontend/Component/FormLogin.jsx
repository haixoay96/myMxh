import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router';
import App from './App.jsx';
import Store from './Store.jsx';
class FormLogin extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this
            .onChange
            .bind(this);
        this.login = this
            .login
            .bind(this);
        this.name = '';
    }
    login() {
        if (this.name === '') {
            alert('Input empty!');
            return;
        }
        console.log(this.name);
        var name = this.name;
        Store.emit('login', {
            name: name
        }, (data) => {
            console.log(data);
            if (data.status === 100) {
                alert('Login successfull!');
                ReactDom.render(
                    <App/>,
                    document.getElementById('root'))
            }
        });
    }
    onChange(e) {
        this.name = e.target.value;
    }
    render() {
        return (
            <div className="container">
                <div className="center">
                    <div className="form-group">
                        <label for="usr">Name</label>
                        <input
                            autocomplete="off"
                            type="form-control"
                            onChange={this.onChange}
                            className="form-control"/>
                    </div>
                    <button
                        id="login"
                        onClick={this.login}
                        type="button"
                        className="btn btn-primary btn-md">Đăng nhập</button>
                </div>
            </div>
        )
    }
}
export default FormLogin;
