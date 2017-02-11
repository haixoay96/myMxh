import React from 'react';

import FormLogin from './FormLogin.jsx';
class ScreenLogin extends React.Component {
    render() {
        return (
            <div>
                <FormLogin socket={this.props.socket}/>
            </div>
        );
    }
}
export default ScreenLogin;
